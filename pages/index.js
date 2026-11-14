import Head from 'next/head';
import { useEffect } from 'react';

const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Warm night palette, from Ormi brand and product essentials (13 Nov 2026) */
      --obsidian:    #0C2340; /* Night (Deep Aegean) */
      --obsidian2:   #0F2A4A; /* Night card */
      --ink:         #0A1D36; /* Navy ink */
      --champagne:   #F5E6C8;
      --warm-white:  #FFF6E6;
      --gold:        #D9AE5C; /* Gold mid */
      --gold-soft:   #E6CC94;
      --gold-dim:    rgba(217,174,92,0.12);
      --gold-border: rgba(217,174,92,0.28);
      --gold-text:   #E6CC94;
      --terracotta:  #C8674A;
      --terracotta-deep: #B4553A; /* Buttons: 4.5:1 with warm white text */
      --glow:        #E08A5E; /* Terracotta glow */
      --sky:         #E08A5E;
      --sky-dim:     rgba(224,138,94,0.10);
      --sky-border:  rgba(224,138,94,0.28);
      --sky-text:    #F2A57E;
      --rose:        #F2A57E; /* Peach */
      --rose-dim:    rgba(242,165,126,0.10);
      --rose-border: rgba(242,165,126,0.24);
      --white15:     rgba(195,208,224,0.18);
      --white30:     rgba(195,208,224,0.62);
      --white50:     rgba(195,208,224,0.80);
      --white70:     rgba(195,208,224,0.94);
      --white90:     rgba(245,230,200,0.94);
      --card:        rgba(255,255,255,0.04);
      --card-border: rgba(255,255,255,0.09);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--obsidian);
      color: var(--champagne);
      font-family: 'Work Sans', sans-serif;
      font-weight: 300;
      line-height: 1.7;
      overflow-x: hidden;
    }

    .serif { font-family: 'Instrument Serif', serif; font-weight: 300; }

    /* ── Layout ── */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
    section { padding: 88px 0; }

    /* ── Nav ── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 16px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(12,35,64,0.88);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--card-border);
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .nav-wordmark {
      font-family: 'Instrument Serif', serif;
      font-size: 27px;
      font-weight: 400;
      color: var(--champagne);
      line-height: 1;
    }

    .nav-divider {
      width: 1px;
      height: 1.5em;
      background: var(--glow);
      opacity: 0.9;
    }

    .nav-cta {
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--gold-text);
      background: var(--gold-dim);
      border: 1px solid var(--gold-border);
      border-radius: 40px;
      padding: 9px 22px;
      text-decoration: none;
      transition: background 0.2s;
      white-space: nowrap;
    }

    .nav-cta:hover { background: rgba(217,174,92,0.20); }

    /* ── Hero ── */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 124px;
      padding-bottom: 64px;
      position: relative;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 70% at 82% 18%, rgba(200,103,74,0.30) 0%, transparent 60%),
        radial-gradient(ellipse 55% 50% at 100% 60%, rgba(217,174,92,0.14) 0%, transparent 60%),
        radial-gradient(ellipse 60% 55% at 10% 90%, rgba(224,138,94,0.10) 0%, transparent 55%);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 780px;
    }

    .hero-eyebrow {
      font-size: 12px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--gold-text);
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .hero-eyebrow::before {
      content: '';
      display: block;
      width: 28px;
      height: 1px;
      background: var(--gold);
      opacity: 0.55;
    }

    .hero-headline {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(44px, 7.2vw, 92px);
      font-weight: 300;
      color: var(--champagne);
      line-height: 1.1;
      margin-bottom: 12px;
    }

    .hero-headline em {
      font-style: italic;
      color: var(--gold);
    }

    .hero-headline-sub {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(20px, 2.6vw, 30px);
      font-weight: 300;
      font-style: italic;
      color: var(--white50);
      margin-bottom: 36px;
      line-height: 1.4;
    }

    .hero-sub {
      font-size: 18px;
      color: var(--white50);
      line-height: 1.7;
      max-width: 640px;
      margin-bottom: 44px;
      font-weight: 300;
    }

    .hero-sub strong {
      color: var(--white70);
      font-weight: 400;
    }

    /* ── Forms ── */
    .waitlist-form {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      max-width: 500px;
    }

    .waitlist-form input,
    .final-form input {
      flex: 1;
      min-width: 200px;
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--card-border);
      border-radius: 40px;
      padding: 14px 22px;
      font-family: 'Work Sans', sans-serif;
      font-size: 16px;
      color: var(--champagne);
      outline: none;
      transition: border-color 0.2s;
    }

    .waitlist-form input::placeholder,
    .final-form input::placeholder { color: var(--white30); }

    .waitlist-form input:focus,
    .final-form input:focus { border-color: var(--gold-border); }

    .btn-gold {
      background: var(--terracotta-deep);
      color: var(--warm-white);
      border: none;
      border-radius: 40px;
      padding: 14px 28px;
      font-family: 'Work Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
      white-space: nowrap;
    }

    .btn-gold:hover { opacity: 0.87; }
    .btn-gold:active { transform: scale(0.98); }

    .prelaunch-note {
      max-width: 500px;
      margin-bottom: 18px;
      font-size: 16px;
      line-height: 1.6;
      color: var(--white70);
      font-weight: 400;
    }

    .form-note {
      margin-top: 12px;
      font-size: 13px;
      color: var(--white30);
      font-style: italic;
    }

    .success-msg {
      display: none;
      padding: 16px 22px;
      background: var(--sky-dim);
      border: 1px solid var(--sky-border);
      border-radius: 14px;
      font-size: 16px;
      color: var(--sky-text);
      max-width: 500px;
    }

    /* ── Section headers ── */
    .eyebrow {
      font-size: 12px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--gold-text);
      text-align: left;
      margin-bottom: 18px;
    }

    .section-title {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(34px, 5.2vw, 66px);
      font-weight: 300;
      color: var(--champagne);
      text-align: left;
      line-height: 1.1;
      margin-bottom: 20px;
    }

    .section-sub {
      font-size: 18px;
      color: var(--white50);
      text-align: left;
      max-width: 680px;
      margin: 0 0 56px;
      line-height: 1.75;
      font-weight: 300;
    }

    /* ── Validation strip ── */
    .validation {
      background: var(--obsidian2);
      border-top: 1px solid var(--card-border);
      border-bottom: 1px solid var(--card-border);
      padding: 40px 0;
    }

    .validation-inner {
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-wrap: wrap;
      gap: 0;
    }

    .val-item {
      flex: 1;
      min-width: 200px;
      text-align: center;
      padding: 24px 32px;
      border-right: 1px solid var(--card-border);
    }

    .val-item:last-child { border-right: none; }

    .val-stat {
      font-family: 'Instrument Serif', serif;
      font-size: 52px;
      color: var(--gold);
      font-weight: 300;
      line-height: 1;
      margin-bottom: 8px;
    }

    .val-label {
      font-size: 14px;
      color: var(--white50);
      line-height: 1.6;
      font-weight: 300;
      max-width: 180px;
      margin: 0 auto;
    }

    .val-source {
      font-size: 12px;
      color: var(--white30);
      font-style: italic;
      margin-top: 6px;
    }

    /* ── Feeling section ── */
    .feelings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 48px;
    }

    .feeling-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 24px 22px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.2s;
    }

    .feeling-card:hover { border-color: rgba(217,174,92,0.18); }

    .feeling-card::before {
      content: '"';
      font-family: 'Instrument Serif', serif;
      font-size: 80px;
      color: var(--gold);
      opacity: 0.08;
      position: absolute;
      top: -10px;
      left: 14px;
      line-height: 1;
    }

    .feeling-text {
      font-family: 'Instrument Serif', serif;
      font-size: 20px;
      font-style: italic;
      color: var(--white70);
      line-height: 1.55;
      font-weight: 300;
      position: relative;
      z-index: 1;
      margin-bottom: 14px;
    }

    .feeling-reframe {
      font-size: 14px;
      color: var(--gold-text);
      font-weight: 400;
      letter-spacing: 0.04em;
    }

    .feeling-reframe::before {
      content: '→  ';
      opacity: 0.6;
    }

    /* ── Messenger section ── */
    .messenger { background: var(--obsidian2); }

    .messenger-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }

    @media (max-width: 640px) {
      .messenger-grid { grid-template-columns: 1fr; gap: 32px; }
    }

    .messenger-title {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(28px, 4.5vw, 46px);
      font-weight: 300;
      color: var(--champagne);
      line-height: 1.2;
      margin-bottom: 20px;
    }

    .messenger-title em {
      font-style: italic;
      color: var(--gold);
    }

    .messenger-body {
      font-size: 17px;
      color: var(--white50);
      line-height: 1.8;
      font-weight: 300;
      margin-bottom: 16px;
    }

    .messenger-hormones {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .hormone-row {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 14px 16px;
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      transition: border-color 0.2s;
    }

    .hormone-row:hover { border-color: var(--gold-border); }

    .hormone-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 5px;
    }

    .hormone-name {
      font-size: 16px;
      color: var(--white90);
      font-weight: 400;
      margin-bottom: 2px;
    }

    .hormone-what {
      font-size: 14px;
      color: var(--white50);
      line-height: 1.5;
      font-weight: 300;
    }

    /* ── Mental health section ── */
    .mental-quote {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(22px, 4vw, 38px);
      font-style: italic;
      font-weight: 300;
      color: var(--champagne);
      text-align: left;
      line-height: 1.4;
      max-width: 860px;
      margin: 0 0 48px;
    }

    .mental-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .mental-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 18px;
      padding: 26px 24px;
      transition: border-color 0.2s, background 0.2s;
    }
    .mental-card:hover {
      border-color: rgba(242,165,126,0.22);
      background: rgba(255,255,255,0.06);
    }

    .mental-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mental-title {
      font-family: 'Instrument Serif', serif;
      font-size: 22px;
      color: var(--champagne);
      margin-bottom: 8px;
      font-weight: 400;
    }

    .mental-body {
      font-size: 16px;
      color: var(--white50);
      line-height: 1.7;
      font-weight: 300;
    }

    /* ── How it works ── */
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .step {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 28px 24px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.2s;
    }

    .step:hover { border-color: var(--gold-border); }

    .step-num {
      font-family: 'Instrument Serif', serif;
      font-size: 60px;
      color: var(--gold);
      opacity: 0.10;
      position: absolute;
      top: 8px;
      right: 16px;
      line-height: 1;
      font-weight: 300;
    }

    .step-title {
      font-family: 'Instrument Serif', serif;
      font-size: 24px;
      color: var(--champagne);
      margin-bottom: 10px;
      font-weight: 400;
      position: relative;
    }

    .step-body {
      font-size: 16px;
      color: var(--white50);
      line-height: 1.7;
      font-weight: 300;
    }

    .step-tag {
      display: inline-block;
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--gold-text);
      background: var(--gold-dim);
      border: 1px solid var(--gold-border);
      border-radius: 40px;
      padding: 3px 10px;
      margin-bottom: 14px;
    }

    /* ── Life stages ── */
    .stages { background: var(--obsidian2); }

    .stages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
    }

    .stage-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 24px 20px;
      transition: border-color 0.2s, background 0.2s;
    }

    .stage-card:hover {
      border-color: var(--gold-border);
      background: rgba(217,174,92,0.03);
    }

    .stage-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      margin-bottom: 14px;
    }

    .stage-name {
      font-family: 'Instrument Serif', serif;
      font-size: 22px;
      color: var(--champagne);
      margin-bottom: 8px;
      font-weight: 400;
    }

    .stage-body {
      font-size: 14px;
      color: var(--white50);
      line-height: 1.65;
      font-weight: 300;
    }

    /* ── DUTCH section ── */
    .dutch-wrap {
      background: var(--card);
      border: 1px solid var(--gold-border);
      border-radius: 24px;
      padding: 48px 44px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: start;
    }

    @media (max-width: 640px) {
      .dutch-wrap { grid-template-columns: 1fr; gap: 32px; padding: 32px 24px; }
    }

    .dutch-title {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(26px, 4vw, 40px);
      color: var(--champagne);
      font-weight: 300;
      line-height: 1.2;
      margin-bottom: 16px;
    }

    .dutch-title em { font-style: italic; color: var(--gold); }

    .dutch-body {
      font-size: 16px;
      color: var(--white50);
      line-height: 1.8;
      font-weight: 300;
      margin-bottom: 24px;
    }

    .dutch-clinic-compare {
      background: var(--sky-dim);
      border: 1px solid var(--sky-border);
      border-radius: 14px;
      padding: 16px 18px;
      margin-bottom: 24px;
    }

    .dutch-clinic-label {
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--sky-text);
      margin-bottom: 8px;
      font-weight: 500;
    }

    .dutch-clinic-text {
      font-size: 16px;
      color: var(--white60, rgba(245,230,200,0.60));
      line-height: 1.6;
      font-weight: 300;
    }

    .dutch-clinic-text strong { color: var(--white70); font-weight: 400; }

    .dutch-markers {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .dutch-marker {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .dutch-marker-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--gold);
      flex-shrink: 0;
      margin-top: 7px;
    }

    .dutch-marker-text {
      font-size: 16px;
      color: var(--white50);
      line-height: 1.6;
      font-weight: 300;
    }

    .dutch-marker-text strong { color: var(--white70); font-weight: 400; }

    /* ── Pricing ── */
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 18px;
      align-items: start;
    }

    .pricing-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 22px;
      padding: 32px 28px;
      position: relative;
      transition: border-color 0.2s;
    }

    .pricing-card:hover { border-color: rgba(217,174,92,0.18); }

    .pricing-card.featured {
      border-color: var(--gold-border);
      background: rgba(217,174,92,0.04);
    }

    .pricing-badge {
      position: absolute;
      top: -13px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--obsidian);
      background: var(--gold);
      border-radius: 40px;
      padding: 4px 16px;
      white-space: nowrap;
      font-weight: 500;
    }

    .pricing-tier {
      font-size: 12px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold-text);
      margin-bottom: 12px;
      font-weight: 500;
    }

    .pricing-price {
      font-family: 'Instrument Serif', serif;
      font-size: 42px;
      color: var(--champagne);
      font-weight: 300;
      line-height: 1;
      margin-bottom: 4px;
    }

    .pricing-price-note {
      font-size: 14px;
      color: var(--white30);
      margin-bottom: 24px;
      font-weight: 300;
      line-height: 1.5;
    }

    .pricing-hr {
      width: 100%;
      height: 1px;
      background: var(--card-border);
      margin-bottom: 22px;
    }

    .pricing-features {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 24px;
    }

    .pricing-feature {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 16px;
      color: var(--white50);
      font-weight: 300;
      line-height: 1.5;
    }

    .pricing-feature::before {
      content: '✓';
      color: var(--gold);
      flex-shrink: 0;
      font-size: 13px;
      margin-top: 2px;
    }

    .pricing-clinic-note {
      font-size: 13px;
      color: var(--white30);
      font-style: italic;
      line-height: 1.6;
      padding-top: 14px;
      border-top: 1px solid var(--card-border);
    }

    .pricing-tbc {
      font-size: 13px;
      color: var(--gold-text);
      letter-spacing: 0.08em;
      font-style: italic;
      margin-top: 6px;
    }

    /* ── Final CTA ── */
    .final-cta {
      text-align: center;
      padding: 110px 0;
      position: relative;
      overflow: hidden;
    }

    .final-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 75% 65% at 50% 50%, rgba(217,174,92,0.06) 0%, transparent 65%);
    }

    .final-content { position: relative; z-index: 2; }

    .final-headline {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(36px, 6.5vw, 68px);
      font-weight: 300;
      color: var(--champagne);
      line-height: 1.15;
      margin-bottom: 20px;
      max-width: 620px;
      margin-left: auto;
      margin-right: auto;
    }

    .final-headline em { font-style: italic; color: var(--gold); }

    .final-sub {
      font-size: 18px;
      color: var(--white50);
      max-width: 480px;
      margin: 0 auto 48px;
      line-height: 1.75;
      font-weight: 300;
    }

    .final-form {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 500px;
      margin: 0 auto;
    }

    /* ── Footer ── */
    footer {
      border-top: 1px solid var(--card-border);
      padding: 44px 0;
    }

    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .footer-wordmark {
      font-family: 'Instrument Serif', serif;
      font-size: 23px;
      font-weight: 400;
      color: var(--champagne);
    }

    .footer-divider {
      width: 1px;
      height: 1.4em;
      background: var(--glow);
      opacity: 0.9;
    }

    .footer-note {
      font-size: 13px;
      color: var(--white30);
      font-weight: 300;
    }

    .footer-links { display: flex; gap: 22px; }

    .footer-links a {
      font-size: 14px;
      color: var(--white30);
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-links a:hover { color: var(--gold-text); }

    /* ── Popup banner ── */
    @keyframes bannerIn {
      from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
      to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes bannerOut {
      from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      to   { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
    }
    #ormi-banner-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(12,35,64,0.75);
      z-index: 9998;
      backdrop-filter: blur(4px);
    }
    #ormi-banner-overlay.visible {
      display: block;
    }
    #ormi-banner {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      background: #F5E6C8;
      border-radius: 20px;
      padding: 48px 48px 40px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.5);
      max-width: 520px;
      width: calc(100% - 48px);
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
    #ormi-banner.banner-visible {
      display: flex;
      animation: bannerIn 0.35s ease forwards;
    }
    #ormi-banner.banner-hiding {
      display: flex;
      animation: bannerOut 0.25s ease forwards;
    }
    .banner-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }
    .banner-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .banner-wordmark {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 22px;
      font-weight: 400;
      color: #0A1D36;
    }
    .banner-dismiss {
      color: rgba(10,29,54,0.35);
      font-size: 24px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      line-height: 1;
      flex-shrink: 0;
    }
    .banner-dismiss:hover { color: rgba(10,29,54,0.6); }
    .banner-heading {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 24px;
      font-weight: 300;
      color: #0A1D36;
      line-height: 1.4;
      margin: 0;
    }
    .banner-body {
      font-family: 'Work Sans', sans-serif;
      font-size: 16px;
      font-weight: 300;
      color: rgba(10,29,54,0.55);
      line-height: 1.6;
      margin: 0;
    }

    .form-error {
      margin-top: 12px;
      font-size: 16px;
      line-height: 1.6;
      color: var(--sky-text);
      max-width: 500px;
    }
    .final-content .form-error { margin-left: auto; margin-right: auto; }

    /* ── Colour: champagne sections and coloured tiles, all from the brand palette ── */
    .light {
      background: #F5E6C8;
      --champagne:   #0A1D36;
      --white90:     #0A1D36;
      --white70:     rgba(10,29,54,0.92);
      --white50:     rgba(10,29,54,0.80);
      --white30:     rgba(10,29,54,0.66);
      --white15:     rgba(10,29,54,0.16);
      --gold:        #B4553A;
      --gold-text:   #0A1D36;
      --gold-border: rgba(180,85,58,0.40);
      --gold-dim:    rgba(180,85,58,0.10);
      --card:        #FFF6E6;
      --card-border: rgba(10,29,54,0.10);
    }
    .light .feeling-card::before { opacity: 0.16; }
    .light .feeling-card:hover, .light .pricing-card:hover { border-color: rgba(180,85,58,0.40); }
    .light .feeling-reframe { font-weight: 500; }
    .light .pricing-badge { background: #B4553A; color: #FFF6E6; }
    .light .pricing-card.featured {
      background: #0C2340;
      border-color: #0C2340;
      --champagne:   #F5E6C8;
      --white50:     rgba(195,208,224,0.86);
      --white30:     rgba(195,208,224,0.70);
      --gold:        #D9AE5C;
      --gold-text:   #E6CC94;
      --card-border: rgba(255,255,255,0.14);
    }
    .light .pricing-card.featured .pricing-badge { background: #D9AE5C; color: #0A1D36; }

    /* How it works: three tiles in the app's warm colours */
    .steps-grid .step {
      border: none;
      --champagne: #0A1D36;
      --white50:   rgba(10,29,54,0.86);
      --gold:      #0A1D36;
    }
    .steps-grid .step:nth-child(1) { background: #E6CC94; }
    .steps-grid .step:nth-child(2) { background: #F2A57E; }
    .steps-grid .step:nth-child(3) { background: #E08A5E; }
    .steps-grid .step-num { opacity: 0.22; }
    .steps-grid .step-body { font-weight: 400; }

    /* stats: one colour each */
    .val-item:nth-child(1) .val-stat { color: #E6CC94; }
    .val-item:nth-child(2) .val-stat { color: #F2A57E; }
    .val-item:nth-child(3) .val-stat { color: #E08A5E; }

    /* life stages: a coloured edge per stage */
    .stages-grid .stage-card { border-top: 3px solid var(--stage, #D9AE5C); }
    .stages-grid .stage-card:nth-child(1) { --stage: #D9AE5C; }
    .stages-grid .stage-card:nth-child(2) { --stage: #E6CC94; }
    .stages-grid .stage-card:nth-child(3) { --stage: #C8674A; }
    .stages-grid .stage-card:nth-child(4) { --stage: #E08A5E; }

    /* employers: terracotta wash */
    .employers-card {
      background: linear-gradient(135deg, rgba(200,103,74,0.34) 0%, rgba(224,138,94,0.16) 45%, rgba(15,42,74,0.9) 100%), #0F2A4A !important;
      border-color: rgba(224,138,94,0.45) !important;
    }

    .light .section-title em { color: #B4553A; }

    /* ── Graphics ported from the app (explore/motifs.tsx, portrait/HormoneMotif.tsx) ── */
    @keyframes breatheSoft { from { transform: scale(1); } to { transform: scale(1.04); } }
    @keyframes breatheRing { from { transform: scale(0.8); } to { transform: scale(1.15); } }
    @keyframes driftX { from { transform: translateX(-4px); } to { transform: translateX(4px); } }
    @keyframes driftXr { from { transform: translateX(4px); } to { transform: translateX(-4px); } }
    @keyframes glowIn { from { opacity: 0.15; } to { opacity: 1; } }
    @keyframes turn { to { transform: rotate(360deg); } }
    @keyframes ripple { from { transform: scale(0.92); opacity: 0.9; } to { transform: scale(1.06); opacity: 0.35; } }
    @keyframes thought {
      0%, 36% { opacity: 0; transform: translateY(2px); }
      50%, 84% { opacity: 1; transform: translateY(0); }
      94%, 100% { opacity: 0; transform: translateY(-0.6px); }
    }
    @keyframes thoughtDot1 { 0%, 18% { opacity: 0; } 26%, 84% { opacity: 1; } 94%, 100% { opacity: 0; } }
    @keyframes thoughtDot2 { 0% { opacity: 0; } 8%, 84% { opacity: 1; } 94%, 100% { opacity: 0; } }

    /* a team of suns on the employer card: five suns, five tempos, one horizon */
    .employers-card { position: relative; overflow: hidden; }
    .employers-card > *:not(.team) { position: relative; z-index: 1; }
    .team {
      --h: 150px;
      position: absolute;
      right: 48px; top: 50%;
      width: 380px; height: calc(var(--h) + 50px);
      transform: translateY(-50%);
      pointer-events: none;
    }
    .team-sky { position: absolute; left: 0; right: 0; top: 0; height: var(--h); overflow: hidden; }
    .team-sky span {
      position: absolute;
      left: var(--x);
      bottom: calc(var(--s) * var(--sink) * -1);
      width: var(--s); height: var(--s);
      border-radius: 50%;
      background: var(--hue);
      animation: teamFloat var(--t) ease-in-out infinite alternate;
    }
    .team-line {
      position: absolute; left: -4%; right: -4%; top: var(--h); height: 1px;
      background: linear-gradient(90deg, rgba(245,230,200,0), rgba(245,230,200,0.5) 25%, rgba(245,230,200,0.5) 75%, rgba(245,230,200,0));
    }
    .team-bars { position: absolute; left: 0; right: 0; top: calc(var(--h) + 13px); display: flex; flex-direction: column; align-items: center; gap: 9px; }
    .team-bars i { display: block; height: 3px; border-radius: 2px; background: rgba(239,211,155,0.5); width: 62%; animation: shimmer 4.5s ease-in-out infinite alternate; }
    .team-bars i:nth-child(2) { width: 38%; background: rgba(239,211,155,0.32); animation-duration: 5.2s; animation-delay: 0.5s; }
    .team-bars i:nth-child(3) { width: 17%; background: rgba(239,211,155,0.2); animation-duration: 5.9s; animation-delay: 1s; }
    @keyframes teamFloat { from { transform: translateY(7px); } to { transform: translateY(-9px); } }
    @media (max-width: 1080px) {
      .team { --h: 104px; position: relative; right: auto; top: auto; transform: none; width: 100%; max-width: 380px; margin-bottom: 26px; }
    }
    @media (max-width: 760px) {
      .mental-grid { grid-template-columns: 1fr !important; }
    }

    /* the DUTCH card: a warm sunrise wash with navy type */
    .dutch-wrap {
      background: linear-gradient(135deg, #F2A57E 0%, #EDBE8C 52%, #E6CC94 100%) !important;
      border: none !important;
      --champagne: #0A1D36;
      --white90:   #0A1D36;
      --white70:   #0A1D36;
      --white60:   rgba(10,29,54,0.88);
      --white50:   rgba(10,29,54,0.88);
      --white30:   rgba(10,29,54,0.74);
      --gold:      #0A1D36;
      --gold-text: #0A1D36;
      --sky-text:  #0A1D36;
      --sky-dim:   rgba(255,246,230,0.55);
      --sky-border: rgba(10,29,54,0.16);
    }
    .dutch-wrap .dutch-body, .dutch-wrap .dutch-marker-text, .dutch-wrap .dutch-clinic-text { font-weight: 400; }
    .dutch-dots circle { animation: twinkle 3.2s ease-in-out infinite alternate; animation-delay: calc(var(--i) * 120ms); }
    @keyframes twinkle { from { opacity: 1; } to { opacity: 0.28; } }

    /* life stages: the perimenopause dot pulses, since that is where Ormi starts */
    .stages-grid .stage-dot { position: relative; width: 9px; height: 9px; }
    .stages-grid .stage-card:nth-child(3) .stage-dot::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: 50%;
      background: #E08A5E;
      animation: livePulse 1.8s ease-out infinite;
    }
    @keyframes livePulse { from { transform: scale(1); opacity: 0.85; } to { transform: scale(3.2); opacity: 0; } }

    /* feeling suns: one sun on the horizon per feeling */
    .fsun { position: relative; width: 104px; height: 62px; margin: 6px 0 22px 10px; transform: scale(1.25); transform-origin: 0 50%; }
    .fsun-sky { position: absolute; left: 0; right: 0; top: 0; height: 46px; overflow: hidden; }
    .fsun-disc {
      position: absolute; left: 50%; bottom: calc(-36px * var(--sink, 0.42));
      width: 36px; height: 36px; margin-left: -18px; border-radius: 50%;
      background: var(--hue); opacity: var(--dim, 1);
    }
    .fsun-line { position: absolute; left: 0; right: 0; top: 46px; height: 1px; background: linear-gradient(90deg, rgba(10,29,54,0), rgba(10,29,54,0.4) 25%, rgba(10,29,54,0.4) 75%, rgba(10,29,54,0)); }
    .fsun-bar { position: absolute; left: 50%; top: 54px; width: 30px; height: 2px; margin-left: -15px; border-radius: 2px; background: var(--hue); opacity: 0.55; animation: shimmer 4.5s ease-in-out infinite alternate; }
    .fsun-cloud {
      position: absolute; left: 54%; bottom: 0; width: 34px; height: 13px;
      border-radius: 17px 17px 0 0; background: var(--card); border: 1px solid var(--hue); border-bottom: none;
      animation: driftX var(--speed, 5s) ease-in-out infinite alternate;
    }
    .fsun-bite { position: absolute; left: calc(50% - 6px); bottom: 12px; width: 30px; height: 30px; border-radius: 50%; background: var(--card); }
    .fsun-star { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: rgba(10,29,54,0.5); }

    /* hormone line motifs */
    .hormone-motif { width: 46px; height: 46px; flex-shrink: 0; margin-top: 2px; }
    .hormone-motif .turn { transform-origin: 32px 32px; animation: turn 60s linear infinite; }
    .hormone-motif .ripple { transform-origin: 32px 32px; animation: ripple 5s ease-in-out infinite alternate; }

    /* marks on the three coloured tiles */
    .step-mark { width: 92px; height: 66px; margin-bottom: 20px; display: block; overflow: visible; }
    .step-mark .cloud { animation: thought 4.5s linear infinite; }
    .step-mark .d1 { animation: thoughtDot1 4.5s linear infinite; }
    .step-mark .d2 { animation: thoughtDot2 4.5s linear infinite; }
    .step-mark .br { transform-origin: 17px 17px; animation: breatheRing 6s ease-in-out infinite alternate; }
    .step-mark .tl { animation: driftX 5s ease-in-out infinite alternate; }
    .step-mark .tr { animation: driftXr 5s ease-in-out infinite alternate; }
    .step-mark .tg { animation: glowIn 5s ease-in-out infinite alternate; }

    /* the 35 markers */
    .dutch-dots { width: 210px; max-width: 70%; height: auto; display: block; margin-bottom: 26px; }

    /* ── Always up to date ── */
    .living-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
    @media (max-width: 900px) { .living-grid { grid-template-columns: 1fr; gap: 36px; } }
    .living-card {
      background: linear-gradient(160deg, rgba(200,103,74,0.22) 0%, rgba(15,42,74,0.6) 55%), #0F2A4A;
      border: 1px solid rgba(224,138,94,0.4);
      border-radius: 26px;
      padding: 30px 28px 26px;
    }
    .living-tag { font-size: 12px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-text); margin-bottom: 18px; }
    .week { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-bottom: 24px; }
    .day { text-align: center; opacity: 0.4; transition: opacity 0.6s ease; }
    .day.is-past { opacity: 0.75; }
    .day.is-today { opacity: 1; }
    .day-sky { position: relative; height: 50px; overflow: hidden; border-radius: 10px 10px 0 0; transition: background 0.6s ease; }
    .day.is-today .day-sky { background: rgba(245,230,200,0.08); }
    .day-sun {
      position: absolute; left: 50%; bottom: 0;
      width: 26px; height: 26px; margin-left: -13px; border-radius: 50%;
      background: var(--hue, #D9AE5C);
      transform: translateY(calc(26px * var(--lvl, 0.5)));
      transition: transform 0.9s cubic-bezier(0.22, 0.8, 0.3, 1), background 0.6s ease;
    }
    .day.is-future .day-sun { transform: translateY(26px); }
    .day-line { height: 1px; background: rgba(245,230,200,0.4); }
    .day-name { margin-top: 8px; font-size: 13px; font-weight: 500; color: var(--white50); }
    .day.is-today .day-name { color: var(--champagne); }
    .said { display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px; }
    .said-label { font-size: 15px; color: var(--white50); }
    .said-word { font-family: 'Instrument Serif', serif; font-size: 34px; line-height: 1; color: var(--champagne); }
    .plan-title { font-size: 12px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-text); margin-bottom: 10px; }
    .plan-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .plan-list li {
      display: flex; align-items: center; gap: 12px;
      background: rgba(245,230,200,0.07);
      border: 1px solid rgba(245,230,200,0.12);
      border-radius: 14px;
      padding: 13px 16px;
      font-size: 16px;
      color: var(--champagne);
    }
    .plan-list li::before { content: ''; width: 9px; height: 9px; border-radius: 50%; background: var(--dot, #E08A5E); flex-shrink: 0; }
    .plan-list li:nth-child(1) { --dot: #E6CC94; } .plan-list li:nth-child(2) { --dot: #F2A57E; } .plan-list li:nth-child(3) { --dot: #E08A5E; }
    .living-card.is-swapping .said-word, .living-card.is-swapping .plan-list li { animation: riseIn 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
    .living-card.is-swapping .plan-list li:nth-child(2) { animation-delay: 0.08s; }
    .living-card.is-swapping .plan-list li:nth-child(3) { animation-delay: 0.16s; }
    .living-note { margin-top: 16px; font-size: 13px; color: var(--white30); }

    /* ── Tests compared ── */
    .tests-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
    @media (max-width: 900px) { .tests-grid { grid-template-columns: 1fr; } }
    .test-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 22px;
      padding: 30px 26px;
      display: flex;
      flex-direction: column;
    }
    .test-card { --tone: #F2A57E; --tint: 242,165,126; background: rgba(var(--tint),0.09); border-color: rgba(var(--tint),0.42); }
    .test-card.is-blood { --tone: #E08A5E; --tint: 200,103,74; background: rgba(var(--tint),0.16); border-color: rgba(224,138,94,0.5); }
    .test-card.is-dutch { --tone: #E8C16E; --tint: 232,193,110; background: rgba(var(--tint),0.10); border-color: rgba(var(--tint),0.55); }
    .test-card .test-name, .test-card .test-label { color: var(--tone); }
    .test-card .test-row { border-top-color: rgba(var(--tint),0.28); }
    .t-strip { color: #F2A57E; } .t-blood { color: #E08A5E; } .t-dutch { color: #E8C16E; }
    .test-dots { display: flex; flex-wrap: wrap; gap: 6px; width: 132px; min-height: 84px; align-content: flex-start; margin-bottom: 22px; }
    .test-dots i { width: 12px; height: 12px; border-radius: 50%; background: var(--c, #E6CC94); animation: twinkle 3.2s ease-in-out infinite alternate; animation-delay: calc(var(--i, 0) * 120ms); }
    .test-count { font-size: 13px; color: var(--white30); margin-bottom: 6px; }
    .test-name { font-family: 'Instrument Serif', serif; font-size: 30px; font-weight: 400; color: var(--champagne); line-height: 1.15; margin-bottom: 18px; }
    .test-row { border-top: 1px solid var(--card-border); padding: 14px 0; }
    .test-label { font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold-text); margin-bottom: 6px; }
    .test-text { font-size: 16px; color: var(--white50); line-height: 1.65; }
    .tests-close { margin-top: 34px; max-width: 760px; font-family: 'Instrument Serif', serif; font-size: clamp(22px, 2.4vw, 30px); line-height: 1.35; color: var(--champagne); }
    .tests-source { margin-top: 18px; font-size: 13px; color: var(--white30); line-height: 1.6; max-width: 760px; }

    @media (max-width: 900px) { .test-dots { min-height: 0; } }

    /* ── FAQs ── */
    #faqs, #tests { scroll-margin-top: 70px; }
    .faq-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 56px; align-items: start; }
    @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr; gap: 8px; } }
    .faq-list { border-top: 1px solid var(--card-border); }
    .faq-item { border-bottom: 1px solid var(--card-border); }
    .faq-item summary {
      list-style: none;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      padding: 22px 0;
      font-family: 'Instrument Serif', serif;
      font-size: clamp(22px, 2.1vw, 27px);
      line-height: 1.25;
      color: var(--champagne);
    }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-item summary:focus-visible { outline: 2px solid var(--glow); outline-offset: 4px; border-radius: 6px; }
    .faq-plus {
      position: relative;
      flex-shrink: 0;
      width: 30px; height: 30px;
      margin-top: 2px;
      border-radius: 50%;
      border: 1px solid var(--gold-border);
      transition: transform 0.3s ease, background 0.3s ease;
    }
    .faq-plus::before, .faq-plus::after {
      content: '';
      position: absolute;
      left: 50%; top: 50%;
      width: 12px; height: 1.5px;
      margin: -0.75px 0 0 -6px;
      background: var(--gold-text);
    }
    .faq-plus::after { transform: rotate(90deg); transition: transform 0.3s ease; }
    .faq-item[open] .faq-plus { background: var(--terracotta-deep); border-color: var(--terracotta-deep); transform: rotate(180deg); }
    .faq-item[open] .faq-plus::before, .faq-item[open] .faq-plus::after { background: var(--warm-white); }
    .faq-item[open] .faq-plus::after { transform: rotate(0deg); }
    .faq-answer { padding: 0 50px 24px 0; font-size: 17px; line-height: 1.7; color: var(--white50); max-width: 640px; animation: riseIn 0.35s ease both; }
    .faq-answer a { color: var(--gold-text); }

    /* ── IGNITE feature band ── */
    a.hero-badge { text-decoration: none; transition: background 0.2s, border-color 0.2s; }
    a.hero-badge:hover { background: var(--gold-dim); border-color: var(--gold); }
    #ignite { scroll-margin-top: 70px; }
    section.ignite { padding: 56px 0; background: linear-gradient(100deg, #E6CC94 0%, #E8C16E 45%, #F2A57E 100%); }
    .ignite-inner { display: flex; align-items: center; gap: 44px; }
    .ignite-medal { width: 190px; height: 190px; flex-shrink: 0; }
    .ignite-rays { transform-origin: 100px 100px; animation: turn 50s linear infinite; }
    .ignite-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #0A1D36; margin-bottom: 10px; }
    .ignite-headline { font-family: 'Instrument Serif', serif; font-weight: 400; font-size: clamp(44px, 6.4vw, 88px); line-height: 1; color: #0A1D36; margin-bottom: 14px; }
    .ignite-headline em { font-style: italic; }
    .ignite-copy { font-size: 19px; line-height: 1.6; color: rgba(10,29,54,0.88); max-width: 560px; }
    @media (max-width: 760px) {
      .ignite-inner { flex-direction: column; align-items: flex-start; gap: 22px; }
      .ignite-medal { width: 132px; height: 132px; }
    }

    /* the hero is a flex box, so its container needs an explicit width to line up with the other sections */
    .hero > .container { width: 100%; }
    @media (min-width: 900px) {
      .feelings-grid { grid-template-columns: repeat(3, 1fr) !important; }
    }

    /* ── Sun on the horizon (the app's signature motif: Sun.tsx, Home.tsx) ── */
    .sunrise {
      --sun: 150px;
      position: relative;
      width: calc(var(--sun) * 1.4);
      height: calc(var(--sun) * 0.62 + 56px);
      margin-bottom: 28px;
      pointer-events: none;
    }
    .sunrise-glow {
      position: absolute;
      left: -45%; right: -45%; top: -70%; bottom: -70%;
      background: radial-gradient(closest-side, rgba(217,174,92,0.28) 0%, rgba(217,174,92,0) 100%);
    }
    .sun-clip {
      position: absolute;
      left: 0; right: 0; top: 0;
      height: calc(var(--sun) * 0.62);
      overflow: hidden;
      display: flex;
      justify-content: center;
    }
    .sun-float { animation: sunFloat 9s ease-in-out 2.4s infinite alternate; }
    .sun-disc {
      width: var(--sun);
      height: var(--sun);
      border-radius: 50%;
      background: linear-gradient(180deg, #EFD39B 0%, #E8C16E 40%, #D9AE5C 80%, #C9973A 100%);
      animation: sunRise 2.4s cubic-bezier(0.22, 0.8, 0.3, 1) both;
    }
    .sun-horizon {
      position: absolute;
      left: -8%; right: -8%;
      top: calc(var(--sun) * 0.62);
      height: 1px;
      background: linear-gradient(90deg, rgba(245,230,200,0) 0%, rgba(245,230,200,0.45) 30%, rgba(245,230,200,0.45) 70%, rgba(245,230,200,0) 100%);
      animation: horizonDraw 1.6s ease-out both;
    }
    .sun-bars {
      position: absolute;
      left: 0; right: 0;
      top: calc(var(--sun) * 0.62 + 13px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 9px;
      animation: fadeIn 1.2s ease-out 1.4s both;
    }
    .sun-bar {
      height: 3px;
      border-radius: 2px;
      width: 100%;
      max-width: calc(var(--sun) * 0.75);
      background: rgba(239,211,155,var(--o));
      animation: shimmer var(--d) ease-in-out var(--delay) infinite alternate;
    }
    .sun-bar:nth-child(2) { max-width: calc(var(--sun) * 0.46); }
    .sun-bar:nth-child(3) { max-width: calc(var(--sun) * 0.21); }

    /* evening sun for the last section: the page runs from sunrise to sunset */
    .sunrise.evening { --sun: 170px; margin: 0 auto 44px; }
    .sunrise.evening .sun-disc {
      background: linear-gradient(180deg, #F6C39A 0%, #E08A5E 40%, #C8674A 80%, #A9502F 100%);
      animation: none;
    }
    .sunrise.evening .sunrise-glow { background: radial-gradient(closest-side, rgba(217,121,90,0.28) 0%, rgba(217,121,90,0) 100%); }
    .sunrise.evening .sun-bar { background: rgba(224,138,94,calc(var(--o) * 1.3)); }
    .sunrise.evening .sun-horizon, .sunrise.evening .sun-bars { animation: none; }

    @keyframes sunRise { from { transform: translateY(64%); } to { transform: translateY(0); } }
    @keyframes sunFloat { from { transform: translateY(0); } to { transform: translateY(6px); } }
    @keyframes horizonDraw { from { transform: scaleX(0.2); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes shimmer { from { transform: scaleX(1); opacity: 1; } to { transform: scaleX(0.72); opacity: 0.6; } }
    @keyframes riseIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

    /* one page-load sequence: the sun rises, then the words arrive */
    .hero-content > *:not(.sunrise) { animation: riseIn 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
    .hero-content > *:nth-child(2) { animation-delay: 0.25s; }
    .hero-content > *:nth-child(3) { animation-delay: 0.4s; }
    .hero-content > *:nth-child(4) { animation-delay: 0.6s; }
    .hero-content > *:nth-child(5) { animation-delay: 0.75s; }
    .hero-content > *:nth-child(6) { animation-delay: 0.9s; }

    @media (min-width: 1100px) {
      .hero .sunrise {
        --sun: 280px;
        position: absolute;
        left: clamp(660px, calc(100vw - 460px), 800px);
        top: 20px;
        margin: 0;
      }
    }

    /* ── One slow breath (the app's breathing orb: BreathOrb.tsx, BreathField.tsx) ── */
    .breath-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }
    .orb-wrap {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .orb {
      width: 190px;
      height: 190px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      opacity: 0.9;
      transition: transform 4000ms cubic-bezier(0.37, 0, 0.63, 1), background-color 700ms ease;
    }
    .orb-centre {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-align: center;
      color: var(--champagne);
      transition: color 500ms ease;
      pointer-events: none;
    }
    .orb-wrap.is-active .orb-centre { color: var(--ink); }
    .orb-count { font-family: 'Instrument Serif', serif; font-size: 48px; line-height: 1.1; min-height: 4px; }
    .orb-label { font-size: 17px; font-weight: 600; }
    button.btn-ghost { background: transparent; font-family: inherit; cursor: pointer; }
    @media (max-width: 760px) {
      .breath-grid { grid-template-columns: 1fr; gap: 28px; }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      *, *::before, *::after { animation: none !important; }
      .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
      .orb { transition: background-color 700ms ease; }
    }

    /* ── Nav links ── */
    .nav-right { display: flex; align-items: center; gap: 22px; }
    .nav-link {
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--white50);
      text-decoration: none;
      transition: color 0.2s;
      white-space: nowrap;
    }
    .nav-link:hover { color: var(--gold-text); }

    /* ── Hero badge ── */
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 26px;
      padding: 8px 16px;
      border: 1px solid var(--gold-border);
      border-radius: 40px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold-text);
    }
    .hero-badge::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--glow);
    }

    /* ── Employers ── */
    #employers, #about { scroll-margin-top: 70px; }
    .employers { padding: 72px 0; }
    .employers-card {
      background: var(--obsidian2);
      border: 1px solid var(--gold-border);
      border-radius: 24px;
      padding: 48px 44px;
    }
    .employers-title {
      font-family: 'Instrument Serif', serif;
      font-size: clamp(30px, 4.6vw, 44px);
      font-weight: 400;
      color: var(--champagne);
      line-height: 1.15;
      margin-bottom: 18px;
    }
    .employers-title em { font-style: italic; color: var(--gold); }
    .employers-body {
      font-size: 18px;
      color: var(--white50);
      line-height: 1.75;
      max-width: 620px;
      margin-bottom: 30px;
    }
    .employers-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .employers-actions a { display: inline-block; text-decoration: none; }
    .btn-ghost {
      border: 1px solid var(--gold-border);
      border-radius: 40px;
      padding: 13px 26px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold-text);
      transition: background 0.2s;
      white-space: nowrap;
    }
    .btn-ghost:hover { background: var(--gold-dim); }
    .employers-source {
      margin-top: 22px;
      font-size: 14px;
      color: var(--white30);
      line-height: 1.6;
    }

    /* ── Founders ── */
    .founders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
    }
    .founder-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 22px;
      padding: 32px 28px;
    }
    .founder-photo {
      width: 150px;
      height: 190px;
      border-radius: 75px 75px 14px 14px;
      object-fit: cover;
      object-position: center 20%;
      display: block;
      margin-bottom: 22px;
      border: 1px solid var(--gold-border);
    }
    .founder-name {
      font-family: 'Instrument Serif', serif;
      font-size: 28px;
      font-weight: 400;
      color: var(--champagne);
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .founder-role {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold-text);
      margin-bottom: 16px;
    }
    .founder-bio {
      font-size: 17px;
      color: var(--white50);
      line-height: 1.7;
    }
    .ignite-strip {
      margin-top: 18px;
      border: 1px solid var(--gold-border);
      border-radius: 22px;
      padding: 26px 28px;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 8px 22px;
    }
    .ignite-title {
      font-family: 'Instrument Serif', serif;
      font-size: 26px;
      color: var(--champagne);
      line-height: 1.2;
    }
    .ignite-body {
      font-size: 17px;
      color: var(--white50);
      line-height: 1.7;
    }
    .pricing-footnote {
      margin-top: 28px;
      text-align: left;
      font-size: 15px;
      color: var(--white30);
      line-height: 1.6;
    }

    /* ── Scroll reveal ── */
    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Responsive ── */
    @media (max-width: 580px) {
      nav { padding: 14px 18px; }
      .nav-link { display: none; }
      .employers-card { padding: 34px 24px; }
      section { padding: 64px 0; }
      .waitlist-form { flex-direction: column; }
      .waitlist-form input,
      .waitlist-form button,
      .final-form input,
      .final-form button { width: 100%; }
      .val-item { border-right: none; border-bottom: 1px solid var(--card-border); }
      .val-item:last-child { border-bottom: none; }
      .footer-inner { flex-direction: column; text-align: center; }
      .footer-links { justify-content: center; }
    }
`;

const bodyHTML = `
  <!-- ── Overlay ── -->
  <div id="ormi-banner-overlay"></div>

  <!-- ── Success modal ── -->
  <div id="ormi-banner">
    <div class="banner-header">
      <div class="banner-logo">
        <svg width="22" height="35" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#0A1D36" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
          <circle cx="26" cy="52" r="11" stroke="#B4553A" stroke-width="1.9" fill="none"/>
          <circle cx="26" cy="52" r="4.5" stroke="#B4553A" stroke-width="1.7" fill="none"/>
          <path d="M 26 74 C 26 78, 32 83, 37 80 C 42 77, 42 70, 37 68 C 33 66, 28 70, 30 75" stroke="#0A1D36" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45"/>
        </svg>
        <span class="banner-wordmark">ormi</span>
      </div>
      <button class="banner-dismiss" onclick="dismissBanner()" aria-label="Dismiss">&times;</button>
    </div>
    <p class="banner-heading">You're on the Ormi list. Time to find out what your hormones have been up to.</p>
    <p class="banner-body">Keep an eye on your inbox.</p>
  </div>

  <!-- ── Nav ── -->
  <nav>
    <a href="#" class="nav-logo">
      <!-- Ormi mark SVG — teardrop, two gold rings -->
      <svg width="22" height="35" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#F5E6C8" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="26" cy="52" r="11" stroke="#D9AE5C" stroke-width="1.9" fill="none"/>
        <circle cx="26" cy="52" r="4.5" stroke="#D9AE5C" stroke-width="1.7" fill="none"/>
        <path d="M 26 74 C 26 78, 32 83, 37 80 C 42 77, 42 70, 37 68 C 33 66, 28 70, 30 75" stroke="#F5E6C8" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45"/>
      </svg>
      <div class="nav-divider"></div>
      <span class="nav-wordmark">ormi</span>
    </a>
    <div class="nav-right">
      <a href="#employers" class="nav-link">For employers</a>
      <a href="#about" class="nav-link">About</a>
      <a href="#faqs" class="nav-link">FAQs</a>
      <a href="#waitlist" class="nav-cta">Join the waitlist</a>
    </div>
  </nav>

  <!-- ── Hero ── -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="container">
      <div class="hero-content">
        <div class="sunrise " aria-hidden="true">
          <div class="sunrise-glow"></div>
          <div class="sun-clip"><div class="sun-float"><div class="sun-disc"></div></div></div>
          <div class="sun-horizon"></div>
          <div class="sun-bars">
            <div class="sun-bar" style="--d:4.5s; --delay:0s; --o:0.5;"></div>
            <div class="sun-bar" style="--d:5.2s; --delay:0.5s; --o:0.32;"></div>
            <div class="sun-bar" style="--d:5.9s; --delay:1s; --o:0.2;"></div>
          </div>
        </div>
        <p class="hero-eyebrow">Hormone intelligence for perimenopause and beyond</p>
        <h1 class="hero-headline">
          Everything you've<br />been feeling<br /><em>finally makes sense.</em>
        </h1>
        <p class="hero-headline-sub">You're not imagining it. You're not too sensitive. And you're not the only one.</p>
        <p class="hero-sub">
          Ormi puts how you feel first. Then it connects your hormones, your wearable, your daily check-ins and your life. <strong>So you can see what's working, and walk into your GP with data.</strong>
        </p>
        <div id="waitlist">
          <p class="prelaunch-note">Ormi isn't on the App Store yet. Join the waitlist to register your interest and we'll let you know as soon as it's ready.</p>
          <form class="waitlist-form" onsubmit="handleSubmit(event,'hero-ok')">
            <input type="email" placeholder="Your email address" required autocomplete="email" />
            <button type="submit" class="btn-gold">Join the waitlist</button>
          </form>
          <div id="hero-ok" class="success-msg" style="display:none!important;">You're on the list. We'll be in touch soon.</div>
          <p class="form-note">No spam. Ever. Just Ormi when it's ready. See our <a href="/privacy" style="color:inherit;">privacy notice</a>.</p>
          <a href="#ignite" class="hero-badge">IGNITE 2026 finalist</a>
        </div>
      </div>
    </div>
  </section>

  <!--
    Stat sources (checked 13 Nov 2026):
    "Nearly 1 in 10": Newson Health survey of almost 6,000 women, reported by
    The Independent: nearly one in ten had six to ten appointments before
    their symptoms were diagnosed as linked to perimenopause or menopause.
    "7 to 9 years": NHS, Menopause symptoms, reviewed 19 May 2026
    (nhs.uk/conditions/menopause/symptoms).
    "35": Precision Analytical, DUTCH Complete: analysis of 35 hormones and
    metabolites (dutchtest.com).
  -->
  <div class="validation">
    <div class="container">
      <div class="validation-inner">
        <div class="val-item">
          <div class="val-stat">Nearly 1 in 10</div>
          <div class="val-label">women had six to ten appointments before their symptoms were linked to perimenopause or menopause</div>
          <div class="val-source">Newson Health survey of almost 6,000 women</div>
        </div>
        <div class="val-item">
          <div class="val-stat">7 to 9 years</div>
          <div class="val-label">how long menopause symptoms usually last. For some women it is longer</div>
          <div class="val-source">NHS, reviewed May 2026</div>
        </div>
        <div class="val-item">
          <div class="val-stat">35</div>
          <div class="val-label">hormones and metabolites measured by the at-home DUTCH Complete test</div>
          <div class="val-source">Precision Analytical</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── IGNITE 2026 ── -->
  <section class="ignite" id="ignite">
    <div class="container">
      <div class="ignite-inner">
        <svg class="ignite-medal" viewBox="0 0 200 200" aria-hidden="true">
          <g class="ignite-rays" stroke="#0A1D36" stroke-width="3" stroke-linecap="round"><line x1="100" y1="14" x2="100" y2="30" transform="rotate(0 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(15 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(30 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(45 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(60 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(75 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(90 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(105 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(120 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(135 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(150 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(165 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(180 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(195 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(210 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(225 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(240 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(255 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(270 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(285 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(300 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(315 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(330 100 100)"/><line x1="100" y1="14" x2="100" y2="30" transform="rotate(345 100 100)"/></g>
          <circle cx="100" cy="100" r="62" fill="#0A1D36"/>
          <circle cx="100" cy="100" r="54" fill="none" stroke="#E6CC94" stroke-width="1.2"/>
          <text x="100" y="92" text-anchor="middle" font-family="'Instrument Serif', serif" font-size="30" fill="#F5E6C8">2026</text>
          <text x="100" y="116" text-anchor="middle" font-family="'Work Sans', sans-serif" font-size="11" font-weight="600" letter-spacing="3" fill="#E6CC94">FINALIST</text>
        </svg>
        <div>
          <p class="ignite-eyebrow">Recognition</p>
          <h2 class="ignite-headline">IGNITE 2026 <em>finalist.</em></h2>
          <p class="ignite-copy">Ormi was a finalist in IGNITE 2026, run by the Ford Family Foundation and delivered with Cambio.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Employers ── -->
  <!--
    Source: Employment Rights Act 2025, equality action plans (gender pay gap
    and menopause support) for employers with 250+ employees. Voluntary from
    April 2026, expected to be mandatory from spring 2027 subject to secondary
    legislation. GOV.UK: gov.uk/government/publications/creating-an-action-plan-guidance-for-employers
  -->
  <section class="employers" id="employers">
    <div class="container">
      <div class="employers-card reveal">
        <div class="team" aria-hidden="true"><div class="team-sky"><span style="--x:2%; --s:52px; --hue:#E6CC94; --sink:0.35; --t:5.2s;"></span><span style="--x:17%; --s:78px; --hue:#F2A57E; --sink:0.30; --t:6.4s;"></span><span style="--x:38%; --s:104px; --hue:#C8674A; --sink:0.38; --t:7.5s;"></span><span style="--x:66%; --s:70px; --hue:#D9AE5C; --sink:0.32; --t:5.8s;"></span><span style="--x:85%; --s:46px; --hue:#E08A5E; --sink:0.40; --t:4.6s;"></span></div><span class="team-line"></span><div class="team-bars"><i></i><i></i><i></i></div></div>
        <p class="eyebrow" style="text-align:left;">For employers</p>
        <h2 class="employers-title">Menopause action plans are coming.<br /><em>Is your team ready?</em></h2>
        <p class="employers-body">From spring 2027, UK employers with 250 or more staff are expected to publish an action plan showing how they support employees through menopause. Ormi gives the women in your team a place to understand how they feel and what helps. We offer flexible packages to suit your organisation.</p>
        <div class="employers-actions">
          <a href="mailto:hello@ormi.health?subject=Ormi%20for%20employers" class="btn-gold">Email hello@ormi.health</a>
          <a href="#final-waitlist" class="btn-ghost">Join the waitlist</a>
        </div>
        <p class="employers-source">Employment Rights Act 2025. Expected from spring 2027, subject to final regulations.</p>
      </div>
    </div>
  </section>

  <!-- ── Feelings section ── -->
  <!-- Symptoms named here are listed by the NHS: nhs.uk/conditions/menopause/symptoms (reviewed 19 May 2026) -->
  <section class="light">
    <div class="container">
      <p class="eyebrow">Sound familiar?</p>
      <h2 class="section-title">If you don't feel like yourself lately,<br /><em>you're not alone.</em></h2>
      <p class="section-sub">Mood swings, low mood, brain fog and broken sleep are all recognised symptoms of perimenopause and menopause. Ormi helps you notice your own patterns.</p>

      <div class="feelings-grid">
        <div class="feeling-card reveal">
          <div class="fsun" aria-hidden="true" style="--hue:#E08A5E; --sink:0.42; --dim:1;"><div class="fsun-sky"><span class="fsun-disc"></span><span class="fsun-cloud" style="--speed:2.4s;"></span></div><span class="fsun-line"></span><span class="fsun-bar"></span></div>
          <p class="feeling-text">"I feel anxious all the time and I don't know why."</p>
          <p class="feeling-reframe">Anxiety can be part of perimenopause. A daily check-in helps you see when it shows up.</p>
        </div>
        <div class="feeling-card reveal">
          <div class="fsun" aria-hidden="true" style="--hue:#D9AE5C; --sink:0.2; --dim:1;"><div class="fsun-sky"><span class="fsun-disc"></span><span class="fsun-bite"></span><span class="fsun-star" style="left:18%;top:10px;"></span><span class="fsun-star" style="left:80%;top:6px;"></span></div><span class="fsun-line"></span><span class="fsun-bar"></span></div>
          <p class="feeling-text">"I wake up at 3am with my heart racing. I'm exhausted but I can't sleep."</p>
          <p class="feeling-reframe">Sleep problems are a common symptom. Ormi brings your sleep, your check-ins and your wearable together.</p>
        </div>
        <div class="feeling-card reveal">
          <div class="fsun" aria-hidden="true" style="--hue:#F2A57E; --sink:0.42; --dim:0.75;"><div class="fsun-sky"><span class="fsun-disc"></span></div><span class="fsun-line"></span><span class="fsun-bar"></span></div>
          <p class="feeling-text">"My GP said my bloods are normal, but something is clearly not right."</p>
          <p class="feeling-reframe">Ormi helps you build a record of how you feel over time, to take to your GP.</p>
        </div>
        <div class="feeling-card reveal">
          <div class="fsun" aria-hidden="true" style="--hue:#C8674A; --sink:0.42; --dim:1;"><div class="fsun-sky"><span class="fsun-disc"></span><span class="fsun-cloud" style="--speed:2.4s;"></span></div><span class="fsun-line"></span><span class="fsun-bar"></span></div>
          <p class="feeling-text">"I snap at my kids and then cry about it. I don't recognise myself."</p>
          <p class="feeling-reframe">Mood swings are a recognised symptom. Seeing the pattern makes it easier to talk about.</p>
        </div>
        <div class="feeling-card reveal">
          <div class="fsun" aria-hidden="true" style="--hue:#B4553A; --sink:0.72; --dim:0.7;"><div class="fsun-sky"><span class="fsun-disc"></span></div><span class="fsun-line"></span><span class="fsun-bar"></span></div>
          <p class="feeling-text">"I'm so tired all the time. Coffee doesn't even touch it."</p>
          <p class="feeling-reframe">Ormi helps you see how your sleep and your energy move together.</p>
        </div>
        <div class="feeling-card reveal">
          <div class="fsun" aria-hidden="true" style="--hue:#D9AE5C; --sink:0.42; --dim:0.6;"><div class="fsun-sky"><span class="fsun-disc"></span><span class="fsun-cloud" style="--speed:5s;"></span></div><span class="fsun-line"></span><span class="fsun-bar"></span></div>
          <p class="feeling-text">"My brain just isn't working. I forget words. I lose my train of thought."</p>
          <p class="feeling-reframe">The NHS calls this brain fog, and lists it as a common symptom. You're not making it up.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Mental health section ── -->
  <section style="background:var(--obsidian2);">
    <div class="container">
      <p class="eyebrow">Mental health first</p>
      <blockquote class="mental-quote">
        Ormi starts with how you feel. Then it helps you look at what might be behind it.
      </blockquote>
      <div class="mental-grid">
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--rose-dim); border:1px solid var(--rose-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C8 2 3 5.5 3 9C3 11.5 5.2 13.5 8 13.5C10.8 13.5 13 11.5 13 9C13 5.5 8 2 8 2Z" stroke="#F2A57E" stroke-width="1.2"/><circle cx="8" cy="9" r="2" stroke="#F2A57E" stroke-width="1.2"/></svg>
          </div>
          <h3 class="mental-title">Anxiety &amp; low mood</h3>
          <p class="mental-body">Both can be part of perimenopause and menopause. Ormi's daily check-in uses words, not scores, so you can say how you feel in seconds.</p>
        </div>
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--gold-dim); border:1px solid var(--gold-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="#D9AE5C" stroke-width="1.2"/><path d="M8 5v3l2 2" stroke="#D9AE5C" stroke-width="1.2" stroke-linecap="round"/></svg>
          </div>
          <h3 class="mental-title">Mood swings</h3>
          <p class="mental-body">The snap, then the regret. Mood swings are a recognised symptom. Ormi gives you CBT-based tools for the moment, and a record of when it happens.</p>
        </div>
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--sky-dim); border:1px solid var(--sky-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h3l2-4 2 8 2-4 2 2h1" stroke="#E08A5E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="mental-title">Brain fog</h3>
          <p class="mental-body">Memory and concentration can change. Ormi helps you notice what makes the fog lighter or heavier for you.</p>
        </div>
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--rose-dim); border:1px solid var(--rose-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8C4 5.8 5.8 4 8 4C10.2 4 12 5.8 12 8" stroke="#F2A57E" stroke-width="1.2" stroke-linecap="round"/><path d="M8 12V8" stroke="#F2A57E" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="13" r="1" fill="#F2A57E"/></svg>
          </div>
          <h3 class="mental-title">Sleep</h3>
          <p class="mental-body">Broken sleep can make everything else feel harder. Ormi has wind-down tools for the evening, and reads your sleep from your wearable.</p>
        </div>
      </div>
      <p class="pricing-footnote">Ormi does not replace your GP. If you're worried about your mental health, please speak to them.</p>
    </div>
  </section>

  <!-- ── Hormones as messengers ── -->
  <section class="messenger">
    <div class="container">
      <div class="messenger-grid">
        <div>
          <p class="eyebrow" style="text-align:left;">A different way to think about it</p>
          <h2 class="messenger-title">Your hormones aren't the problem.<br />They're <em>messengers.</em></h2>
          <p class="messenger-body">
            Hormones carry signals all day long. In perimenopause, levels of oestrogen and progesterone change, and that can change how you feel.
          </p>
          <p class="messenger-body">
            Nobody teaches you how to read those signals. Ormi helps you notice patterns across your check-ins, your wearable and your results, so you can have a better conversation with your clinician.
          </p>
        </div>
        <div class="messenger-hormones">
          <div class="hormone-row reveal">
            <svg class="hormone-motif" viewBox="0 0 64 64" aria-hidden="true"><g class="turn" stroke="#E08A5E" stroke-width="1.8" fill="none"><ellipse cx="32" cy="19" rx="7" ry="13" transform="rotate(0 32 32)"/><ellipse cx="32" cy="19" rx="7" ry="13" transform="rotate(72 32 32)"/><ellipse cx="32" cy="19" rx="7" ry="13" transform="rotate(144 32 32)"/><ellipse cx="32" cy="19" rx="7" ry="13" transform="rotate(216 32 32)"/><ellipse cx="32" cy="19" rx="7" ry="13" transform="rotate(288 32 32)"/><circle cx="32" cy="32" r="3.5" fill="#E08A5E"/></g></svg>
            <div>
              <div class="hormone-name">Oestrogen</div>
              <div class="hormone-what">Levels rise and fall through the cycle, and become less predictable in perimenopause.</div>
            </div>
          </div>
          <div class="hormone-row reveal">
            <svg class="hormone-motif" viewBox="0 0 64 64" aria-hidden="true"><g stroke="#E6CC94" stroke-width="1.8" fill="none"><circle cx="32" cy="32" r="5" fill="#E6CC94"/><circle cx="32" cy="32" r="13"/><g class="ripple"><circle cx="32" cy="32" r="22" opacity="0.6"/><circle cx="32" cy="32" r="30" opacity="0.3"/></g></g></svg>
            <div>
              <div class="hormone-name">Progesterone</div>
              <div class="hormone-what">Made after ovulation each cycle. Levels change as cycles become irregular.</div>
            </div>
          </div>
          <div class="hormone-row reveal">
            <svg class="hormone-motif" viewBox="0 0 64 64" aria-hidden="true"><g stroke="#D9AE5C" stroke-width="4" stroke-linecap="round"><circle cx="14" cy="14" r="6" fill="#D9AE5C" stroke="none"/><line x1="14" y1="56" x2="14" y2="20"/><line x1="23" y1="56" x2="23" y2="27"/><line x1="32" y1="56" x2="32" y2="34"/><line x1="41" y1="56" x2="41" y2="41"/><line x1="50" y1="56" x2="50" y2="48"/></g></svg>
            <div>
              <div class="hormone-name">Cortisol</div>
              <div class="hormone-what">Often called the stress hormone. It normally follows a daily rhythm, higher in the morning and lower at night.</div>
            </div>
          </div>
          <div class="hormone-row reveal">
            <svg class="hormone-motif" viewBox="0 0 64 64" aria-hidden="true"><g stroke="#C3D0E0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M16 52 L32 38 L48 52" opacity="0.4"/><path d="M16 40 L32 26 L48 40" opacity="0.7"/><path d="M16 28 L32 14 L48 28"/></g></svg>
            <div>
              <div class="hormone-name">DHEA, testosterone, melatonin + more</div>
              <div class="hormone-what">The DUTCH test also looks at these, along with how hormones are broken down.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── How it works ── -->
  <section style="background:var(--obsidian2);">
    <div class="container">
      <p class="eyebrow">How it works</p>
      <h2 class="section-title">Translate. Act.<br /><em>Connect.</em></h2>
      <p class="section-sub">Ormi isn't a tracker. It's a daily companion that helps you understand how you feel and decide what to do next.</p>

      <div class="steps-grid">
        <div class="step reveal">
          <div class="step-num">1</div>
          <svg class="step-mark" viewBox="0 0 26 24" aria-hidden="true"><g class="cloud" fill="#0A1D36"><circle cx="11" cy="9" r="5"/><circle cx="17" cy="8" r="5.5"/><circle cx="21" cy="11.5" r="3.6"/><circle cx="8" cy="12" r="3.6"/><rect x="8" y="10" width="13" height="5.6" rx="2.8"/></g><circle class="d1" cx="7" cy="17.6" r="1.9" fill="#0A1D36"/><circle class="d2" cx="4.6" cy="20.4" r="1.2" fill="#0A1D36"/></svg>
          <h3 class="step-title">Translate</h3>
          <p class="step-body">A daily check-in in words, not scores. Your hormone portrait. Patterns across your wearable, your symptoms and your life.</p>
        </div>
        <div class="step reveal">
          <div class="step-num">2</div>
          <svg class="step-mark" viewBox="0 0 34 34" aria-hidden="true"><g fill="none" stroke="#0A1D36" stroke-width="1.3" stroke-linecap="round"><circle cx="17" cy="17" r="4"/><g class="br"><circle cx="17" cy="17" r="9" opacity="0.7"/><circle cx="17" cy="17" r="13" opacity="0.35"/></g></g></svg>
          <h3 class="step-title">Act</h3>
          <p class="step-body">A daily plan with CBT-based tools, nervous system tools and wind-down for sleep.</p>
        </div>
        <div class="step reveal">
          <div class="step-num">3</div>
          <svg class="step-mark" viewBox="0 0 110 74" aria-hidden="true"><circle class="tl" cx="38" cy="37" r="32" fill="none" stroke="#0A1D36" stroke-width="1.8"/><circle class="tr" cx="72" cy="37" r="32" fill="rgba(10,29,54,0.10)" stroke="#0A1D36" stroke-width="1.8"/><circle class="tg" cx="55" cy="37" r="4.5" fill="#FFF6E6"/></svg>
          <h3 class="step-title">Connect</h3>
          <p class="step-body">Live coaching and community, synced wearables, at-home DUTCH testing and a GP review of your results.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Always up to date ── -->
  <section id="living">
    <div class="container">
      <div class="living-grid">
        <div>
          <p class="eyebrow">Always up to date</p>
          <h2 class="section-title">Not a one-off result.<br /><em>A picture that moves with you.</em></h2>
          <p class="messenger-body">A test result is one moment in time. Ormi keeps listening. Each check-in you make, each night of sleep from your wearable and each result you add updates your picture.</p>
          <p class="messenger-body">Then Ormi turns it into a plan for today. Three small things, chosen from what you've told us, so you always know what to do next.</p>
        </div>
        <div class="living-card" id="living-card" aria-label="Example: a week of check-ins, each one changing the plan for that day">
          <p class="living-tag">Your week</p>
          <div class="week"><div class="day" data-day="0"><div class="day-sky"><span class="day-sun"></span></div><div class="day-line"></div><div class="day-name">M</div></div><div class="day" data-day="1"><div class="day-sky"><span class="day-sun"></span></div><div class="day-line"></div><div class="day-name">T</div></div><div class="day" data-day="2"><div class="day-sky"><span class="day-sun"></span></div><div class="day-line"></div><div class="day-name">W</div></div><div class="day" data-day="3"><div class="day-sky"><span class="day-sun"></span></div><div class="day-line"></div><div class="day-name">T</div></div><div class="day" data-day="4"><div class="day-sky"><span class="day-sun"></span></div><div class="day-line"></div><div class="day-name">F</div></div><div class="day" data-day="5"><div class="day-sky"><span class="day-sun"></span></div><div class="day-line"></div><div class="day-name">S</div></div><div class="day" data-day="6"><div class="day-sky"><span class="day-sun"></span></div><div class="day-line"></div><div class="day-name">S</div></div></div>
          <div class="said"><span class="said-label">Today you said</span><span class="said-word" id="said-word">Wired</span></div>
          <p class="plan-title">Today's plan</p>
          <ul class="plan-list" id="plan-list">
            <li>A nervous system tool</li>
            <li>One slow breath</li>
            <li>Wind-down for sleep</li>
          </ul>
          <p class="living-note">An example. Your plan is built from your own check-ins.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── One slow breath ── -->
  <section id="breath">
    <div class="container">
      <div class="breath-grid">
        <div>
          <p class="eyebrow" style="text-align:left;">Try it</p>
          <h2 class="messenger-title">One slow breath.</h2>
          <p class="messenger-body">This is one of the nervous system tools inside Ormi. In for four, out for six. Three rounds takes thirty seconds.</p>
          <button type="button" class="btn-ghost" id="breath-btn" onclick="startBreath()">Start</button>
        </div>
        <div class="orb-wrap" id="orb-wrap">
          <div class="orb" id="orb"></div>
          <div class="orb-centre" aria-live="polite">
            <span class="orb-count" id="orb-count"></span>
            <span class="orb-label" id="orb-label">Ready when you are</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Life stages ── -->
  <section>
    <div class="container">
      <p class="eyebrow">Life stages</p>
      <h2 class="section-title">Wherever you are <em>right now.</em></h2>
      <p class="section-sub">Ormi is built for every moment of hormonal change. We're focused on perimenopause first, but Ormi is relevant to you, whatever stage you're in.</p>
      <div class="stages-grid">
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#D9AE5C;"></div>
          <div class="stage-name">Regular cycle</div>
          <div class="stage-body">Tools and tips that follow the phases of your cycle, so you can see how you feel week by week.</div>
        </div>
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#E6CC94;"></div>
          <div class="stage-name">Postpartum</div>
          <div class="stage-body">Hormone levels change quickly after birth. Ormi gives you a calm place to check in, and tools for the moment. It does not replace your midwife, health visitor or GP.</div>
        </div>
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#C8674A;"></div>
          <div class="stage-name">Perimenopause</div>
          <div class="stage-body">Cycles change. Sleep changes. Mood changes. Ormi helps you make sense of the pattern and plan around where you are.</div>
        </div>
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#E08A5E;"></div>
          <div class="stage-name">Menopause</div>
          <div class="stage-body">Beyond hot flushes. Ormi helps you keep track of sleep, mood and what's working, with clarity, not alarm.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── DUTCH ── -->
  <!--
    Sources (checked 13 Nov 2026): Precision Analytical, DUTCH Complete
    (dutchtest.com). Clinic prices: Freya Clinic £395 with a 30-minute
    session (freyaclinic.co.uk/products/dutch-test); Pippa Campbell Health
    £1,030 package (pippacampbellhealth.com/dutch-test-uk).
  -->
  <section style="background:var(--obsidian2);">
    <div class="container">
      <div class="dutch-wrap">
        <div>
          <p class="eyebrow" style="text-align:left; margin-bottom:14px;">Clinical insight</p>
          <h2 class="dutch-title">Your hormone portrait is the start.<br /><em>The DUTCH test goes deeper.</em></h2>
          <p class="dutch-body">The DUTCH Complete is an at-home dried urine test that measures 35 hormones and metabolites. Ormi sends it to your door and adds AI interpretation. A GP reviews your results, and you get an NHS-ready summary to take to your own doctor.</p>

          <div class="dutch-clinic-compare">
            <div class="dutch-clinic-label">vs a private hormone clinic</div>
            <div class="dutch-clinic-text">
              Private clinics charge from <strong>£395 to over £1,000</strong> for a DUTCH test with interpretation. Ormi brings the test, AI interpretation and a GP results review together, from your own home.
            </div>
          </div>

          <a href="#final-waitlist" class="btn-gold" style="display:inline-block; text-decoration:none;">Join the waitlist</a>
        </div>
        <div class="dutch-markers">
          <svg class="dutch-dots" viewBox="0 0 92 70" role="img" aria-label="35 dots, one for each hormone and metabolite the DUTCH Complete test measures"><circle cx="8.0" cy="7" r="3.2" fill="#0A1D36" style="--i:0;"/><circle cx="20.7" cy="7" r="3.2" fill="#C8674A" style="--i:1;"/><circle cx="33.4" cy="7" r="3.2" fill="#B4553A" style="--i:2;"/><circle cx="46.1" cy="7" r="3.2" fill="#0A1D36" style="--i:3;"/><circle cx="58.8" cy="7" r="3.2" fill="#FFF6E6" style="--i:4;"/><circle cx="71.5" cy="7" r="3.2" fill="#0A1D36" style="--i:5;"/><circle cx="84.2" cy="7" r="3.2" fill="#C8674A" style="--i:6;"/><circle cx="8.0" cy="21" r="3.2" fill="#B4553A" style="--i:1;"/><circle cx="20.7" cy="21" r="3.2" fill="#0A1D36" style="--i:2;"/><circle cx="33.4" cy="21" r="3.2" fill="#FFF6E6" style="--i:3;"/><circle cx="46.1" cy="21" r="3.2" fill="#0A1D36" style="--i:4;"/><circle cx="58.8" cy="21" r="3.2" fill="#C8674A" style="--i:5;"/><circle cx="71.5" cy="21" r="3.2" fill="#B4553A" style="--i:6;"/><circle cx="84.2" cy="21" r="3.2" fill="#0A1D36" style="--i:7;"/><circle cx="8.0" cy="35" r="3.2" fill="#FFF6E6" style="--i:2;"/><circle cx="20.7" cy="35" r="3.2" fill="#0A1D36" style="--i:3;"/><circle cx="33.4" cy="35" r="3.2" fill="#C8674A" style="--i:4;"/><circle cx="46.1" cy="35" r="3.2" fill="#B4553A" style="--i:5;"/><circle cx="58.8" cy="35" r="3.2" fill="#0A1D36" style="--i:6;"/><circle cx="71.5" cy="35" r="3.2" fill="#FFF6E6" style="--i:7;"/><circle cx="84.2" cy="35" r="3.2" fill="#0A1D36" style="--i:8;"/><circle cx="8.0" cy="49" r="3.2" fill="#C8674A" style="--i:3;"/><circle cx="20.7" cy="49" r="3.2" fill="#B4553A" style="--i:4;"/><circle cx="33.4" cy="49" r="3.2" fill="#0A1D36" style="--i:5;"/><circle cx="46.1" cy="49" r="3.2" fill="#FFF6E6" style="--i:6;"/><circle cx="58.8" cy="49" r="3.2" fill="#0A1D36" style="--i:7;"/><circle cx="71.5" cy="49" r="3.2" fill="#C8674A" style="--i:8;"/><circle cx="84.2" cy="49" r="3.2" fill="#B4553A" style="--i:9;"/><circle cx="8.0" cy="63" r="3.2" fill="#0A1D36" style="--i:4;"/><circle cx="20.7" cy="63" r="3.2" fill="#FFF6E6" style="--i:5;"/><circle cx="33.4" cy="63" r="3.2" fill="#0A1D36" style="--i:6;"/><circle cx="46.1" cy="63" r="3.2" fill="#C8674A" style="--i:7;"/><circle cx="58.8" cy="63" r="3.2" fill="#B4553A" style="--i:8;"/><circle cx="71.5" cy="63" r="3.2" fill="#0A1D36" style="--i:9;"/><circle cx="84.2" cy="63" r="3.2" fill="#FFF6E6" style="--i:10;"/></svg>
          <p style="font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold-text); margin-bottom:12px; font-weight:500;">What DUTCH measures</p>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>Sex hormones</strong>: oestrogen, progesterone and testosterone, and how they are broken down.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>Daily cortisol pattern</strong>: free cortisol measured across the day, not at a single point.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>DHEA</strong>: and other adrenal hormones.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>Melatonin &amp; organic acids</strong>: overnight melatonin and a small panel of organic acid markers.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>35 hormones and metabolites.</strong> Collected at home. Interpreted with AI. Reviewed by a GP. Summarised for your doctor.</div></div>
          <p class="employers-source">The DUTCH test is not an NHS test and it is not a diagnosis. Ormi highlights patterns to discuss with a clinician.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Tests compared ── -->
  <!--
    Sources (checked 14 Nov 2026):
    NICE NG23 rec 1.2.1 and quality standard QS143 statement 1: diagnose perimenopause in
    otherwise healthy women over 45 on symptoms, without laboratory tests, because hormone
    levels fluctuate; FSH test considered at 40 to 45 and under 40; other tests such as
    thyroid function may be needed if non-menopausal causes are suspected.
    RCOG position on over-the-counter FSH tests, as reported by Which? and the BBC.
    Precision Analytical, DUTCH Complete (dutchtest.com): 35 hormones, four or five dried
    urine samples over 24 hours.
  -->
  <section id="tests">
    <div class="container">
      <p class="eyebrow">Tests, explained</p>
      <h2 class="section-title"><span class="t-strip">Strip test</span>, <span class="t-blood">blood test</span> or <span class="t-dutch">the DUTCH test</span>?<br /><em>What each one shows.</em></h2>
      <p class="section-sub">No test can diagnose perimenopause on its own. Your symptoms come first. Here is what each test measures, and what it can't tell you.</p>
      <div class="tests-grid">
        <div class="test-card reveal">
          <div class="test-dots" aria-hidden="true"><i style="--c:#F2A57E; --i:0;"></i></div>
          <p class="test-count">1 hormone</p>
          <h3 class="test-name">Strip test</h3>
          <div class="test-row">
            <p class="test-label">What it measures</p>
            <p class="test-text">One hormone, FSH, in a urine sample, at one moment. Sold in supermarkets and pharmacies for a few pounds.</p>
          </div>
          <div class="test-row">
            <p class="test-label">What it can't tell you</p>
            <p class="test-text">A raised result may point to perimenopause or menopause, but a normal one doesn't rule it out. The Royal College of Obstetricians and Gynaecologists does not recommend these tests.</p>
          </div>
        </div>
        <div class="test-card is-blood reveal">
          <div class="test-dots" aria-hidden="true"><i style="--c:#E08A5E; --i:0;"></i><i style="--c:#E08A5E; --i:1;"></i></div>
          <p class="test-count">Usually 1 or 2 hormones</p>
          <h3 class="test-name">Blood test</h3>
          <div class="test-row">
            <p class="test-label">What it measures</p>
            <p class="test-text">Usually FSH, sometimes with oestradiol, from a single sample. Through your GP or a private lab.</p>
          </div>
          <div class="test-row">
            <p class="test-label">What it can't tell you</p>
            <p class="test-text">Hormone levels move up and down in perimenopause, so one sample is a snapshot. NICE says women over 45 should be diagnosed on symptoms, without lab tests. Blood tests can still help under 45, or to rule out other causes such as thyroid problems.</p>
          </div>
        </div>
        <div class="test-card is-dutch reveal">
          <div class="test-dots" aria-hidden="true"><i style="--c:#EFD39B; --i:0;"></i><i style="--c:#C9973A; --i:1;"></i><i style="--c:#D9AE5C; --i:2;"></i><i style="--c:#F5E6C8; --i:3;"></i><i style="--c:#E8C16E; --i:4;"></i><i style="--c:#EFD39B; --i:5;"></i><i style="--c:#C9973A; --i:6;"></i><i style="--c:#D9AE5C; --i:1;"></i><i style="--c:#F5E6C8; --i:2;"></i><i style="--c:#E8C16E; --i:3;"></i><i style="--c:#EFD39B; --i:4;"></i><i style="--c:#C9973A; --i:5;"></i><i style="--c:#D9AE5C; --i:6;"></i><i style="--c:#F5E6C8; --i:7;"></i><i style="--c:#E8C16E; --i:2;"></i><i style="--c:#EFD39B; --i:3;"></i><i style="--c:#C9973A; --i:4;"></i><i style="--c:#D9AE5C; --i:5;"></i><i style="--c:#F5E6C8; --i:6;"></i><i style="--c:#E8C16E; --i:7;"></i><i style="--c:#EFD39B; --i:8;"></i><i style="--c:#C9973A; --i:3;"></i><i style="--c:#D9AE5C; --i:4;"></i><i style="--c:#F5E6C8; --i:5;"></i><i style="--c:#E8C16E; --i:6;"></i><i style="--c:#EFD39B; --i:7;"></i><i style="--c:#C9973A; --i:8;"></i><i style="--c:#D9AE5C; --i:9;"></i><i style="--c:#F5E6C8; --i:4;"></i><i style="--c:#E8C16E; --i:5;"></i><i style="--c:#EFD39B; --i:6;"></i><i style="--c:#C9973A; --i:7;"></i><i style="--c:#D9AE5C; --i:8;"></i><i style="--c:#F5E6C8; --i:9;"></i><i style="--c:#E8C16E; --i:10;"></i></div>
          <p class="test-count">35 hormones and metabolites</p>
          <h3 class="test-name">The DUTCH test</h3>
          <div class="test-row">
            <p class="test-label">What it measures</p>
            <p class="test-text">35 hormones and metabolites from four or five dried urine samples collected at home over 24 hours, including a daily cortisol pattern.</p>
          </div>
          <div class="test-row">
            <p class="test-label">What it can't tell you</p>
            <p class="test-text">It does not diagnose perimenopause, and it is not an NHS test. NICE does not call for any hormone test to diagnose perimenopause in women over 45. It gives you a wider picture to discuss with a clinician.</p>
          </div>
        </div>
      </div>
      <p class="tests-close">That's why Ormi starts with a free hormone portrait and daily check-ins, and keeps the DUTCH test optional.</p>
      <p class="tests-source">Sources: NICE guideline NG23 and quality standard QS143. Royal College of Obstetricians and Gynaecologists. Precision Analytical.</p>
    </div>
  </section>

  <!-- ── Pricing ── -->
  <section class="light">
    <div class="container">
      <p class="eyebrow">Pricing</p>
      <h2 class="section-title">Start free.<br /><em>Go deeper when you're ready.</em></h2>
      <p class="section-sub">No subscription needed to get started. Go deeper when Ormi has earned it.</p>

      <div class="pricing-grid">

        <!-- Free -->
        <div class="pricing-card reveal">
          <div class="pricing-tier">Free</div>
          <div class="pricing-price">£0</div>
          <div class="pricing-price-note">Always free, no card required</div>
          <div class="pricing-hr"></div>
          <div class="pricing-features">
            <div class="pricing-feature">Your hormone portrait</div>
            <div class="pricing-feature">Daily check-ins in words, not scores</div>
            <div class="pricing-feature">Core tools</div>
          </div>
        </div>

        <!-- Ormi Circle -->
        <div class="pricing-card reveal">
          <div class="pricing-tier">Ormi Circle</div>
          <div class="pricing-price">£14.99</div>
          <div class="pricing-price-note">a month, or £129 a year</div>
          <div class="pricing-hr"></div>
          <div class="pricing-features">
            <div class="pricing-feature">Everything in Free</div>
            <div class="pricing-feature">Wearable sync</div>
            <div class="pricing-feature">Full tool library</div>
            <div class="pricing-feature">Live coaching</div>
            <div class="pricing-feature">AI guidance</div>
          </div>
        </div>

        <!-- Clinical insight -->
        <div class="pricing-card featured reveal">
          <div class="pricing-badge">Most complete</div>
          <div class="pricing-tier">Clinical insight</div>
          <div class="pricing-price">£349 / £399</div>
          <div class="pricing-price-note">One-off. DUTCH Complete £349 or DUTCH Plus £399</div>
          <div class="pricing-hr"></div>
          <div class="pricing-features">
            <div class="pricing-feature">At-home DUTCH Hormone Test</div>
            <div class="pricing-feature">Cortisol mapping</div>
            <div class="pricing-feature">GP results review</div>
            <div class="pricing-feature">NHS-ready summary</div>
            <div class="pricing-feature">A year of Ormi Circle</div>
          </div>
        </div>

      </div>
      <p class="pricing-footnote">Ormi highlights patterns to discuss with a clinician. It does not diagnose.</p>
    </div>
    </div>
  </section>

  <!-- ── About ── -->
  <section id="about" style="background:var(--obsidian2);">
    <div class="container">
      <p class="eyebrow">About</p>
      <h2 class="section-title">Meet the <em>founders.</em></h2>
      <div class="founders-grid">
        <div class="founder-card reveal">
          <img class="founder-photo" src="/founders/anna-koutras.jpg" alt="Anna Koutras" width="150" height="190" loading="lazy" />
          <h3 class="founder-name">Anna Koutras</h3>
          <p class="founder-role">Co-founder</p>
          <p class="founder-bio">Anna spent over 13 years making complicated things clear for companies including Revolut, The Body Shop and Unilever. Ormi began when she and her friends started talking about perimenopause, and nobody could find straight answers.</p>
        </div>
        <div class="founder-card reveal">
          <img class="founder-photo" src="/founders/emma-whitehouse.jpg" alt="Dr Emma Whitehouse" width="150" height="190" loading="lazy" />
          <h3 class="founder-name">Dr Emma Whitehouse</h3>
          <p class="founder-role">Co-founder</p>
          <p class="founder-bio">Emma trained at Somerville College, Oxford and Guy's, King's and St Thomas' Medical School. She has been a GP for 14 years across the NHS and private practice, with postgraduate training in menopause care and functional medicine. She sees women in clinic who know something has changed and can't yet put a name to it, and she leads Ormi's clinical thinking.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── FAQs ── -->
  <section id="faqs">
    <div class="container">
      <div class="faq-grid">
        <div>
          <p class="eyebrow">FAQs</p>
          <h2 class="section-title">Is Ormi <em>right for you?</em></h2>
          <p class="section-sub">Straight answers to the questions we hear most. If yours isn't here, email <a href="mailto:hello@ormi.health" style="color:var(--gold-text);">hello@ormi.health</a>.</p>
        </div>
        <div class="faq-list">
          <details class="faq-item">
            <summary>Is Ormi right for me?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">Ormi is for you if you don't feel like yourself lately and want to understand why, in plain words. It starts with how you feel, then connects that to your hormones, your wearable and your daily life. If what you need is a diagnosis or a prescription, that is a conversation for your GP. Ormi can help you prepare for it.</p>
          </details>
          <details class="faq-item">
            <summary>I'm not in perimenopause yet. Is it still for me?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">Yes. Ormi is built for every moment of hormonal change. We're focused on perimenopause first, but it is relevant to you whatever stage you're in, including a regular cycle, postpartum and menopause.</p>
          </details>
          <details class="faq-item">
            <summary>Does Ormi diagnose perimenopause?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">No. Ormi highlights patterns to discuss with a clinician. It does not diagnose, and it does not replace your GP.</p>
          </details>
          <details class="faq-item">
            <summary>Do I need to take the DUTCH test?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">No. Ormi starts with a free hormone portrait and daily check-ins. The DUTCH test is optional, for when you want a deeper look. See <a href="#tests">how the tests compare</a>.</p>
          </details>
          <details class="faq-item">
            <summary>How much does it cost?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">Ormi has a free version: your hormone portrait, daily check-ins and core tools. Ormi Circle is £14.99 a month or £129 a year. Clinical insight, which includes the DUTCH test, a GP results review and a year of Ormi Circle, is a one-off £349 or £399.</p>
          </details>
          <details class="faq-item">
            <summary>Can I download Ormi now?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">Not yet. Ormi isn't on the App Store yet. Join the waitlist and we'll let you know as soon as it's ready.</p>
          </details>
          <details class="faq-item">
            <summary>Who is behind Ormi?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">Ormi was founded by Anna Koutras and Dr Emma Whitehouse, an NHS GP. You can <a href="#about">meet the founders</a> further up this page.</p>
          </details>
          <details class="faq-item">
            <summary>What happens to my data?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">We never sell your data. Our <a href="/privacy">privacy notice</a> explains what we collect and why.</p>
          </details>
          <details class="faq-item">
            <summary>I'm an employer. Can Ormi support my team?<span class="faq-plus" aria-hidden="true"></span></summary>
            <p class="faq-answer">Yes. We offer flexible packages for organisations. Email <a href="mailto:hello@ormi.health?subject=Ormi%20for%20employers">hello@ormi.health</a> or see the <a href="#employers">employer section</a>.</p>
          </details>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Final CTA ── -->
  <section class="final-cta" id="final-waitlist">
    <div class="final-bg"></div>
    <div class="container final-content">
      <div class="sunrise evening" aria-hidden="true">
          <div class="sunrise-glow"></div>
          <div class="sun-clip"><div class="sun-float"><div class="sun-disc"></div></div></div>
          <div class="sun-horizon"></div>
          <div class="sun-bars">
            <div class="sun-bar" style="--d:4.5s; --delay:0s; --o:0.5;"></div>
            <div class="sun-bar" style="--d:5.2s; --delay:0.5s; --o:0.32;"></div>
            <div class="sun-bar" style="--d:5.9s; --delay:1s; --o:0.2;"></div>
          </div>
        </div>
      <h2 class="final-headline">
        You know yourself best.<br /><em>Ormi helps you see the pattern.</em>
      </h2>
      <p class="final-sub">
        Ormi isn't on the App Store yet. Join the waitlist to register your interest and be the first to know when Ormi launches.
      </p>
      <form class="final-form" onsubmit="handleSubmit(event,'final-ok')">
        <input type="email" placeholder="Your email address" required autocomplete="email" />
        <button type="submit" class="btn-gold">Join the waitlist</button>
      </form>
      <div id="final-ok" class="success-msg" style="display:none!important; margin:20px auto 0;">You're on the list. We'll be in touch soon.</div>
      <p style="margin-top:14px; font-size:13px; color:var(--white30); font-style:italic;">No spam. Ever.</p>
    </div>
  </section>

  <!-- ── Footer ── -->
  <footer>
    <div class="container">
      <div class="footer-inner">
        <a href="#" class="footer-logo">
          <svg width="16" height="26" viewBox="0 0 52 82" fill="none">
            <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#F5E6C8" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="26" cy="52" r="11" stroke="#D9AE5C" stroke-width="1.9" fill="none"/>
            <circle cx="26" cy="52" r="4.5" stroke="#D9AE5C" stroke-width="1.7" fill="none"/>
          </svg>
          <div class="footer-divider"></div>
          <span class="footer-wordmark">ormi</span>
        </a>
        <p class="footer-note">© 2026 Ormi Wellness Ltd. All rights reserved. Ormi is not a medical service.<br />Registered in England and Wales, company number 17209350. Registered office: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ.</p>
        <div class="footer-links">
          <a href="mailto:hello@ormi.health">hello@ormi.health</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
    </div>
  </footer>
`;

export default function Home() {
  useEffect(() => {
    // ── Banner helpers ────────────────────────────────────────────────────────
    window.dismissBanner = function dismissBanner() {
      const banner = document.getElementById('ormi-banner');
      const overlay = document.getElementById('ormi-banner-overlay');
      if (!banner) return;
      banner.classList.remove('banner-visible');
      banner.classList.add('banner-hiding');
      overlay.classList.remove('visible');
      setTimeout(() => {
        banner.classList.remove('banner-hiding');
        banner.style.display = 'none';
      }, 260);
    };

    function showBanner() {
      const banner = document.getElementById('ormi-banner');
      const overlay = document.getElementById('ormi-banner-overlay');
      if (!banner) return;
      overlay.classList.add('visible');
      banner.style.display = '';
      banner.classList.remove('banner-hiding');
      banner.classList.add('banner-visible');
    }

    // ── Form handler ──────────────────────────────────────────────────────────
    window.handleSubmit = async function handleSubmit(e, okId) {
      e.preventDefault();
      const form = e.target;
      const email = form.querySelector('input[type="email"]').value;

      const button = form.querySelector('button[type="submit"]');
      let errorEl = form.parentElement.querySelector('.form-error');
      const showError = () => {
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-error';
          errorEl.setAttribute('role', 'alert');
          form.insertAdjacentElement('afterend', errorEl);
        }
        errorEl.textContent = "Something went wrong, so you're not on the list yet. Please try again, or email hello@ormi.health.";
      };

      if (button) button.disabled = true;
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          if (errorEl) errorEl.remove();
          form.reset();
          showBanner();
        } else {
          showError();
        }
      } catch (err) {
        showError();
      } finally {
        if (button) button.disabled = false;
      }
    };

    // ── Always up to date: the week fills in and the plan changes with each check-in ──
    const livingStates = [
      { word: 'Wired', hue: '#E08A5E', lvl: 0.12, plan: ['A nervous system tool', 'One slow breath', 'Wind-down for sleep'] },
      { word: 'Foggy', hue: '#D9AE5C', lvl: 0.55, plan: ['A CBT-based tool', 'A food tip for today', 'Wind-down for sleep'] },
      { word: "Can't sleep", hue: '#E6CC94', lvl: 0.7, plan: ['Wind-down for sleep', 'A nervous system tool', 'A food tip for today'] },
      { word: 'Low mood', hue: '#C8674A', lvl: 0.62, plan: ['A CBT-based tool', 'One slow breath', 'A food tip for today'] },
      { word: 'Overwhelmed', hue: '#F2A57E', lvl: 0.3, plan: ['One slow breath', 'A CBT-based tool', 'Wind-down for sleep'] },
    ];
    const livingCard = document.getElementById('living-card');
    let livingTimer = null;
    let livingStep = 0;
    const paintLiving = (step, animate) => {
      if (!livingCard) return;
      const dayEls = livingCard.querySelectorAll('.day');
      dayEls.forEach((el, i) => {
        const sun = el.querySelector('.day-sun');
        el.classList.toggle('is-past', i < step);
        el.classList.toggle('is-today', i === step);
        el.classList.toggle('is-future', i > step);
        if (i <= step) {
          sun.style.setProperty('--hue', livingStates[i].hue);
          sun.style.setProperty('--lvl', livingStates[i].lvl);
        }
      });
      const state = livingStates[step];
      document.getElementById('said-word').textContent = state.word;
      document.querySelectorAll('#plan-list li').forEach((li, i) => { li.textContent = state.plan[i]; });
      if (animate) {
        livingCard.classList.remove('is-swapping');
        void livingCard.offsetWidth;
        livingCard.classList.add('is-swapping');
      }
    };
    paintLiving(0, false);
    if (livingCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      livingTimer = setInterval(() => {
        livingStep = (livingStep + 1) % livingStates.length;
        paintLiving(livingStep, true);
      }, 3600);
    }

    // ── One slow breath: in for four, out for six, three rounds ───────────────
    let breathTimers = [];
    let breathRunning = false;
    window.startBreath = function startBreath() {
      const wrap = document.getElementById('orb-wrap');
      const orb = document.getElementById('orb');
      const count = document.getElementById('orb-count');
      const label = document.getElementById('orb-label');
      const btn = document.getElementById('breath-btn');
      if (!wrap || !orb) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const later = (fn, ms) => breathTimers.push(setTimeout(fn, ms));
      const rest = (text, buttonText) => {
        breathTimers.forEach(clearTimeout);
        breathTimers = [];
        breathRunning = false;
        wrap.classList.remove('is-active');
        orb.style.transitionDuration = '900ms, 700ms';
        orb.style.transform = 'scale(1)';
        orb.style.backgroundColor = '';
        count.textContent = '';
        label.textContent = text;
        btn.textContent = buttonText;
      };
      if (breathRunning) { rest('Ready when you are', 'Start'); return; }
      breathRunning = true;
      btn.textContent = 'Stop';
      wrap.classList.add('is-active');
      const phase = (text, seconds, scale, colour, startAt) => {
        later(() => {
          orb.style.transitionDuration = seconds * 1000 + 'ms, 700ms';
          if (!reduce) orb.style.transform = 'scale(' + scale + ')';
          orb.style.backgroundColor = colour;
          label.textContent = text;
        }, startAt);
        for (let n = 1; n <= seconds; n++) later(() => { count.textContent = n; }, startAt + (n - 1) * 1000);
      };
      const rounds = 3;
      for (let r = 0; r < rounds; r++) {
        phase('Breathe in', 4, 1.3, '#E6CC94', r * 10000);
        phase('Breathe out', 6, 0.82, '#F2A57E', r * 10000 + 4000);
      }
      later(() => rest('Nicely done', 'Go again'), rounds * 10000);
    };

    // ── Smooth scroll ─────────────────────────────────────────────────────────
    document.querySelectorAll('a[href="#waitlist"], a[href="#final-waitlist"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            const inp = target.querySelector('input[type="email"]');
            if (inp) inp.focus();
          }, 700);
        }
      });
    });

    // ── Scroll reveal ─────────────────────────────────────────────────────────
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    return () => { obs.disconnect(); breathTimers.forEach(clearTimeout); if (livingTimer) clearInterval(livingTimer); };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ormi: Everything you've been feeling finally makes sense.</title>
        <meta name="description" content="Ormi is a hormone intelligence app for women in perimenopause and beyond. It puts your mental health first, then helps you connect the dots. Join the waitlist." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/fonts.css" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
    </>
  );
}
