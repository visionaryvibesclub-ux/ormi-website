import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  'https://dfemtodawjjongthnvgr.supabase.co',
  process.env.SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, created_at: new Date().toISOString() });

    if (insertError) {
      // Unique constraint violation — already registered
      if (insertError.code === '23505') {
        return res.status(200).json({ status: 'already_registered' });
      }
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ error: 'something went wrong' });
    }

    await resend.emails.send({
      from: 'hello@mail.ormi.health',
      to: email,
      subject: "You're on the Ormi waitlist",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#1A1A2E;font-family:'DM Sans',Helvetica,Arial,sans-serif;color:#F5E6C8;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1A1A2E;">
            <tr>
              <td align="center" style="padding:48px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

                  <!-- Logo -->
                  <tr>
                    <td style="padding-bottom:32px;">
                      <svg width="28" height="44" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#4A8FA8" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
                        <circle cx="26" cy="52" r="11" stroke="#C9973A" stroke-width="1.9" fill="none"/>
                        <circle cx="26" cy="52" r="4.5" stroke="#C9973A" stroke-width="1.7" fill="none"/>
                        <path d="M 26 74 C 26 78, 32 83, 37 80 C 42 77, 42 70, 37 68 C 33 66, 28 70, 30 75" stroke="#4A8FA8" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45"/>
                      </svg><span style="font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(245,230,200,0.4);margin-left:12px;vertical-align:middle;">ORMI</span>
                    </td>
                  </tr>

                  <!-- Heading -->
                  <tr>
                    <td style="padding-bottom:24px;">
                      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:300;color:#F5E6C8;line-height:1.2;">You're not too sensitive. You're not imagining it. You're not alone.</h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding-bottom:20px;">
                      <p style="margin:0;font-size:16px;line-height:1.75;color:rgba(245,230,200,0.75);font-weight:300;">
                        You just did something most women never get to do. You asked for the full picture.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:20px;">
                      <p style="margin:0;font-size:16px;line-height:1.75;color:rgba(245,230,200,0.75);font-weight:300;">
                        Ormi is built for women who've been dismissed, confused, or told it was just stress. This is the start of something that actually makes sense. And the right information is coming.
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:28px 0;">
                      <div style="height:1px;background:rgba(201,168,76,0.25);"></div>
                    </td>
                  </tr>

                  <!-- Closing line -->
                  <tr>
                    <td style="padding-bottom:48px;">
                      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-style:italic;line-height:1.6;color:#C9A84C;font-weight:300;">
                        Your hormones have been talking. Ormi is how you finally hear them.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td>
                      <p style="margin:0;font-size:11px;color:rgba(245,230,200,0.30);line-height:1.6;font-weight:300;">
                        ormi.health &nbsp;&middot;&nbsp; hello@ormi.health &nbsp;&middot;&nbsp; You're receiving this because you joined the Ormi waitlist.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `You're not too sensitive. You're not imagining it. You're not alone.

You just did something most women never get to do. You asked for the full picture.

Ormi is built for women who've been dismissed, confused, or told it was just stress. This is the start of something that actually makes sense. And the right information is coming.

Your hormones have been talking. Ormi is how you finally hear them.

---
ormi.health · hello@ormi.health · You're receiving this because you joined the Ormi waitlist.`,
    });

    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'something went wrong' });
  }
}
