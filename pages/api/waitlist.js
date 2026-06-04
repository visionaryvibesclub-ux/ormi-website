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
                    <td style="padding-bottom:36px;">
                      <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:0.28em;text-transform:uppercase;color:#F5E6C8;font-weight:300;">ORMI</span>
                    </td>
                  </tr>

                  <!-- Heading -->
                  <tr>
                    <td style="padding-bottom:24px;">
                      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;font-weight:300;color:#F5E6C8;line-height:1.2;">You're about to get clear.</h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding-bottom:20px;">
                      <p style="margin:0;font-size:16px;line-height:1.75;color:rgba(245,230,200,0.75);font-weight:300;">
                        You've just taken the first step towards understanding what's actually going on inside your body — and what you can do about it.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:20px;">
                      <p style="margin:0;font-size:16px;line-height:1.75;color:rgba(245,230,200,0.75);font-weight:300;">
                        Ormi is built for women who've been dismissed, confused, or told it was just stress. You're not imagining it. We'll be in touch as soon as we're ready for you.
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
                        In the meantime, know this: your hormones have been talking. Ormi is how you finally hear them.
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
      text: `You're about to get clear.

You've just taken the first step towards understanding what's actually going on inside your body -- and what you can do about it.

Ormi is built for women who've been dismissed, confused, or told it was just stress. You're not imagining it. We'll be in touch as soon as we're ready for you.

In the meantime, know this: your hormones have been talking. Ormi is how you finally hear them.

---
ormi.health · hello@ormi.health · You're receiving this because you joined the Ormi waitlist.`,
    });

    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'something went wrong' });
  }
}
