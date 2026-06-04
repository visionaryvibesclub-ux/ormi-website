import Head from 'next/head';
import { useEffect } from 'react';

const css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --obsidian:    #0E0E18;
      --obsidian2:   #13131E;
      --champagne:   #F5EDD6;
      --gold:        #C9A84C;
      --gold-dim:    rgba(201,168,76,0.12);
      --gold-border: rgba(201,168,76,0.22);
      --gold-text:   rgba(201,168,76,0.85);
      --sky:         #4A8FA8;
      --sky-dim:     rgba(74,143,168,0.10);
      --sky-border:  rgba(74,143,168,0.22);
      --sky-text:    rgba(74,143,168,0.85);
      --rose:        #B06A8A;
      --rose-dim:    rgba(176,106,138,0.10);
      --rose-border: rgba(176,106,138,0.22);
      --white15:     rgba(245,237,214,0.15);
      --white30:     rgba(245,237,214,0.30);
      --white50:     rgba(245,237,214,0.50);
      --white70:     rgba(245,237,214,0.70);
      --white90:     rgba(245,237,214,0.90);
      --card:        rgba(255,255,255,0.04);
      --card-border: rgba(255,255,255,0.08);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--obsidian);
      color: var(--champagne);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.7;
      overflow-x: hidden;
    }

    .serif { font-family: 'Cormorant Garamond', serif; font-weight: 300; }

    /* ── Layout ── */
    .container { max-width: 920px; margin: 0 auto; padding: 0 28px; }
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
      background: rgba(14,14,24,0.88);
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
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 300;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--champagne);
      line-height: 1;
    }

    .nav-divider {
      width: 1px;
      height: 1.3em;
      background: var(--gold);
      opacity: 0.45;
    }

    .nav-cta {
      font-size: 11px;
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

    .nav-cta:hover { background: rgba(201,168,76,0.20); }

    /* ── Hero ── */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 80px;
      position: relative;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 90% 65% at 75% 25%, rgba(201,168,76,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 60% 55% at 15% 75%, rgba(74,143,168,0.06) 0%, transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(176,106,138,0.04) 0%, transparent 60%);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 700px;
    }

    .hero-eyebrow {
      font-size: 10px;
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
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(44px, 7.5vw, 76px);
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
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(18px, 3vw, 26px);
      font-weight: 300;
      font-style: italic;
      color: var(--white50);
      margin-bottom: 36px;
      line-height: 1.4;
    }

    .hero-sub {
      font-size: 16px;
      color: var(--white50);
      line-height: 1.75;
      max-width: 540px;
      margin-bottom: 48px;
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
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: var(--champagne);
      outline: none;
      transition: border-color 0.2s;
    }

    .waitlist-form input::placeholder,
    .final-form input::placeholder { color: var(--white30); }

    .waitlist-form input:focus,
    .final-form input:focus { border-color: var(--gold-border); }

    .btn-gold {
      background: var(--gold);
      color: var(--obsidian);
      border: none;
      border-radius: 40px;
      padding: 14px 28px;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
      white-space: nowrap;
    }

    .btn-gold:hover { opacity: 0.87; }
    .btn-gold:active { transform: scale(0.98); }

    .form-note {
      margin-top: 12px;
      font-size: 11px;
      color: var(--white30);
      font-style: italic;
    }

    .success-msg {
      display: none;
      padding: 16px 22px;
      background: var(--sky-dim);
      border: 1px solid var(--sky-border);
      border-radius: 14px;
      font-size: 14px;
      color: var(--sky-text);
      max-width: 500px;
    }

    /* ── Section headers ── */
    .eyebrow {
      font-size: 10px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--gold-text);
      text-align: center;
      margin-bottom: 18px;
    }

    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(34px, 5.5vw, 56px);
      font-weight: 300;
      color: var(--champagne);
      text-align: center;
      line-height: 1.15;
      margin-bottom: 18px;
    }

    .section-sub {
      font-size: 16px;
      color: var(--white50);
      text-align: center;
      max-width: 560px;
      margin: 0 auto 60px;
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
      font-family: 'Cormorant Garamond', serif;
      font-size: 52px;
      color: var(--gold);
      font-weight: 300;
      line-height: 1;
      margin-bottom: 8px;
    }

    .val-label {
      font-size: 12px;
      color: var(--white50);
      line-height: 1.6;
      font-weight: 300;
      max-width: 180px;
      margin: 0 auto;
    }

    .val-source {
      font-size: 10px;
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

    .feeling-card:hover { border-color: rgba(201,168,76,0.18); }

    .feeling-card::before {
      content: '"';
      font-family: 'Cormorant Garamond', serif;
      font-size: 80px;
      color: var(--gold);
      opacity: 0.08;
      position: absolute;
      top: -10px;
      left: 14px;
      line-height: 1;
    }

    .feeling-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px;
      font-style: italic;
      color: var(--white70);
      line-height: 1.55;
      font-weight: 300;
      position: relative;
      z-index: 1;
      margin-bottom: 14px;
    }

    .feeling-reframe {
      font-size: 12px;
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
      font-family: 'Cormorant Garamond', serif;
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
      font-size: 15px;
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
      font-size: 13px;
      color: var(--white90);
      font-weight: 400;
      margin-bottom: 2px;
    }

    .hormone-what {
      font-size: 12px;
      color: var(--white50);
      line-height: 1.5;
      font-weight: 300;
    }

    /* ── Mental health section ── */
    .mental-quote {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(22px, 4vw, 38px);
      font-style: italic;
      font-weight: 300;
      color: var(--champagne);
      text-align: center;
      line-height: 1.5;
      max-width: 700px;
      margin: 0 auto 48px;
    }

    .mental-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .mental-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 26px 24px;
      transition: border-color 0.2s;
    }

    .mental-card:hover { border-color: rgba(176,106,138,0.22); }

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
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      color: var(--champagne);
      margin-bottom: 8px;
      font-weight: 400;
    }

    .mental-body {
      font-size: 13px;
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
      font-family: 'Cormorant Garamond', serif;
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
      font-family: 'Cormorant Garamond', serif;
      font-size: 21px;
      color: var(--champagne);
      margin-bottom: 10px;
      font-weight: 400;
      position: relative;
    }

    .step-body {
      font-size: 13px;
      color: var(--white50);
      line-height: 1.7;
      font-weight: 300;
    }

    .step-tag {
      display: inline-block;
      font-size: 9px;
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
      background: rgba(201,168,76,0.03);
    }

    .stage-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      margin-bottom: 14px;
    }

    .stage-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      color: var(--champagne);
      margin-bottom: 8px;
      font-weight: 400;
    }

    .stage-body {
      font-size: 12px;
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
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(26px, 4vw, 40px);
      color: var(--champagne);
      font-weight: 300;
      line-height: 1.2;
      margin-bottom: 16px;
    }

    .dutch-title em { font-style: italic; color: var(--gold); }

    .dutch-body {
      font-size: 14px;
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
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--sky-text);
      margin-bottom: 8px;
      font-weight: 500;
    }

    .dutch-clinic-text {
      font-size: 13px;
      color: var(--white60, rgba(245,237,214,0.60));
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
      font-size: 13px;
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

    .pricing-card:hover { border-color: rgba(201,168,76,0.18); }

    .pricing-card.featured {
      border-color: var(--gold-border);
      background: rgba(201,168,76,0.04);
    }

    .pricing-badge {
      position: absolute;
      top: -13px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 9px;
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
      font-size: 10px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold-text);
      margin-bottom: 12px;
      font-weight: 500;
    }

    .pricing-price {
      font-family: 'Cormorant Garamond', serif;
      font-size: 42px;
      color: var(--champagne);
      font-weight: 300;
      line-height: 1;
      margin-bottom: 4px;
    }

    .pricing-price-note {
      font-size: 12px;
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
      font-size: 13px;
      color: var(--white50);
      font-weight: 300;
      line-height: 1.5;
    }

    .pricing-feature::before {
      content: '✓';
      color: var(--gold);
      flex-shrink: 0;
      font-size: 11px;
      margin-top: 2px;
    }

    .pricing-clinic-note {
      font-size: 11px;
      color: var(--white30);
      font-style: italic;
      line-height: 1.6;
      padding-top: 14px;
      border-top: 1px solid var(--card-border);
    }

    .pricing-tbc {
      font-size: 11px;
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
      background: radial-gradient(ellipse 75% 65% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 65%);
    }

    .final-content { position: relative; z-index: 2; }

    .final-headline {
      font-family: 'Cormorant Garamond', serif;
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
      font-size: 16px;
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
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px;
      font-weight: 300;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--champagne);
    }

    .footer-divider {
      width: 1px;
      height: 1.2em;
      background: var(--gold);
      opacity: 0.35;
    }

    .footer-note {
      font-size: 11px;
      color: var(--white30);
      font-weight: 300;
    }

    .footer-links { display: flex; gap: 22px; }

    .footer-links a {
      font-size: 12px;
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
      background: rgba(14,14,24,0.75);
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
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 13px;
      font-weight: 300;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #1A1A2E;
      opacity: 0.5;
    }
    .banner-dismiss {
      color: rgba(26,26,46,0.35);
      font-size: 22px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      line-height: 1;
      flex-shrink: 0;
    }
    .banner-dismiss:hover { color: rgba(26,26,46,0.6); }
    .banner-heading {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 28px;
      font-weight: 300;
      color: #1A1A2E;
      line-height: 1.3;
      margin: 0;
    }
    .banner-body {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 300;
      color: rgba(26,26,46,0.7);
      line-height: 1.75;
      margin: 0;
    }
    .banner-closing {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 16px;
      font-style: italic;
      color: #C9973A;
      line-height: 1.6;
      margin: 0;
      padding-top: 8px;
      border-top: 1px solid rgba(201,151,58,0.25);
      width: 100%;
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
          <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#4A8FA8" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
          <circle cx="26" cy="52" r="11" stroke="#C9973A" stroke-width="1.9" fill="none"/>
          <circle cx="26" cy="52" r="4.5" stroke="#C9973A" stroke-width="1.7" fill="none"/>
          <path d="M 26 74 C 26 78, 32 83, 37 80 C 42 77, 42 70, 37 68 C 33 66, 28 70, 30 75" stroke="#4A8FA8" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45"/>
        </svg>
        <span class="banner-wordmark">Ormi</span>
      </div>
      <button class="banner-dismiss" onclick="dismissBanner()" aria-label="Dismiss">&times;</button>
    </div>
    <h2 class="banner-heading">You're not too sensitive.<br>You're not imagining it.<br>You're not alone.</h2>
    <p class="banner-body">You just did something most women never get to do. You asked for the full picture.<br><br>Ormi is built for women who've been dismissed, confused, or told it was just stress. This is the start of something that actually makes sense. And the right information is coming.</p>
    <p class="banner-closing">Your hormones have been talking. Ormi is how you finally hear them.</p>
  </div>

  <!-- ── Nav ── -->
  <nav>
    <a href="#" class="nav-logo">
      <!-- Ormi mark SVG — teardrop, two gold rings -->
      <svg width="22" height="35" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#4A8FA8" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
        <circle cx="26" cy="52" r="11" stroke="#C9A84C" stroke-width="1.9" fill="none"/>
        <circle cx="26" cy="52" r="4.5" stroke="#C9A84C" stroke-width="1.7" fill="none"/>
        <path d="M 26 74 C 26 78, 32 83, 37 80 C 42 77, 42 70, 37 68 C 33 66, 28 70, 30 75" stroke="#4A8FA8" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45"/>
      </svg>
      <div class="nav-divider"></div>
      <span class="nav-wordmark">Ormi</span>
    </a>
    <a href="#waitlist" class="nav-cta">Join the waitlist</a>
  </nav>

  <!-- ── Hero ── -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="container">
      <div class="hero-content">
        <p class="hero-eyebrow">Women's hormonal health</p>
        <h1 class="hero-headline">
          Everything you've<br />been feeling<br /><em>finally makes sense.</em>
        </h1>
        <p class="hero-headline-sub">You're not imagining it. You're not too sensitive. You're not depressed for no reason.</p>
        <p class="hero-sub">
          Your hormones have been trying to tell you something for years and nobody's been listening. <strong>Ormi is the first platform that actually explains what's going on.</strong> Clinical hormone testing, AI that knows you specifically, and daily tools that work with your body, not against it.
        </p>
        <div id="waitlist">
          <form class="waitlist-form" onsubmit="handleSubmit(event,'hero-ok')">
            <input type="email" placeholder="Your email address" required autocomplete="email" />
            <button type="submit" class="btn-gold">Join the waitlist</button>
          </form>
          <div id="hero-ok" class="success-msg" style="display:none!important;">You're on the list. We'll be in touch soon.</div>
          <p class="form-note">No spam. Ever. Just Ormi when it's ready.</p>
        </div>
      </div>
    </div>
  </section>

  <!--
    Stat sources:
    "1 in 10" — Censuswide study cited in ACM CHI 2024 conference paper
    (dl.acm.org/doi/10.1145/3613904.3642694), corroborated by Dr Louise Newson
    survey of 5,187 women (balance-menopause.com, 2022).
    "35 markers" — Precision Analytical DUTCH Complete panel specification.
    "£800+" — UK private clinic pricing 2025: DUTCH test approx £285 plus
    specialist hormone consultation £200-500+. Conservative combined estimate.
  -->
  <div class="validation">
    <div class="container">
      <div class="validation-inner">
        <div class="val-item">
          <div class="val-stat">1 in 10</div>
          <div class="val-label">women visits more than 9 doctors before getting a perimenopause diagnosis</div>
          <div class="val-source">Censuswide study, 2024</div>
        </div>
        <div class="val-item">
          <div class="val-stat">35</div>
          <div class="val-label">hormone markers Ormi measures, vs the 2 or 3 on a standard NHS blood test</div>
          <div class="val-source">Precision Analytical DUTCH Complete</div>
        </div>
        <div class="val-item">
          <div class="val-stat">£800+</div>
          <div class="val-label">what a private hormone clinic charges for testing and a specialist consultation</div>
          <div class="val-source">UK private clinic pricing, 2025</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Feelings section ── -->
  <section>
    <div class="container">
      <p class="eyebrow">Sound familiar?</p>
      <h2 class="section-title">You've been told it's in your head.<br /><em>It's not.</em></h2>
      <p class="section-sub">These aren't personality traits. They're hormone signals. And once you understand what they're saying, everything changes.</p>

      <div class="feelings-grid">
        <div class="feeling-card reveal">
          <p class="feeling-text">"I feel anxious all the time and I don't know why. It starts about a week before my period and I can't control it."</p>
          <p class="feeling-reframe">Progesterone crash in your luteal phase. Measurable, explainable, fixable</p>
        </div>
        <div class="feeling-card reveal">
          <p class="feeling-text">"I wake up at 3am every night with my heart racing. I feel exhausted but I can't sleep."</p>
          <p class="feeling-reframe">Cortisol spiking at the wrong time. Your DUTCH test would show exactly when</p>
        </div>
        <div class="feeling-card reveal">
          <p class="feeling-text">"I feel like I'm going mad. My GP said my bloods are normal but something is clearly not right."</p>
          <p class="feeling-reframe">Standard blood tests miss 32 of the 35 markers that explain what's actually happening</p>
        </div>
        <div class="feeling-card reveal">
          <p class="feeling-text">"I snap at my kids and then cry about it. I don't recognise myself anymore. Is this just who I am now?"</p>
          <p class="feeling-reframe">The oestrogen-serotonin connection. Your mood literally runs on your hormones</p>
        </div>
        <div class="feeling-card reveal">
          <p class="feeling-text">"I'm so tired all the time. Not just sleepy. Bone-deep exhausted. Coffee doesn't even touch it."</p>
          <p class="feeling-reframe">Cortisol, DHEA, and thyroid markers working together. Often missed individually</p>
        </div>
        <div class="feeling-card reveal">
          <p class="feeling-text">"My brain just isn't working. I forget words. I lose my train of thought. I'm 42, not 82."</p>
          <p class="feeling-reframe">Oestrogen and progesterone directly protect cognitive function. This is real and it's documented</p>
        </div>
      </div>
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
            Every hormone in your body exists for a reason. When something feels off: the anxiety, the exhaustion, the rage, the fog. That's not a flaw in you. That's a signal from a system trying to get your attention.
          </p>
          <p class="messenger-body">
            The problem isn't your hormones. It's that nobody's ever taught you how to read what they're saying. Ormi changes that. From the root cause. The actual chemical signals driving how you feel, to the tools that help your body rebalance. Not manage. <em style="color:var(--champagne);">Rebalance.</em>
          </p>
        </div>
        <div class="messenger-hormones">
          <div class="hormone-row reveal">
            <div class="hormone-dot" style="background:#C97A9A;"></div>
            <div>
              <div class="hormone-name">Oestrogen</div>
              <div class="hormone-what">Runs your mood, memory, skin, and bone density. Also controls how much serotonin your brain makes. When it lurches, you lurch with it.</div>
            </div>
          </div>
          <div class="hormone-row reveal">
            <div class="hormone-dot" style="background:#4A9A80;"></div>
            <div>
              <div class="hormone-name">Progesterone</div>
              <div class="hormone-what">Your calm hormone. When it drops (usually in the second half of your cycle): anxiety, poor sleep, and irritability follow. It's not stress. It's chemistry.</div>
            </div>
          </div>
          <div class="hormone-row reveal">
            <div class="hormone-dot" style="background:#C9A84C;"></div>
            <div>
              <div class="hormone-name">Cortisol</div>
              <div class="hormone-what">Your stress hormone, but also your energy, inflammation, and immune system. A flat diurnal curve explains the afternoon crash that no amount of sleep seems to fix.</div>
            </div>
          </div>
          <div class="hormone-row reveal">
            <div class="hormone-dot" style="background:#7A6AAA;"></div>
            <div>
              <div class="hormone-name">DHEA, testosterone, melatonin + more</div>
              <div class="hormone-what">The ones your GP has never tested. Between them they explain your drive, your sleep quality, your resilience, and why everything feels harder than it should.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Mental health section ── -->
  <section>
    <div class="container">
      <p class="eyebrow">Hormones &amp; mental health</p>
      <blockquote class="mental-quote">
        "The anxiety, the rage, the flat grey feeling, the not recognising yourself. These aren't a mental health crisis. They're a hormone crisis. And they're treatable at the root."
      </blockquote>
      <div class="mental-grid">
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--rose-dim); border:1px solid var(--rose-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C8 2 3 5.5 3 9C3 11.5 5.2 13.5 8 13.5C10.8 13.5 13 11.5 13 9C13 5.5 8 2 8 2Z" stroke="#B06A8A" stroke-width="1.2"/><circle cx="8" cy="9" r="2" stroke="#B06A8A" stroke-width="1.2"/></svg>
          </div>
          <h3 class="mental-title">Anxiety &amp; low mood</h3>
          <p class="mental-body">Oestrogen drives serotonin production. Progesterone drives GABA, your brain's natural calm signal. When both drop, anxiety and low mood follow. This is biochemistry, not weakness.</p>
        </div>
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--gold-dim); border:1px solid var(--gold-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="#C9A84C" stroke-width="1.2"/><path d="M8 5v3l2 2" stroke="#C9A84C" stroke-width="1.2" stroke-linecap="round"/></svg>
          </div>
          <h3 class="mental-title">Rage &amp; the guilt cycle</h3>
          <p class="mental-body">The disproportionate anger, the instant regret, the shame spiral. This is the oestrogen-progesterone imbalance in your luteal phase. It's not who you are. It's a signal that something needs attention.</p>
        </div>
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--sky-dim); border:1px solid var(--sky-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h3l2-4 2 8 2-4 2 2h1" stroke="#4A8FA8" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h3 class="mental-title">Brain fog &amp; identity</h3>
          <p class="mental-body">Forgetting words. Losing your train of thought. Not feeling like yourself. Oestrogen and progesterone both have receptors throughout the brain. When they shift, so does cognition. This is documented, real, and reversible.</p>
        </div>
        <div class="mental-card reveal">
          <div class="mental-icon" style="background:var(--rose-dim); border:1px solid var(--rose-border);">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8C4 5.8 5.8 4 8 4C10.2 4 12 5.8 12 8" stroke="#B06A8A" stroke-width="1.2" stroke-linecap="round"/><path d="M8 12V8" stroke="#B06A8A" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="13" r="1" fill="#B06A8A"/></svg>
          </div>
          <h3 class="mental-title">The gut-mood connection</h3>
          <p class="mental-body">Around 90% of your serotonin is made in your gut. The bacteria that line your gut wall (the estrobolome) directly regulate how oestrogen is metabolised. What you eat is a hormonal intervention.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── How it works ── -->
  <section style="background:var(--obsidian2);">
    <div class="container">
      <p class="eyebrow">How it works</p>
      <h2 class="section-title">From root cause<br /><em>to daily action.</em></h2>
      <p class="section-sub">Ormi isn't a tracker. It's not a chatbot. It's a complete picture of what's happening, and a daily companion that helps you do something about it.</p>

      <div class="steps-grid">
        <div class="step reveal">
          <div class="step-num">1</div>
          <div class="step-tag">Free</div>
          <h3 class="step-title">Your hormone portrait</h3>
          <p class="step-body">A 15-minute 6-domain assessment covers your cycle, mood, sleep, stress, gut, and bone health. Your answers build a picture no blood test has ever shown your GP, plus an AI that knows you specifically.</p>
        </div>
        <div class="step reveal">
          <div class="step-num">2</div>
          <div class="step-tag">DUTCH+</div>
          <h3 class="step-title">The test that actually tells you</h3>
          <p class="step-body">The DUTCH test measures 35 hormone markers from a urine sample at home. The same test private clinics charge hundreds for. Ormi sends it to your door, interprets it with AI, and produces a summary your GP can actually use.</p>
        </div>
        <div class="step reveal">
          <div class="step-num">3</div>
          <div class="step-tag">Daily</div>
          <h3 class="step-title">Tools that work with your body</h3>
          <p class="step-body">Phase-matched breathwork, somatic regulation, nutritional guidance, and journalling, all connected to your specific hormonal picture. Not generic wellness. Tools that respond to where you actually are.</p>
        </div>
        <div class="step reveal">
          <div class="step-num">4</div>
          <div class="step-tag">DUTCH+ &amp; Specialist</div>
          <h3 class="step-title">A specialist who reads your results with you</h3>
          <p class="step-body">A 1:1 results review with a hormone specialist, not a GP who has 8 minutes. Someone who can explain what your DUTCH results mean specifically for you and what to do next.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Life stages ── -->
  <section>
    <div class="container">
      <p class="eyebrow">Wherever you are right now</p>
      <h2 class="section-title">Ormi adapts to <em>her</em> hormonal life.</h2>
      <p class="section-sub">Not a one-size product. Not a tracker built for 25-year-olds. Ormi is built around every stage of a woman's hormonal life.</p>
      <div class="stages-grid">
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#C9A84C;"></div>
          <div class="stage-name">Regular cycle</div>
          <div class="stage-body">Phase-matched tools and content that follow your hormonal rhythm across the month. Not just period tracking. The full picture of what oestrogen, progesterone, and cortisol are doing week by week.</div>
        </div>
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#4A9A80;"></div>
          <div class="stage-name">Postpartum</div>
          <div class="stage-body">After birth, oestrogen and progesterone drop off a cliff. Within 24 hours of delivery, progesterone falls to almost zero. Oestrogen follows. This is the most dramatic hormonal shift a woman can experience and almost nobody explains it. The exhaustion, the anxiety, the low mood, the feeling that something is wrong with you. That's not weakness. That's your endocrine system in freefall. Ormi maps what's happening from mood to thyroid to iron to bone, and what actually helps recovery.</div>
        </div>
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#C97A9A;"></div>
          <div class="stage-name">Perimenopause</div>
          <div class="stage-body">The erratic cycles, the mood shifts, the sleep that's fallen apart, the anxiety that appeared from nowhere. Ormi makes sense of the unpredictability and gives you a plan built around where you actually are.</div>
        </div>
        <div class="stage-card reveal">
          <div class="stage-dot" style="background:#4A8FA8;"></div>
          <div class="stage-name">Menopause</div>
          <div class="stage-body">Beyond the hot flushes. Bone health, cognitive changes, cardiovascular risk, identity. Ormi gives you the full picture with clarity, not alarm.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── DUTCH ── -->
  <section style="background:var(--obsidian2);">
    <div class="container">
      <div class="dutch-wrap">
        <div>
          <p class="eyebrow" style="text-align:left; margin-bottom:14px;">Clinical testing</p>
          <h2 class="dutch-title">Your portrait is a map.<br /><em>DUTCH makes it a GPS.</em></h2>
          <p class="dutch-body">The DUTCH test is the most comprehensive at-home hormone panel available. It's what private functional medicine clinics use. Ormi brings it to your door, with AI interpretation and a GP summary built in.</p>

          <div class="dutch-clinic-compare">
            <div class="dutch-clinic-label">vs a private hormone clinic</div>
            <div class="dutch-clinic-text">
              A private clinic would charge <strong>£600–1,200</strong> for a DUTCH test, interpretation, and a specialist consultation. Ormi brings all three together, <strong>at a fraction of the cost</strong>, from your own home, with AI available 24 hours a day.
            </div>
          </div>

          <a href="#final-waitlist" class="btn-gold" style="display:inline-block; text-decoration:none; font-size:12px;">Join the waitlist</a>
        </div>
        <div class="dutch-markers">
          <p style="font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold-text); margin-bottom:12px; font-weight:500;">What DUTCH measures</p>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>Oestrogen &amp; metabolites</strong>: including the pathways that affect breast cancer risk. Completely invisible on a standard blood test.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>Cortisol diurnal curve</strong>: not just your level, but when it spikes and crashes across the day. The pattern your GP has never seen.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>Progesterone &amp; androgens</strong>: testosterone, DHEA, the hormones nobody's checked and the ones most likely to explain how you're feeling.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>Melatonin &amp; organic acids</strong>: sleep hormones and B vitamin markers that affect mood, energy, and everything in between.</div></div>
          <div class="dutch-marker"><div class="dutch-marker-dot"></div><div class="dutch-marker-text"><strong>35 markers total.</strong> Collected at home. Interpreted by AI. Summarised for your GP. Reviewed with a specialist.</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Pricing ── -->
  <section>
    <div class="container">
      <p class="eyebrow">Pricing</p>
      <h2 class="section-title">Start free.<br /><em>Go deeper when you're ready.</em></h2>
      <p class="section-sub">No subscription needed to get started. Upgrade when Ormi has earned it. Founding member pricing locked in for life.</p>

      <div class="pricing-grid">

        <!-- Free -->
        <div class="pricing-card reveal">
          <div class="pricing-tier">Free</div>
          <div class="pricing-price">£0</div>
          <div class="pricing-price-note">Always free, no card required</div>
          <div class="pricing-hr"></div>
          <div class="pricing-features">
            <div class="pricing-feature">6-domain symptom assessment</div>
            <div class="pricing-feature">Your personal Hormone Portrait</div>
            <div class="pricing-feature">3 AI questions per day</div>
            <div class="pricing-feature">Hormone map &amp; education</div>
            <div class="pricing-feature">In-the-moment regulation tools</div>
            <div class="pricing-feature">Food &amp; gut nutrition tips</div>
            <div class="pricing-feature">Bone health awareness guide</div>
          </div>
        </div>

        <!-- DUTCH+ -->
        <div class="pricing-card featured reveal">
          <div class="pricing-badge">Most complete</div>
          <div class="pricing-tier">DUTCH+</div>
          <div class="pricing-price">TBC</div>
          <div class="pricing-price-note">Founding member pricing coming soon</div>
          <div class="pricing-hr"></div>
          <div class="pricing-features">
            <div class="pricing-feature">Everything in Free</div>
            <div class="pricing-feature">DUTCH test kit dispatched to your door</div>
            <div class="pricing-feature">35-marker AI interpretation</div>
            <div class="pricing-feature">Full DUTCH Hormone Portrait</div>
            <div class="pricing-feature">Personalised supplement protocol</div>
            <div class="pricing-feature">GP Summary document</div>
            <div class="pricing-feature">Unlimited AI questions</div>
            <div class="pricing-feature">Phase-matched tool library</div>
            <div class="pricing-feature">Therapeutic community access</div>
          </div>
          <div class="pricing-clinic-note">Private clinic equivalent: £400–800 for the test and interpretation alone.</div>
          <div class="pricing-tbc">Pricing confirmed at launch for waitlist members first.</div>
        </div>

        <!-- DUTCH+ & Specialist -->
        <div class="pricing-card reveal">
          <div class="pricing-tier">DUTCH+ &amp; Specialist</div>
          <div class="pricing-price">TBC</div>
          <div class="pricing-price-note">Founding member pricing coming soon</div>
          <div class="pricing-hr"></div>
          <div class="pricing-features">
            <div class="pricing-feature">Everything in DUTCH+</div>
            <div class="pricing-feature">1:1 results review with a hormone specialist</div>
            <div class="pricing-feature">Personalised protocol from your specialist</div>
            <div class="pricing-feature">Priority support</div>
            <div class="pricing-feature">Quarterly DUTCH retesting (optional)</div>
          </div>
          <div class="pricing-clinic-note">Private clinic equivalent: £800–1,200 for test, interpretation, and specialist consultation.</div>
          <div class="pricing-tbc">Pricing confirmed at launch for waitlist members first.</div>
        </div>

      </div>
    </div>
  </section>

  <!-- ── Final CTA ── -->
  <section class="final-cta" id="final-waitlist">
    <div class="final-bg"></div>
    <div class="container final-content">
      <h2 class="final-headline">
        You've always known<br />something wasn't right.<br /><em>Now you can find out what.</em>
      </h2>
      <p class="final-sub">
        Join the waitlist. Be the first to know when Ormi launches. Founding members get their pricing locked in for life.
      </p>
      <form class="final-form" onsubmit="handleSubmit(event,'final-ok')">
        <input type="email" placeholder="Your email address" required autocomplete="email" />
        <button type="submit" class="btn-gold">Join the waitlist</button>
      </form>
      <div id="final-ok" class="success-msg" style="display:none!important; margin:20px auto 0;">You're on the list. We'll be in touch soon.</div>
      <p style="margin-top:14px; font-size:11px; color:var(--white30); font-style:italic;">No spam. Ever.</p>
    </div>
  </section>

  <!-- ── Footer ── -->
  <footer>
    <div class="container">
      <div class="footer-inner">
        <a href="#" class="footer-logo">
          <svg width="16" height="26" viewBox="0 0 52 82" fill="none">
            <path d="M 26 2 C 26 2, 3 26, 3 48 C 3 62, 13 74, 26 74 C 39 74, 49 62, 49 48 C 49 26, 26 2, 26 2 Z" stroke="#4A8FA8" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="26" cy="52" r="11" stroke="#C9A84C" stroke-width="1.9" fill="none"/>
            <circle cx="26" cy="52" r="4.5" stroke="#C9A84C" stroke-width="1.7" fill="none"/>
          </svg>
          <div class="footer-divider"></div>
          <span class="footer-wordmark">Ormi</span>
        </a>
        <p class="footer-note">© 2026 Ormi. All rights reserved. Ormi is not a medical service.</p>
        <div class="footer-links">
          <a href="mailto:hello@ormi.health">hello@ormi.health</a>
          <a href="#">Privacy</a>
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

      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          showBanner();
        } else {
          showBanner();
        }
      } catch (err) {
        showBanner();
      }
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

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ormi: Everything you've been feeling finally makes sense.</title>
        <meta name="description" content="You're not imagining it. You're not too sensitive. Your hormones have been trying to tell you something and nobody's been listening. Ormi changes that." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
    </>
  );
}
