const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const QRCode = require('qrcode');

const TARGET_URL = 'https://shadowneural666ai.github.io/ANIVERSARIO/';
const OUTPUT_DIR = path.join(__dirname, 'tarjetas-qr');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function buildCards() {
  console.log('Generating QR codes for:', TARGET_URL);

  // Generate 3 styled QR codes (Level 'H' error correction allows up to 30% restoration)
  const qrRuby = await QRCode.toDataURL(TARGET_URL, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 650,
    color: {
      dark: '#2d0413',
      light: '#ffffff'
    }
  });

  const qrVintage = await QRCode.toDataURL(TARGET_URL, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 650,
    color: {
      dark: '#300813',
      light: '#fffef9'
    }
  });

  const qrCelestial = await QRCode.toDataURL(TARGET_URL, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 650,
    color: {
      dark: '#120208',
      light: '#ffffff'
    }
  });

  // Common Head & Font styles
  const sharedFonts = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Great+Vibes&family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  `;

  // HTML Template Generator for Standalone Card
  function createCardHtml(title, cardClass, extraStyles, cardContent) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  ${sharedFonts}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 900px;
      height: 1350px;
      margin: 0;
      padding: 0;
      background: transparent;
      overflow: hidden;
      font-family: 'Outfit', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .card-standalone-root {
      width: 900px;
      height: 1350px;
      position: relative;
      border-radius: 36px;
      padding: 60px 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.3);
    }

    .card-gold-corners {
      position: absolute;
      inset: 22px;
      pointer-events: none;
    }
    .card-gold-corners::before, .card-gold-corners::after,
    .corner-bottom-left, .corner-bottom-right {
      content: "";
      position: absolute;
      width: 50px;
      height: 50px;
      border: 2px solid #ffd700;
    }
    .card-gold-corners::before { top: 0; left: 0; border-right: none; border-bottom: none; }
    .card-gold-corners::after { top: 0; right: 0; border-left: none; border-bottom: none; }
    .corner-bottom-left { bottom: 0; left: 0; border-right: none; border-top: none; }
    .corner-bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; }

    .card-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 30px;
      background: rgba(58, 6, 26, 0.9);
      border: 1.8px solid #ffd700;
      border-radius: 999px;
      box-shadow: 0 0 25px rgba(255, 215, 0, 0.4), inset 0 0 12px rgba(255, 215, 0, 0.25);
    }
    .card-badge-pill span {
      font-family: 'Cinzel', serif;
      font-size: 1rem;
      font-weight: 700;
      color: #fff9e6;
      letter-spacing: 0.16em;
    }

    .card-header-block {
      text-align: center;
      margin-top: 10px;
    }
    .card-script-eyebrow {
      font-family: 'Great Vibes', cursive;
      font-size: 2.8rem;
      color: #f5d77f;
      line-height: 1;
      text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
    }
    .card-names-title {
      font-family: 'Cinzel', serif;
      font-size: 3.4rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      background: linear-gradient(180deg, #ffffff 0%, #fff4cc 30%, #ffd700 70%, #d4af37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 20px rgba(255, 215, 0, 0.7));
      margin: 4px 0 10px 0;
    }

    .card-intertwined-hearts {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 4px;
    }
    .card-divider-line {
      width: 100px;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, #ffd700, transparent);
    }

    /* QR Code Display Container */
    .qr-frame-wrapper {
      position: relative;
      padding: 16px;
      background: linear-gradient(135deg, #fff2cc 0%, #ffd700 50%, #b8860b 100%);
      border-radius: 28px;
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 215, 0, 0.65);
      margin: 15px 0;
    }
    .qr-frame-inner {
      background: #ffffff;
      padding: 18px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .qr-image {
      width: 380px;
      height: 380px;
      display: block;
      border-radius: 12px;
    }
    .qr-center-heart {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      background: radial-gradient(circle at 35% 35%, #ff4d6d, #b5173f 60%, #500718 100%);
      border: 3px solid #ffd700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 215, 0, 0.8);
      font-size: 1.8rem;
      color: #ffffff;
    }

    .card-instructions {
      text-align: center;
      max-width: 680px;
    }
    .card-instructions .inst-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.55rem;
      font-weight: 600;
      color: #fff8e7;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
    }
    .card-instructions .inst-quote {
      font-family: 'Great Vibes', cursive;
      font-size: 2.1rem;
      color: #ffd700;
      line-height: 1.2;
      text-shadow: 0 0 12px rgba(255, 215, 0, 0.7);
      margin-bottom: 6px;
    }
    .card-instructions .inst-hint {
      font-size: 1.05rem;
      color: #ffb3c6;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
    }

    .card-footer-signoff {
      width: 100%;
      border-top: 1px solid rgba(212, 175, 55, 0.35);
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #e5b366;
      font-size: 0.95rem;
      letter-spacing: 0.08em;
    }
    .card-footer-signoff .footer-sig {
      font-family: 'Great Vibes', cursive;
      font-size: 2.2rem;
      color: #ffffff;
      text-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
    }

    ${extraStyles}
  </style>
</head>
<body>
  <div class="card-standalone-root ${cardClass}">
    ${cardContent}
  </div>
</body>
</html>`;
  }

  // --- CARD 1: RUBY & GOLD ---
  const card1Styles = `
    .card-ruby-gold {
      background: radial-gradient(circle at 50% 12%, #4a0828 0%, #200411 50%, #0a0106 100%);
      border: 4px solid #d4af37;
      outline: 1.5px solid rgba(255, 215, 0, 0.4);
      outline-offset: -16px;
    }
  `;
  const card1Content = `
    <div class="card-gold-corners">
      <span class="corner-bottom-left"></span>
      <span class="corner-bottom-right"></span>
    </div>

    <!-- Pill Badge -->
    <div class="card-badge-pill">
      <span>❤ 07 DE NOVIEMBRE · 3 AÑOS JUNTOS ❤</span>
    </div>

    <!-- Header Typography -->
    <div class="card-header-block">
      <div class="card-script-eyebrow">Nuestro Aniversario</div>
      <h1 class="card-names-title">Estrella &amp; Aron</h1>
      <div class="card-intertwined-hearts">
        <span class="card-divider-line"></span>
        <svg width="48" height="24" viewBox="0 0 48 24">
          <path d="M12 6 C8 0, 0 3, 0 11 C0 17, 12 22, 12 22 C12 22, 24 17, 24 11 C24 3, 16 0, 12 6 Z" fill="none" stroke="#ffd700" stroke-width="1.8" />
          <path d="M26 6 C22 0, 14 3, 14 11 C14 17, 26 22, 26 22 C26 22, 38 17, 38 11 C38 3, 30 0, 26 6 Z" fill="none" stroke="#fff8db" stroke-width="1.8" stroke-dasharray="3 1.5" />
        </svg>
        <span class="card-divider-line"></span>
      </div>
    </div>

    <!-- QR Code Centerpiece -->
    <div class="qr-frame-wrapper">
      <div class="qr-frame-inner">
        <img src="${qrRuby}" alt="Código QR Aniversario Estrella y Aron" class="qr-image" />
        <div class="qr-center-heart">❤</div>
      </div>
    </div>

    <!-- Instructions & Romance Message -->
    <div class="card-instructions">
      <div class="inst-quote">«Cada segundo a tu lado es mi lugar favorito»</div>
      <p class="inst-title">Escanea con la cámara de tu celular</p>
      <p class="inst-hint">✨ Abre tu cámara o app de QR para ver nuestra sorpresa de amor ✨</p>
    </div>

    <!-- Footer Signoff -->
    <div class="card-footer-signoff">
      <span>07 de Noviembre de 2023</span>
      <span class="footer-sig">Con todo mi amor, Aron ♡</span>
      <span>Amor Infinito</span>
    </div>
  `;

  // --- CARD 2: VINTAGE LOVE PARCHMENT ---
  const card2Styles = `
    .card-vintage-parchment {
      background: radial-gradient(circle at 50% 20%, #fffdf8 0%, #fbf3e0 50%, #ebd4a8 100%);
      border: 4px solid #b8860b;
      outline: 2px dashed rgba(184, 134, 11, 0.45);
      outline-offset: -16px;
      color: #3b1b0b;
    }
    .card-vintage-parchment .card-gold-corners::before,
    .card-vintage-parchment .card-gold-corners::after,
    .card-vintage-parchment .corner-bottom-left,
    .card-vintage-parchment .corner-bottom-right {
      border-color: #b8860b;
    }
    .card-vintage-parchment .card-badge-pill {
      background: #460515;
      border-color: #ffd700;
    }
    .card-vintage-parchment .card-script-eyebrow {
      color: #80102a;
      text-shadow: none;
    }
    .card-vintage-parchment .card-names-title {
      background: linear-gradient(180deg, #500718 0%, #750e27 40%, #29030c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 6px rgba(120, 15, 40, 0.25));
    }
    .card-vintage-parchment .card-divider-line {
      background: linear-gradient(90deg, transparent, #80102a, transparent);
    }
    .card-vintage-parchment .card-instructions .inst-title {
      color: #380814;
      text-shadow: none;
    }
    .card-vintage-parchment .card-instructions .inst-quote {
      color: #9f0e2f;
      text-shadow: none;
    }
    .card-vintage-parchment .card-instructions .inst-hint {
      color: #590d22;
    }
    .card-vintage-parchment .card-footer-signoff {
      border-top-color: rgba(184, 134, 11, 0.4);
      color: #633210;
    }
    .card-vintage-parchment .card-footer-signoff .footer-sig {
      color: #500718;
      text-shadow: none;
    }
  `;
  const card2Content = `
    <div class="card-gold-corners">
      <span class="corner-bottom-left"></span>
      <span class="corner-bottom-right"></span>
    </div>

    <!-- Pill Badge -->
    <div class="card-badge-pill">
      <span style="color: #ffd700;">♡ PARA: MI NIÑA ESTRELLA ♡</span>
    </div>

    <!-- Header Typography -->
    <div class="card-header-block">
      <div class="card-script-eyebrow">Carta de Nuestro Amor</div>
      <h1 class="card-names-title">Estrella &amp; Aron</h1>
      <div class="card-intertwined-hearts">
        <span class="card-divider-line"></span>
        <svg width="48" height="24" viewBox="0 0 48 24">
          <path d="M12 6 C8 0, 0 3, 0 11 C0 17, 12 22, 12 22 C12 22, 24 17, 24 11 C24 3, 16 0, 12 6 Z" fill="none" stroke="#80102a" stroke-width="1.8" />
          <path d="M26 6 C22 0, 14 3, 14 11 C14 17, 26 22, 26 22 C26 22, 38 17, 38 11 C38 3, 30 0, 26 6 Z" fill="none" stroke="#b8860b" stroke-width="1.8" stroke-dasharray="3 1.5" />
        </svg>
        <span class="card-divider-line"></span>
      </div>
    </div>

    <!-- QR Code Centerpiece -->
    <div class="qr-frame-wrapper" style="background: linear-gradient(135deg, #d4af37, #8a6d1c);">
      <div class="qr-frame-inner" style="background: #fffef9;">
        <img src="${qrVintage}" alt="Código QR Aniversario Estrella y Aron" class="qr-image" />
        <div class="qr-center-heart" style="background: radial-gradient(circle at 35% 35%, #80102a, #4a0718); border-color: #ffd700;">♡</div>
      </div>
    </div>

    <!-- Instructions & Romance Message -->
    <div class="card-instructions">
      <div class="inst-quote">«Gracias por caminar a mi lado estos 3 años inolvidables»</div>
      <p class="inst-title">Apunta tu celular aquí para abrir la carta</p>
      <p class="inst-hint">📜 Te espera nuestra historia, música y fuegos artificiales 📜</p>
    </div>

    <!-- Footer Signoff -->
    <div class="card-footer-signoff">
      <span>07 de Noviembre de 2023</span>
      <span class="footer-sig">Por muchos años más ♡</span>
      <span>Amor Eterno</span>
    </div>
  `;

  // --- CARD 3: CELESTIAL STARRY NIGHT ---
  const card3Styles = `
    .card-celestial-stars {
      background: radial-gradient(circle at 50% 15%, #2a0845 0%, #150228 45%, #05000d 100%);
      border: 4px solid #f59e0b;
      outline: 1.5px solid rgba(255, 215, 0, 0.5);
      outline-offset: -16px;
    }
    .card-celestial-stars .card-badge-pill {
      background: rgba(35, 6, 60, 0.9);
      border-color: #ffd700;
      box-shadow: 0 0 25px rgba(245, 158, 11, 0.5), inset 0 0 12px rgba(255, 215, 0, 0.3);
    }
    .card-celestial-stars .card-script-eyebrow {
      color: #ffccd5;
      text-shadow: 0 0 15px rgba(255, 100, 140, 0.8);
    }
    .card-celestial-stars .card-names-title {
      background: linear-gradient(180deg, #ffffff 0%, #fed7aa 35%, #fbbf24 70%, #d97706 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 25px rgba(251, 191, 36, 0.8));
    }
    .card-celestial-stars .qr-center-heart {
      background: radial-gradient(circle at 35% 35%, #ffd700, #f59e0b 60%, #b45309 100%);
      border-color: #ffffff;
      color: #4a0410;
    }
  `;
  const card3Content = `
    <div class="card-gold-corners" style="filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.7));">
      <span class="corner-bottom-left" style="border-color: #fbbf24;"></span>
      <span class="corner-bottom-right" style="border-color: #fbbf24;"></span>
    </div>

    <!-- Pill Badge -->
    <div class="card-badge-pill">
      <span>✨ 07 DE NOVIEMBRE · 3 AÑOS INOLVIDABLES ✨</span>
    </div>

    <!-- Header Typography -->
    <div class="card-header-block">
      <div class="card-script-eyebrow">Bajo las Estrellas</div>
      <h1 class="card-names-title">Estrella &amp; Aron</h1>
      <div class="card-intertwined-hearts">
        <span class="card-divider-line" style="background: linear-gradient(90deg, transparent, #fbbf24, transparent);"></span>
        <svg width="48" height="24" viewBox="0 0 48 24">
          <path d="M12 6 C8 0, 0 3, 0 11 C0 17, 12 22, 12 22 C12 22, 24 17, 24 11 C24 3, 16 0, 12 6 Z" fill="none" stroke="#fbbf24" stroke-width="1.8" />
          <path d="M26 6 C22 0, 14 3, 14 11 C14 17, 26 22, 26 22 C26 22, 38 17, 38 11 C38 3, 30 0, 26 6 Z" fill="none" stroke="#fed7aa" stroke-width="1.8" stroke-dasharray="3 1.5" />
        </svg>
        <span class="card-divider-line" style="background: linear-gradient(90deg, transparent, #fbbf24, transparent);"></span>
      </div>
    </div>

    <!-- QR Code Centerpiece -->
    <div class="qr-frame-wrapper" style="background: linear-gradient(135deg, #fed7aa, #fbbf24 50%, #b45309);">
      <div class="qr-frame-inner">
        <img src="${qrCelestial}" alt="Código QR Aniversario Estrella y Aron" class="qr-image" />
        <div class="qr-center-heart">✦</div>
      </div>
    </div>

    <!-- Instructions & Romance Message -->
    <div class="card-instructions">
      <div class="inst-quote">«Que nuestro amor brille más fuerte que cualquier estrella»</div>
      <p class="inst-title">Escanea para encender los fuegos artificiales</p>
      <p class="inst-hint">🎆 Toca el firmamento entero dedicado a ti, mi amor 🎆</p>
    </div>

    <!-- Footer Signoff -->
    <div class="card-footer-signoff" style="border-top-color: rgba(251, 191, 36, 0.35); color: #fed7aa;">
      <span>07 de Noviembre de 2023</span>
      <span class="footer-sig">Para siempre juntos ♡</span>
      <span>Amor Infinito</span>
    </div>
  `;

  // Write the 3 standalone HTML files
  const htmlCard1 = createCardHtml('Tarjeta 1 - Ruby & Gold Romance', 'card-ruby-gold', card1Styles, card1Content);
  const htmlCard2 = createCardHtml('Tarjeta 2 - Vintage Love Parchment', 'card-vintage-parchment', card2Styles, card2Content);
  const htmlCard3 = createCardHtml('Tarjeta 3 - Celestial Starry Night', 'card-celestial-stars', card3Styles, card3Content);

  const file1 = path.join(OUTPUT_DIR, 'tarjeta-1-luxury-ruby-gold.html');
  const file2 = path.join(OUTPUT_DIR, 'tarjeta-2-vintage-love-parchment.html');
  const file3 = path.join(OUTPUT_DIR, 'tarjeta-3-celestial-starry-fireworks.html');

  fs.writeFileSync(file1, htmlCard1, 'utf8');
  fs.writeFileSync(file2, htmlCard2, 'utf8');
  fs.writeFileSync(file3, htmlCard3, 'utf8');

  console.log('Saved standalone card files:');
  console.log(' -', file1);
  console.log(' -', file2);
  console.log(' -', file3);

  // Chrome executable path
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const cards = [
    { html: file1, png: path.join(OUTPUT_DIR, 'tarjeta-1-luxury-ruby-gold.png'), name: 'Tarjeta 1 (Ruby & Gold)' },
    { html: file2, png: path.join(OUTPUT_DIR, 'tarjeta-2-vintage-love-parchment.png'), name: 'Tarjeta 2 (Vintage Parchment)' },
    { html: file3, png: path.join(OUTPUT_DIR, 'tarjeta-3-celestial-starry-fireworks.png'), name: 'Tarjeta 3 (Celestial Starry)' }
  ];

  console.log('\n--- Capturing High-Res PNG Images via Headless Chrome ---');
  for (const card of cards) {
    console.log(`Rendering ${card.name}...`);
    // Convert html path to file URL
    const fileUrl = 'file:///' + card.html.replace(/\\/g, '/');
    const cmd = `"${chromePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=900,1350 --virtual-time-budget=5000 --screenshot="${card.png}" "${fileUrl}"`;
    try {
      execSync(cmd, { stdio: 'inherit' });
      if (fs.existsSync(card.png)) {
        const stats = fs.statSync(card.png);
        console.log(`✓ Generated: ${path.basename(card.png)} (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        console.error(`✗ File not created: ${card.png}`);
      }
    } catch (e) {
      console.error(`Error rendering ${card.name}:`, e.message);
    }
  }

  // Create an interactive index.html in /tarjetas-qr/ so user can view all cards and download PNGs directly
  const galleryHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Colección de Tarjetas de Aniversario con QR · Estrella &amp; Aron</title>
  ${sharedFonts}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 10%, #200412 0%, #0c0106 60%, #030002 100%);
      color: #fff;
      font-family: 'Outfit', sans-serif;
      min-height: 100vh;
      padding: 40px 20px 80px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .gallery-header {
      text-align: center;
      max-width: 900px;
      margin-bottom: 50px;
    }
    .badge {
      display: inline-block;
      padding: 8px 24px;
      background: rgba(225, 29, 72, 0.2);
      border: 1px solid #ffd700;
      border-radius: 999px;
      color: #ffd700;
      font-size: 0.95rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 16px;
    }
    h1 {
      font-family: 'Cinzel', serif;
      font-size: 2.8rem;
      background: linear-gradient(180deg, #ffffff 0%, #ffd700 70%, #d4af37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }
    .subtitle {
      font-family: 'Great Vibes', cursive;
      font-size: 2.4rem;
      color: #ffccd5;
      margin-bottom: 16px;
    }
    .desc {
      color: #f5d77f;
      font-size: 1.1rem;
      line-height: 1.6;
    }
    .link-box {
      margin-top: 18px;
      background: rgba(255, 255, 255, 0.06);
      padding: 10px 20px;
      border-radius: 12px;
      display: inline-block;
      border: 1px solid rgba(255, 215, 0, 0.3);
      font-family: monospace;
      color: #fff;
      font-size: 0.95rem;
    }

    .cards-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 50px;
      max-width: 1400px;
      width: 100%;
    }

    .card-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 215, 0, 0.25);
      border-radius: 24px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      max-width: 420px;
      width: 100%;
    }
    .card-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.3);
    }

    .card-preview-thumb {
      width: 100%;
      aspect-ratio: 900 / 1350;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
      margin-bottom: 20px;
      border: 2px solid rgba(255, 215, 0, 0.4);
      background: #000;
    }
    .card-preview-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .card-info {
      text-align: center;
      margin-bottom: 20px;
      width: 100%;
    }
    .card-info h3 {
      font-family: 'Cinzel', serif;
      font-size: 1.35rem;
      color: #ffd700;
      margin-bottom: 6px;
    }
    .card-info p {
      font-size: 0.92rem;
      color: #e2c095;
    }

    .card-actions {
      display: flex;
      gap: 12px;
      width: 100%;
    }
    .btn {
      flex: 1;
      padding: 12px 16px;
      border-radius: 999px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-download {
      background: linear-gradient(135deg, #e11d48, #9f0e2f);
      color: #fff;
      border: 1px solid #ffd700;
      box-shadow: 0 4px 15px rgba(225, 29, 72, 0.4);
    }
    .btn-download:hover {
      background: linear-gradient(135deg, #f43f5e, #be123c);
      transform: scale(1.03);
    }
    .btn-view {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .btn-view:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .footer-note {
      margin-top: 60px;
      text-align: center;
      color: #a8947f;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>

  <div class="gallery-header">
    <div class="badge">❤ 3 Años Juntos · 07 de Noviembre de 2023 ❤</div>
    <h1>Tarjetas Románticas de Aniversario</h1>
    <div class="subtitle">Estrella &amp; Aron</div>
    <p class="desc">
      Tarjetas en formato de imagen de alta definición con el Código QR escaneable oficial.<br>
      Apunta tu cámara hacia el código de cualquiera de las tarjetas para abrir la experiencia romántica en vivo.
    </p>
    <div class="link-box">
      Enlace codificado: <strong>${TARGET_URL}</strong>
    </div>
  </div>

  <div class="cards-grid">

    <!-- Tarjeta 1 -->
    <div class="card-item">
      <div class="card-preview-thumb">
        <img src="tarjeta-1-luxury-ruby-gold.png" alt="Diseño 1: Ruby & Gold Romance">
      </div>
      <div class="card-info">
        <h3>1. Ruby &amp; Gold Romance</h3>
        <p>Elegancia nocturna con filigrana dorada, rubí profundo y destellos de terciopelo.</p>
      </div>
      <div class="card-actions">
        <a href="tarjeta-1-luxury-ruby-gold.png" download="tarjeta-aniversario-estrella-aron-ruby.png" class="btn btn-download">Descargar PNG</a>
        <a href="tarjeta-1-luxury-ruby-gold.html" target="_blank" class="btn btn-view">Ver Tarjeta</a>
      </div>
    </div>

    <!-- Tarjeta 2 -->
    <div class="card-item">
      <div class="card-preview-thumb">
        <img src="tarjeta-2-vintage-love-parchment.png" alt="Diseño 2: Vintage Love Letter">
      </div>
      <div class="card-info">
        <h3>2. Vintage Love Letter</h3>
        <p>Estilo pergamino marfil antiguo, ribetes de oro envejecido y sello romántico.</p>
      </div>
      <div class="card-actions">
        <a href="tarjeta-2-vintage-love-parchment.png" download="tarjeta-aniversario-estrella-aron-vintage.png" class="btn btn-download">Descargar PNG</a>
        <a href="tarjeta-2-vintage-love-parchment.html" target="_blank" class="btn btn-view">Ver Tarjeta</a>
      </div>
    </div>

    <!-- Tarjeta 3 -->
    <div class="card-item">
      <div class="card-preview-thumb">
        <img src="tarjeta-3-celestial-starry-fireworks.png" alt="Diseño 3: Celestial Fireworks">
      </div>
      <div class="card-info">
        <h3>3. Celestial &amp; Fireworks</h3>
        <p>Inspirada en el cielo nocturno estrellado y los fuegos artificiales de su amor.</p>
      </div>
      <div class="card-actions">
        <a href="tarjeta-3-celestial-starry-fireworks.png" download="tarjeta-aniversario-estrella-aron-celestial.png" class="btn btn-download">Descargar PNG</a>
        <a href="tarjeta-3-celestial-starry-fireworks.html" target="_blank" class="btn btn-view">Ver Tarjeta</a>
      </div>
    </div>

  </div>

  <div class="footer-note">
    Diseñado con todo el amor para Estrella &amp; Aron · 07 de Noviembre de 2023 · ¡Felices 3 Años Juntos!
  </div>

</body>
</html>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), galleryHtml, 'utf8');
  console.log('✓ Gallery index.html created at:', path.join(OUTPUT_DIR, 'index.html'));
  console.log('All cards successfully generated and rendered!');
}

buildCards().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
