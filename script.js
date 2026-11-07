/**
 * ROMANTIC ANNIVERSARY EXACT REPLICA SCRIPT
 * High-performance 60 FPS Engine (animation-performance & canvas-design)
 * - Realistic Falling Velvet Rose Petals & Golden Glow Dust Canvas
 * - Real-time Milestone Anniversary Counter (Since Nov 7, 2023)
 * - Interactive Modal for Exact Time Together
 * - Bottom Navigation Dock Scroll-Spy & Smooth Navigation
 * - Web Audio API Ambient Romantic Melody Synthesizer
 * - Preloader & Touch Burst Effects
 */

document.addEventListener('DOMContentLoaded', () => {

  let createHeartBurst = null;

  /* ==========================================================================
     1. ROMANTIC PRELOADER CINEMATOGRÁFICO REALISTA
     ========================================================================== */
  const preloader = document.getElementById('romantic-preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderPct = document.getElementById('preloader-pct');
  const preloaderPhrase = document.getElementById('preloader-phrase');

  const romanticPhases = [
    { threshold: 0, text: "El osito preparando su cañón de amor..." },
    { threshold: 24, text: "Disparando rayos dorados al corazón..." },
    { threshold: 50, text: "Cargando nuestro amor al 100%..." },
    { threshold: 75, text: "Corazón amarillo lleno de magia y recuerdos..." },
    { threshold: 95, text: "¡Todo listo para ti, Estrella! ❤️" }
  ];

  let currentPhaseIndex = -1;
  let phraseTimeout = null;

  function updateRomanticPhrase(pct) {
    if (!preloaderPhrase) return;
    let targetIndex = 0;
    for (let i = romanticPhases.length - 1; i >= 0; i--) {
      if (pct >= romanticPhases[i].threshold) {
        targetIndex = i;
        break;
      }
    }
    if (targetIndex !== currentPhaseIndex) {
      currentPhaseIndex = targetIndex;
      clearTimeout(phraseTimeout);
      preloaderPhrase.style.opacity = '0';
      preloaderPhrase.style.transform = 'translateY(4px)';
      phraseTimeout = setTimeout(() => {
        if (preloaderPhrase) {
          preloaderPhrase.textContent = romanticPhases[targetIndex].text;
          preloaderPhrase.style.opacity = '1';
          preloaderPhrase.style.transform = 'translateY(0)';
        }
      }, 120);
    }
  }

  let isPreloaderDismissed = false;
  function dismissPreloader() {
    if (isPreloaderDismissed || !preloader) return;
    isPreloaderDismissed = true;

    if (preloaderBar) preloaderBar.style.width = '100%';
    if (preloaderPct) preloaderPct.textContent = '100';
    updateRomanticPhrase(100);

    preloader.classList.add('fade-out');
    document.dispatchEvent(new CustomEvent('siteLoaded'));

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }

  // Allow clicking or tapping anywhere on the preloader screen to enter immediately
  if (preloader) {
    preloader.addEventListener('click', dismissPreloader);
    preloader.addEventListener('touchstart', dismissPreloader, { passive: true });
  }

  const MIN_LOAD_DURATION = 3300; // Duración mínima 3.3 segundos para una experiencia cinematográfica
  const startTime = performance.now();
  let isWindowReady = false;

  window.addEventListener('load', () => {
    isWindowReady = true;
  });

  const liquidRect = document.getElementById('preloader-liquid-rect');
  const liquidWave = document.getElementById('preloader-liquid-wave');
  const liquidHeight = 115;
  const liquidBottom = 175;

  function updateRealisticLoader() {
    if (isPreloaderDismissed) return;

    const now = performance.now();
    const elapsed = now - startTime;

    // Progreso suave basado estrictamente en el tiempo transcurrido (mínimo 3.3s)
    let progress = Math.min(100, Math.floor((elapsed / MIN_LOAD_DURATION) * 100));

    // Si aún no pasaron 3.3s, no superar el 99%
    if (elapsed < MIN_LOAD_DURATION) {
      progress = Math.min(progress, 99);
    }

    // Actualizar nivel de llenado del corazón amarillo
    if (liquidRect) {
      const fillY = liquidBottom - (progress / 100) * liquidHeight;
      const fillH = Math.max(0, (progress / 100) * liquidHeight + 10);
      liquidRect.setAttribute('y', fillY);
      liquidRect.setAttribute('height', fillH);

      if (liquidWave) {
        const waveOffset = Math.sin(now * 0.009) * 2.5;
        liquidWave.setAttribute(
          'd',
          `M 330,${fillY} Q 365,${fillY - 4 + waveOffset} 405,${fillY} T 485,${fillY} L 485,${fillY + 25} L 330,${fillY + 25} Z`
        );
      }
    }

    if (preloaderBar) preloaderBar.style.width = `${progress}%`;
    if (preloaderPct) preloaderPct.textContent = `${progress}`;
    updateRomanticPhrase(progress);

    if (progress >= 100) {
      // Breve pausa para admirar el corazón amarillo 100% cargado
      setTimeout(dismissPreloader, 380);
    } else {
      requestAnimationFrame(updateRealisticLoader);
    }
  }

  // Iniciar animación a 60 FPS
  requestAnimationFrame(updateRealisticLoader);

  // Timeout de seguridad máxima
  setTimeout(dismissPreloader, 5000);

  /* ==========================================================================
     2. LIVE TIME TOGETHER COUNTER (Since Nov 7, 2023)
     ========================================================================== */
  const startDate = new Date(2023, 10, 7, 0, 0, 0); // 7th Nov 2023 (Month 10 is November)
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMinutes = document.getElementById('count-minutes');
  const countSeconds = document.getElementById('count-seconds');

  function updateCounter() {
    const now = new Date();
    const diffMs = now - startDate;
    if (diffMs < 0) return;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    if (countDays) countDays.textContent = days.toLocaleString();
    if (countHours) countHours.textContent = String(hours).padStart(2, '0');
    if (countMinutes) countMinutes.textContent = String(minutes).padStart(2, '0');
    if (countSeconds) countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCounter();
  setInterval(updateCounter, 1000);

  /* Modal Controller */
  const datePillBtn = document.getElementById('date-pill-btn');
  const counterModal = document.getElementById('counter-modal');
  const modalClose = document.getElementById('modal-close');

  if (datePillBtn && counterModal) {
    datePillBtn.addEventListener('click', () => {
      counterModal.classList.add('active');
      counterModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (modalClose && counterModal) {
    modalClose.addEventListener('click', () => {
      counterModal.classList.remove('active');
      counterModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (counterModal) {
    counterModal.addEventListener('click', (e) => {
      if (e.target === counterModal) {
        counterModal.classList.remove('active');
        counterModal.setAttribute('aria-hidden', 'true');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && counterModal.classList.contains('active')) {
        counterModal.classList.remove('active');
        counterModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ==========================================================================
     3. HIGH-PERFORMANCE AMBIENT CANVAS (Falling Petals & Golden Glow Dust)
     ========================================================================== */
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle classes
    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -25;
        this.size = Math.random() * 10 + 8;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.025 + 0.01;
        this.opacity = Math.random() * 0.45 + 0.35;
        this.color = Math.random() > 0.3 ? '#880e2a' : '#b31538';
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.5;
        this.wobble += this.wobbleSpeed;
        this.rotation += this.rotSpeed;

        if (this.y > height + 25) {
          this.reset(false);
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;

        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(this.size * 0.5, -this.size * 0.5, this.size, 0, 0, this.size);
        c.bezierCurveTo(-this.size, 0, -this.size * 0.5, -this.size * 0.5, 0, 0);
        c.fill();

        c.restore();
      }
    }

    class GoldDust {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulse += 0.03;

        if (this.y < -10) {
          this.reset(false);
        }
      }

      draw(c) {
        const currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
        c.save();
        c.globalAlpha = currentOpacity;
        c.fillStyle = '#f5d77f';
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        // Bright inner core (zero GPU lag)
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.arc(this.x, this.y, this.size * 0.45, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    class BurstHeart {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.size = Math.random() * 7 + 6;
        this.speedY = -(Math.random() * 2.5 + 1);
        this.speedX = (Math.random() - 0.5) * 2.2;
        this.opacity = 1;
        this.color = Math.random() < 0.65 ? '#e11d48' : '#f5d77f';
        this.rotation = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.035;
        this.opacity -= 0.016;
      }

      draw(c) {
        if (this.opacity <= 0) return;
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = Math.max(0, this.opacity);
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 6;
        c.beginPath();
        const d = this.size;
        c.moveTo(0, d * 0.3);
        c.bezierCurveTo(-d * 0.5, -d * 0.3, -d, d * 0.3, 0, d);
        c.bezierCurveTo(d, d * 0.3, d * 0.5, -d * 0.3, 0, d * 0.3);
        c.fill();
        c.restore();
      }
    }

    const petals = Array.from({ length: 30 }, () => new Petal());
    const goldDust = Array.from({ length: 25 }, () => new GoldDust());
    let burstHearts = [];

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    function renderLoop() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < goldDust.length; i++) {
          goldDust[i].update();
          goldDust[i].draw(ctx);
        }

        for (let i = 0; i < petals.length; i++) {
          petals[i].update();
          petals[i].draw(ctx);
        }

        for (let i = burstHearts.length - 1; i >= 0; i--) {
          burstHearts[i].update();
          burstHearts[i].draw(ctx);
          if (burstHearts[i].opacity <= 0) {
            burstHearts.splice(i, 1);
          }
        }
      }
      requestAnimationFrame(renderLoop);
    }

    renderLoop();

    createHeartBurst = function (x, y, count = 5) {
      for (let i = 0; i < count; i++) {
        burstHearts.push(new BurstHeart(x, y));
      }
    };

    /* Click / Tap Sparkle & Floating Heart Burst */
    window.addEventListener('click', (e) => {
      // Don't trigger on interactive buttons or links
      if (e.target.closest('button, a, input')) return;

      for (let i = 0; i < 4; i++) {
        burstHearts.push(new BurstHeart(e.clientX, e.clientY));
      }

      for (let i = 0; i < 6; i++) {
        const dust = new GoldDust();
        dust.x = e.clientX + (Math.random() - 0.5) * 30;
        dust.y = e.clientY + (Math.random() - 0.5) * 30;
        dust.speedY = -(Math.random() * 2 + 0.8);
        dust.speedX = (Math.random() - 0.5) * 2;
        dust.size = Math.random() * 3 + 1.5;
        dust.opacity = 1;
        goldDust.push(dust);
      }
      if (burstHearts.length > 25) burstHearts.splice(0, burstHearts.length - 25);
      if (goldDust.length > 35) goldDust.splice(0, goldDust.length - 35);
    });
  }

  /* ==========================================================================
     4. SCROLL TO TOP VISIBILITY CONTROLLER (Liquid 60 FPS Throttled)
     ========================================================================== */
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  let scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Scroll to top visibility
        if (scrollTopBtn) {
          if (scrollY > 350) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     5. WEB AUDIO API ROMANTIC MELODY SYNTHESIZER
     ========================================================================== */
  const musicBtn = document.getElementById('music-btn');
  let audioCtx = null;
  let isPlaying = false;
  let musicInterval = null;

  // Romantic pentatonic chord progression in warm acoustic frequencies (C major / A minor)
  const notes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    659.25, // E5
    783.99  // G5
  ];

  function playRomanticTone(freq, timeOffset = 0, duration = 2.2) {
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + timeOffset);

    // Warm decay envelope
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime + timeOffset);
    gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + timeOffset + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + timeOffset + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime + timeOffset);
    osc.stop(audioCtx.currentTime + timeOffset + duration);
  }

  function startRomanticMelody() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let step = 0;
    const arpeggio = [
      [0, 2, 4],
      [1, 3, 5],
      [3, 4, 6],
      [2, 4, 5]
    ];

    function playChord() {
      const chord = arpeggio[step % arpeggio.length];
      chord.forEach((noteIdx, i) => {
        playRomanticTone(notes[noteIdx], i * 0.35, 2.5);
      });
      step++;
    }

    playChord();
    musicInterval = setInterval(playChord, 3200);
  }

  function stopRomanticMelody() {
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        musicBtn.classList.add('playing');
        startRomanticMelody();
      } else {
        musicBtn.classList.remove('playing');
        stopRomanticMelody();
      }
    });
  }

  // Hero button click love effect
  const heroLoveBtn = document.getElementById('hero-love-btn');
  if (heroLoveBtn) {
    heroLoveBtn.addEventListener('click', () => {
      // Smooth scroll to message section
      const msgSec = document.getElementById('mensaje');
      if (msgSec) {
        msgSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ==========================================================================
     6. SCROLL REVEAL OBSERVER (magic-animator & animation-performance)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .moments-stage-wrapper');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not available
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     7. 3D INTERACTIVE PARALLAX TILT PHYSICS (Throttled with rAF)
     ========================================================================== */
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach(el => {
    let bounds = null;
    let tiltTicking = false;
    let rotX = 0, rotY = 0;

    function updateBounds() {
      bounds = el.getBoundingClientRect();
    }

    el.addEventListener('mouseenter', updateBounds, { passive: true });

    el.addEventListener('mousemove', (e) => {
      if (!bounds) updateBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width - 0.5) * 2;
      const yPct = (mouseY / bounds.height - 0.5) * 2;

      const maxRotate = 7.5;
      rotX = (-yPct * maxRotate).toFixed(2);
      rotY = (xPct * maxRotate).toFixed(2);

      if (!tiltTicking) {
        requestAnimationFrame(() => {
          el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
          tiltTicking = false;
        });
        tiltTicking = true;
      }
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      bounds = null;
      el.style.transform = '';
    }, { passive: true });
  });

  /* ==========================================================================
     8. 3D FAN COVERFLOW CAROUSEL & POLAROID LIGHTBOX (NUESTROS MEJORES MOMENTOS)
     ========================================================================== */
  const coverflowCards = Array.from(document.querySelectorAll('.coverflow-polaroid-card'));
  const coverflowDeck = document.getElementById('moments-coverflow');
  const btnPrev = document.getElementById('moments-prev');
  const btnNext = document.getElementById('moments-next');
  const polaroidModal = document.getElementById('polaroid-modal');
  const polaroidModalClose = document.getElementById('polaroid-modal-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  const polaroidCaptions = [
    "Caminando de tu mano por la orilla del mar... ❤️",
    "Cada atardecer contigo se siente como un sueño ✨",
    "Un tierno abrazo para recordarte cuánto te amo 🧸",
    "El beso que detuvo el tiempo en la playa 🌅",
    "Dos almas unidas formando un solo corazón para siempre 💕"
  ];

  let activeIndex = 2; // Card 2 is the center card by default
  const totalCards = coverflowCards.length || 5;
  const positionClasses = ['pos-far-left', 'pos-mid-left', 'pos-center', 'pos-mid-right', 'pos-far-right'];

  function updateCoverflow() {
    coverflowCards.forEach((card, i) => {
      positionClasses.forEach(cls => card.classList.remove(cls));

      let diff = i - activeIndex;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;

      if (diff === 0) {
        card.classList.add('pos-center');
        card.setAttribute('aria-selected', 'true');
        card.setAttribute('tabindex', '0');
      } else if (diff === -1) {
        card.classList.add('pos-mid-left');
        card.setAttribute('aria-selected', 'false');
        card.setAttribute('tabindex', '-1');
      } else if (diff === 1) {
        card.classList.add('pos-mid-right');
        card.setAttribute('aria-selected', 'false');
        card.setAttribute('tabindex', '-1');
      } else if (diff <= -2) {
        card.classList.add('pos-far-left');
        card.setAttribute('aria-selected', 'false');
        card.setAttribute('tabindex', '-1');
      } else if (diff >= 2) {
        card.classList.add('pos-far-right');
        card.setAttribute('aria-selected', 'false');
        card.setAttribute('tabindex', '-1');
      }
    });
  }

  function nextPhoto() {
    activeIndex = (activeIndex + 1) % totalCards;
    updateCoverflow();
  }

  function prevPhoto() {
    activeIndex = (activeIndex - 1 + totalCards) % totalCards;
    updateCoverflow();
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      nextPhoto();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevPhoto();
    });
  }

  // Card click: center card opens lightbox modal, side cards rotate to center
  coverflowCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx === activeIndex) {
        const img = card.querySelector('.polaroid-img');
        if (img && lightboxImg && polaroidModal) {
          lightboxImg.src = img.src;
          if (lightboxCaption) {
            lightboxCaption.textContent = polaroidCaptions[idx % polaroidCaptions.length];
          }
          polaroidModal.classList.add('active');
          polaroidModal.setAttribute('aria-hidden', 'false');
        }
      } else {
        activeIndex = idx;
        updateCoverflow();
      }
    });
  });

  // Touch swipe support for coverflow deck
  if (coverflowDeck) {
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwipingDeck = false;

    coverflowDeck.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwipingDeck = true;
    }, { passive: true });

    coverflowDeck.addEventListener('touchend', (e) => {
      if (!isSwipingDeck) return;
      isSwipingDeck = false;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        if (deltaX < 0) {
          nextPhoto();
        } else {
          prevPhoto();
        }
      }
    }, { passive: true });
  }

  // Keyboard navigation for coverflow
  window.addEventListener('keydown', (e) => {
    if (polaroidModal && polaroidModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        polaroidModal.classList.remove('active');
        polaroidModal.setAttribute('aria-hidden', 'true');
      }
      return;
    }

    const momentosSection = document.getElementById('momentos');
    if (!momentosSection) return;
    const rect = momentosSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      if (e.key === 'ArrowLeft') {
        prevPhoto();
      } else if (e.key === 'ArrowRight') {
        nextPhoto();
      }
    }
  });

  if (polaroidModalClose && polaroidModal) {
    polaroidModalClose.addEventListener('click', () => {
      polaroidModal.classList.remove('active');
      polaroidModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (polaroidModal) {
    polaroidModal.addEventListener('click', (e) => {
      if (e.target === polaroidModal) {
        polaroidModal.classList.remove('active');
        polaroidModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Set initial coverflow positions
  updateCoverflow();

  /* ==========================================================================
     9. REALISTIC FLOATING HEARTS MULTI-PLANE PARALLAX & CLICK BURST (rAF Throttled)
     ========================================================================== */
  const floatingHearts = document.querySelectorAll('.floating-heart-icon');
  let heartTicking = false;
  let mouseClientX = 0, mouseClientY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseClientX = e.clientX;
    mouseClientY = e.clientY;

    if (!heartTicking) {
      requestAnimationFrame(() => {
        const xPct = (mouseClientX / window.innerWidth - 0.5) * 2;
        const yPct = (mouseClientY / window.innerHeight - 0.5) * 2;

        floatingHearts.forEach(heart => {
          const depth = parseFloat(heart.getAttribute('data-depth')) || 0.25;
          const moveX = xPct * depth * 22;
          const moveY = yPct * depth * 22;
          heart.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
        });
        heartTicking = false;
      });
      heartTicking = true;
    }
  }, { passive: true });

  floatingHearts.forEach(heart => {
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = heart.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      if (createHeartBurst) {
        createHeartBurst(centerX, centerY, 6);
      }
      heart.style.transform = 'scale(1.35) rotate(12deg)';
      setTimeout(() => {
        heart.style.transform = '';
      }, 350);
    });
  });

  /* ==========================================================================
     10. MOBILE SWIPE STACK DECKS ("Se apilen una tras otra y al deslizar se vayan atrás")
     ========================================================================== */
  function setupSwipeDeck(containerSelector, cardSelector, hintSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let cards = Array.from(container.querySelectorAll(cardSelector));
    if (cards.length === 0) return;

    let isStacked = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let isSwiping = false;
    let activeCard = null;
    let isAnimating = false;
    let hasMovedFar = false;
    let lastSwipeTime = 0;

    function applyStackStyles() {
      if (!isStacked) {
        // Desktop: clear all inline styles so desktop CSS rules 100%
        cards.forEach(card => {
          card.style.transform = '';
          card.style.zIndex = '';
          card.style.opacity = '';
          card.style.pointerEvents = '';
          card.style.transition = '';
        });
        return;
      }

      const total = cards.length;
      cards.forEach((card, idx) => {
        // idx 0 is top of stack
        const zIndex = total - idx;
        const translateY = idx * 10;
        const scale = 1 - (idx * 0.05);
        const rotate = idx === 0 ? 0 : (idx % 2 === 1 ? -2.2 * idx : 2.2 * idx);
        const opacity = idx > 3 ? 0 : Math.max(0.4, 1 - (idx * 0.18));
        const pointerEvents = idx === 0 ? 'auto' : 'none';

        card.style.zIndex = zIndex;
        card.style.pointerEvents = pointerEvents;
        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease';
        card.style.transform = `translate3d(0, ${translateY}px, -${idx * 15}px) scale(${scale}) rotate(${rotate}deg)`;
        card.style.opacity = opacity;
      });
    }

    function sendTopToBack(dir = 1) {
      if (isAnimating || cards.length <= 1) return;
      isAnimating = true;
      lastSwipeTime = Date.now();

      const topCard = cards[0];
      topCard.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 0.35s ease';
      topCard.style.transform = `translate3d(${dir * 135}%, -15px, 0) rotate(${dir * 20}deg)`;
      topCard.style.opacity = '0';

      setTimeout(() => {
        // Cycle top card to the back of array
        cards.push(cards.shift());
        applyStackStyles();
        setTimeout(() => {
          isAnimating = false;
        }, 180);
      }, 320);
    }

    function checkResponsiveMode() {
      const shouldStack = window.innerWidth <= 768;
      if (shouldStack !== isStacked) {
        isStacked = shouldStack;
        applyStackStyles();
      }
    }

    // Touch events for mobile swiping
    container.addEventListener('touchstart', (e) => {
      if (!isStacked || isAnimating) return;
      if (e.target.closest(cardSelector) !== cards[0]) return;

      activeCard = cards[0];
      isSwiping = true;
      hasMovedFar = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      currentY = startY;

      activeCard.style.transition = 'none';
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isSwiping || !activeCard || !isStacked) return;
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      if (Math.abs(deltaX) > 12) {
        hasMovedFar = true;
      }

      activeCard.style.transform = `translate3d(${deltaX}px, ${deltaY * 0.25}px, 0) rotate(${deltaX * 0.08}deg)`;
    }, { passive: true });

    container.addEventListener('touchend', () => {
      if (!isSwiping || !activeCard || !isStacked) return;
      isSwiping = false;

      const deltaX = currentX - startX;
      if (Math.abs(deltaX) > 45) {
        const dir = deltaX > 0 ? 1 : -1;
        sendTopToBack(dir);
      } else {
        activeCard.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        activeCard.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
      }
      activeCard = null;
    }, { passive: true });

    // Optional mouse drag for desktop responsiveness testing
    container.addEventListener('mousedown', (e) => {
      if (!isStacked || isAnimating) return;
      if (e.target.closest(cardSelector) !== cards[0]) return;

      activeCard = cards[0];
      isSwiping = true;
      hasMovedFar = false;
      startX = e.clientX;
      startY = e.clientY;
      currentX = startX;
      currentY = startY;
      activeCard.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isSwiping || !activeCard || !isStacked) return;
      currentX = e.clientX;
      currentY = e.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      if (Math.abs(deltaX) > 12) {
        hasMovedFar = true;
      }
      activeCard.style.transform = `translate3d(${deltaX}px, ${deltaY * 0.25}px, 0) rotate(${deltaX * 0.08}deg)`;
    });

    window.addEventListener('mouseup', () => {
      if (!isSwiping || !activeCard || !isStacked) return;
      isSwiping = false;

      const deltaX = currentX - startX;
      if (Math.abs(deltaX) > 45) {
        const dir = deltaX > 0 ? 1 : -1;
        sendTopToBack(dir);
      } else {
        activeCard.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        activeCard.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
      }
      activeCard = null;
    });

    // Support clicking the hint button to slide to back
    if (hintSelector) {
      const hint = document.querySelector(hintSelector);
      if (hint) {
        hint.addEventListener('click', () => {
          if (isStacked) sendTopToBack(1);
        });
      }
    }

    // Resize listener with throttle
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkResponsiveMode, 100);
    }, { passive: true });

    // Initial check
    checkResponsiveMode();
  }

  // Initialize swipe deck for Por Qué Te Amo
  setupSwipeDeck('.reasons-cards-grid', '.reason-wine-card', '#reasons-swipe-hint');

  /* ==========================================================================
     10. 3D ROMANTIC LOVE ENVELOPE CONTROLLER (EFECTO CARTA ADAPTADO)
     ========================================================================== */
  const envelope = document.getElementById('romantic-envelope');
  const closeLetterBtn = document.getElementById('close-letter-btn');
  const closeLetterBtnSecondary = document.getElementById('close-letter-btn-secondary');

  function openLetter() {
    if (!envelope) return;
    envelope.classList.add('is-open');
    envelope.setAttribute('aria-expanded', 'true');
  }

  function closeLetter() {
    if (!envelope) return;
    envelope.classList.remove('is-open');
    envelope.setAttribute('aria-expanded', 'false');
  }

  function handleCloseEvent(e) {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    closeLetter();
  }

  if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', handleCloseEvent);
    closeLetterBtn.addEventListener('touchend', handleCloseEvent);
  }

  if (closeLetterBtnSecondary) {
    closeLetterBtnSecondary.addEventListener('click', handleCloseEvent);
    closeLetterBtnSecondary.addEventListener('touchend', handleCloseEvent);
  }

  if (envelope) {
    envelope.addEventListener('click', (e) => {
      // If user clicked any close button inside the letter
      if (e.target.closest('#close-letter-btn') || e.target.closest('#close-letter-btn-secondary')) {
        e.stopPropagation();
        closeLetter();
        return;
      }

      // If user clicked the celebrate fireworks button
      if (e.target.closest('#open-fireworks-btn')) {
        return;
      }

      // If envelope is open:
      if (envelope.classList.contains('is-open')) {
        // If user clicked inside reading content, keep it open for reading & scrolling
        if (e.target.closest('.letter-inner-content')) {
          return;
        }
        // Clicking anywhere else on the envelope or letter margins closes it immediately
        closeLetter();
      } else {
        // If envelope is closed: opening it immediately
        openLetter();
      }
    });

    // Close when tapping outside the envelope on desktop or mobile
    document.addEventListener('click', (e) => {
      if (envelope && envelope.classList.contains('is-open')) {
        if (!envelope.contains(e.target)) {
          closeLetter();
        }
      }
    });

    document.addEventListener('touchend', (e) => {
      if (envelope && envelope.classList.contains('is-open')) {
        if (e.target.closest('#close-letter-btn') || e.target.closest('#close-letter-btn-secondary')) {
          return;
        }
        if (!envelope.contains(e.target)) {
          closeLetter();
        }
      }
    }, { passive: true });

    // Keyboard accessibility (Enter / Space opens/closes the envelope, Escape closes)
    window.addEventListener('keydown', (e) => {
      if (envelope && envelope.classList.contains('is-open')) {
        if (e.key === 'Escape') {
          closeLetter();
        }
      }
    });

    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (envelope.classList.contains('is-open')) {
          closeLetter();
        } else {
          openLetter();
        }
      }
    });
  }

  /* ==========================================================================
     11. CELEBRATION FIREWORKS MODAL (EFECTO FUEGOS ARTIFICIALES ADAPTADO)
     ========================================================================== */
  const fireworksModal = document.getElementById('fireworks-modal');
  const fireworksIframe = document.getElementById('fireworks-iframe');
  const fireworksModalClose = document.getElementById('fireworks-modal-close');
  const btnOpenFireworks = document.getElementById('open-fireworks-btn');

  let wasMusicPlayingBeforeFireworks = false;

  function openFireworksShow() {
    if (!fireworksModal || !fireworksIframe) return;

    // Pause main page melody so fireworks audio is heard loud and crisp
    if (isPlaying) {
      wasMusicPlayingBeforeFireworks = true;
      stopRomanticMelody();
      isPlaying = false;
      if (musicBtn) {
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('aria-label', 'Reproducir melodía romántica');
      }
    }

    // Ensure iframe is loaded with fireworks source
    const targetSrc = fireworksIframe.dataset.src || 'Efecto-fuegos-artificiales/index.html';
    if (!fireworksIframe.src || fireworksIframe.src.includes('about:blank') || fireworksIframe.src === '') {
      fireworksIframe.src = targetSrc;
    }

    fireworksModal.classList.add('active');
    fireworksModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Notify iframe to start visuals and audio once loaded
    const sendStartFireworks = () => {
      try {
        if (fireworksIframe && fireworksIframe.contentWindow) {
          fireworksIframe.contentWindow.postMessage({ action: 'START_FIREWORKS_AUDIO' }, '*');
          fireworksIframe.contentWindow.postMessage({ action: 'RESIZE_FIREWORKS' }, '*');
        }
      } catch (err) {}
    };

    if (fireworksIframe.contentDocument && fireworksIframe.contentDocument.readyState === 'complete') {
      sendStartFireworks();
    } else {
      fireworksIframe.onload = sendStartFireworks;
    }
    setTimeout(sendStartFireworks, 150);
    setTimeout(sendStartFireworks, 400);
    setTimeout(sendStartFireworks, 800);
  }

  function closeFireworksShow() {
    if (!fireworksModal) return;

    // Stop all fireworks sounds and freeze canvas loop immediately
    try {
      if (fireworksIframe && fireworksIframe.contentWindow) {
        fireworksIframe.contentWindow.postMessage({ action: 'STOP_FIREWORKS_AUDIO' }, '*');
      }
    } catch (err) {}

    fireworksModal.classList.remove('active');
    fireworksModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Resume main page background melody if it was playing before
    if (wasMusicPlayingBeforeFireworks) {
      wasMusicPlayingBeforeFireworks = false;
      startRomanticMelody();
      isPlaying = true;
      if (musicBtn) {
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-label', 'Pausar melodía romántica');
      }
    }
  }

  if (btnOpenFireworks) {
    btnOpenFireworks.addEventListener('click', (e) => {
      e.stopPropagation();
      openFireworksShow();
    });
  }

  if (fireworksModalClose) {
    fireworksModalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeFireworksShow();
    });
  }

  if (fireworksModal) {
    fireworksModal.addEventListener('click', (e) => {
      if (e.target === fireworksModal) {
        closeFireworksShow();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fireworksModal && fireworksModal.classList.contains('active')) {
      closeFireworksShow();
    }
  });

});
