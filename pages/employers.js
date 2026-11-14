import Head from 'next/head';

// Ormi for employers. Content moved from the home page on 14 Nov 2026.
// Source: Employment Rights Act 2025, equality action plans (gender pay gap and
// menopause support) for employers with 250+ employees. Voluntary from April 2026,
// expected to be mandatory from spring 2027 subject to secondary legislation.
// GOV.UK: gov.uk/government/publications/creating-an-action-plan-guidance-for-employers
// Tribunal awards: Lynskey v Direct Line Insurance Services; Shearer v South Lanarkshire Council.

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
  main { max-width: 1100px; margin: 0 auto; padding: 80px 32px 96px; display: grid; grid-template-columns: 1.25fr 1fr; gap: 56px; align-items: start; }
  .e-eyebrow { font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase; color: #E6CC94; font-weight: 500; margin-bottom: 18px; }
  h1 { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: clamp(44px, 5.4vw, 72px); line-height: 1.04; color: #F5E6C8; margin-bottom: 24px; }
  h1 em { color: #D9AE5C; }
  .e-body { font-size: 19px; max-width: 600px; margin-bottom: 30px; }
  .e-actions { display: flex; flex-wrap: wrap; gap: 12px; }
  .e-btn { display: inline-block; padding: 16px 28px; border-radius: 40px; font-size: 14px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; }
  .e-btn.solid { background: #B4553A; color: #FFF6E6; }
  .e-btn.ghost { border: 1px solid rgba(245,230,200,0.3); color: #E6CC94; }
  .e-card { border-radius: 24px; padding: 34px 32px; border: 1px solid rgba(232,193,110,0.4); background: linear-gradient(160deg, rgba(200,103,74,0.22), rgba(15,42,74,0.7) 65%); }
  .e-card-label { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 26px; color: #E6CC94; margin-bottom: 10px; }
  .e-figure { font-family: 'Instrument Serif', serif; font-size: clamp(56px, 6vw, 80px); line-height: 1; color: #F5E6C8; margin-bottom: 12px; }
  .e-source { grid-column: 1 / -1; font-size: 14px; color: rgba(195,208,224,0.7); border-top: 1px solid rgba(255,255,255,0.09); padding-top: 20px; }
  footer { border-top: 1px solid rgba(255,255,255,0.09); padding: 28px 32px; font-size: 14px; color: rgba(195,208,224,0.7); text-align: center; }
  @media (max-width: 860px) { main { grid-template-columns: 1fr; gap: 36px; padding: 48px 20px 72px; } .p-nav { padding: 14px 18px; } }
`;

export default function Employers() {
  return (
    <>
      <Head>
        <title>Ormi for employers | Ormi</title>
        <meta name="description" content="Menopause action plans are coming for larger UK employers. Ormi offers flexible packages to support the women in your team." />
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
        <div>
          <p className="e-eyebrow">For employers</p>
          <h1>Menopause action plans are coming. <em>Is your team ready?</em></h1>
          <p className="e-body">{"From spring 2027, UK employers with 250 or more staff are expected to publish an action plan showing how they support employees through menopause. Ormi gives the women in your team a place to understand how they feel and what helps. We offer flexible packages to suit your organisation."}</p>
          <div className="e-actions">
            <a href="mailto:hello@ormi.health?subject=Ormi%20for%20employers" className="e-btn solid">Email hello@ormi.health</a>
            <a href="/#final-waitlist" className="e-btn ghost">Join the waitlist</a>
          </div>
        </div>
        <div className="e-card">
          <p className="e-card-label">Did you know?</p>
          <p className="e-figure">{"£60,000+"}</p>
          <p>{"awarded by employment tribunals in each of two recent cases involving menopause symptoms at work. Ask us about a package for your team."}</p>
        </div>
        <p className="e-source">{"Employment Rights Act 2025. Expected from spring 2027, subject to final regulations. Tribunal awards: Lynskey v Direct Line Insurance Services (£64,645) and Shearer v South Lanarkshire Council (£61,074)."}</p>
      </main>

      <footer>© 2026 Ormi Wellness Ltd. Registered in England and Wales, company number 17209350. <a href="/privacy">Privacy</a></footer>
    </>
  );
}
