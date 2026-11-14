import Head from 'next/head';

// Draft privacy notice for ormi.health (website and waitlist only).
// Written 14 Nov 2026 from how the site works today. To be reviewed by Ormi's solicitor.

const css = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0C2340; color: rgba(195,208,224,0.94); font-family: 'Work Sans', sans-serif; font-size: 18px; line-height: 1.7; -webkit-font-smoothing: antialiased; }
  a { color: #E6CC94; }
  a:focus-visible { outline: 2px solid #E08A5E; outline-offset: 3px; border-radius: 4px; }
  .p-nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; border-bottom: 1px solid rgba(255,255,255,0.09); }
  .p-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .p-divider { width: 1px; height: 1.5em; background: #E08A5E; }
  .p-wordmark { font-family: 'Instrument Serif', serif; font-size: 27px; color: #F5E6C8; }
  .p-back { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; }
  main { max-width: 760px; margin: 0 auto; padding: 72px 32px 96px; }
  h1 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: clamp(44px, 6vw, 68px); line-height: 1.05; color: #F5E6C8; margin-bottom: 10px; }
  .p-updated { font-size: 14px; color: rgba(195,208,224,0.7); margin-bottom: 40px; }
  h2 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 32px; line-height: 1.2; color: #E6CC94; margin: 44px 0 12px; }
  p { margin-bottom: 14px; }
  ul { margin: 0 0 14px 22px; }
  li { margin-bottom: 8px; }
  strong { color: #F5E6C8; font-weight: 500; }
  footer { border-top: 1px solid rgba(255,255,255,0.09); padding: 28px 32px; font-size: 14px; color: rgba(195,208,224,0.7); text-align: center; }
  @media (max-width: 640px) { .p-nav { padding: 14px 18px; } main { padding: 48px 20px 72px; } }
`;

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy notice | Ormi</title>
        <meta name="description" content="What Ormi does with your information when you visit ormi.health or join the waitlist." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/fonts.css" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>

      <nav className="p-nav">
        <a href="/" className="p-logo" aria-label="Ormi home">
          <svg width="22" height="34" viewBox="0 0 52 82" fill="none" aria-hidden="true">
            <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#F5E6C8" strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="26" cy="52" r="11" stroke="#D9AE5C" strokeWidth="1.9" fill="none" />
            <circle cx="26" cy="52" r="4.5" stroke="#D9AE5C" strokeWidth="1.7" fill="none" />
          </svg>
          <span className="p-divider" />
          <span className="p-wordmark">ormi</span>
        </a>
        <a href="/" className="p-back">Back to ormi.health</a>
      </nav>

      <main>
        <h1>Privacy notice</h1>
        <p className="p-updated">Last updated 14 November 2026</p>

        <p>This notice explains what Ormi does with your personal information when you visit ormi.health or join our waitlist. It covers this website only. The Ormi app will have its own privacy notice when it launches.</p>

        <h2>Who we are</h2>
        <p>Ormi is run by <strong>Ormi Wellness Ltd</strong>. We are the controller of the information described on this page. If you have a question about your information, email <a href="mailto:hello@ormi.health">hello@ormi.health</a>.</p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>If you join the waitlist:</strong> your email address, and the date and time you signed up.</li>
          <li><strong>If you email us:</strong> your email address and whatever you choose to tell us.</li>
          <li><strong>When you visit the site:</strong> our hosting provider processes technical information, such as your IP address, so that the pages can be delivered to you and kept secure.</li>
        </ul>
        <p>We do not ask for any health information on this website, and you do not need to share any to join the waitlist.</p>

        <h2>Cookies</h2>
        <p>This website does not use advertising or analytics cookies.</p>

        <h2>Why we use it</h2>
        <ul>
          <li><strong>Waitlist:</strong> to let you know when Ormi is ready and to send you updates about the launch. We do this with your consent, which you give by signing up. You can withdraw it at any time by emailing us, and we will remove you from the list.</li>
          <li><strong>Emails you send us:</strong> to reply to you. We rely on our legitimate interest in answering enquiries.</li>
          <li><strong>Technical information:</strong> to run the website and keep it secure. We rely on our legitimate interest in providing a working, safe site.</li>
        </ul>

        <h2>Who we share it with</h2>
        <p>We never sell your information. We share it only with the companies that help us run the website and waitlist:</p>
        <ul>
          <li><strong>Supabase</strong> stores the waitlist. Our database is hosted in Ireland.</li>
          <li><strong>Resend</strong> sends our emails, including the email confirming you have joined the waitlist.</li>
          <li><strong>Vercel</strong> hosts this website.</li>
        </ul>
        <p>Resend and Vercel are based in the United States, so your information may be processed outside the UK.</p>

        <h2>How long we keep it</h2>
        <p>We keep your email address on the waitlist until you ask us to remove it, or until the waitlist is no longer needed.</p>

        <h2>Your rights</h2>
        <p>Under UK data protection law you can ask us to:</p>
        <ul>
          <li>give you a copy of the information we hold about you</li>
          <li>correct information that is wrong</li>
          <li>delete your information</li>
          <li>stop or limit how we use it</li>
          <li>send your information to you or to another organisation</li>
        </ul>
        <p>To use any of these rights, email <a href="mailto:hello@ormi.health">hello@ormi.health</a>. We will reply within one month.</p>
        <p>If you are unhappy with how we have handled your information, you can complain to the Information Commissioner's Office at <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a>. We would appreciate the chance to put things right first.</p>

        <h2>Changes to this notice</h2>
        <p>If we change how we use your information, we will update this page and change the date at the top.</p>
      </main>

      <footer>© 2026 Ormi. <a href="/">ormi.health</a></footer>
    </>
  );
}
