/* ============================================================
   MORGAN & LIOR — Nosso Universo — app.js
   Depende de js/data.js (CONFIG, quizBank) carregado antes.
   ============================================================ */

const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function pad(n){ return String(n).padStart(2,'0'); }
function pad3(n){ return String(n).padStart(2,'0'); }

/* ---------- toast ---------- */
const ToastModule = (function(){
  const el = $('#toast');
  let timer = null;
  function show(msg){
    if(!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('show'), 2600);
  }
  return { show };
})();

/* ---------- poeira ambiente ---------- */
const DustModule = (function(){
  const field = $('#dustField');
  if (!field || prefersReducedMotion) return { burst(){} };
  let count = 0;
  const MAX_AMBIENT = 8;
  function spawn(x){
    const p = document.createElement('span');
    p.className = 'mote';
    const left = x !== undefined ? x : Math.random()*100;
    const duration = 10 + Math.random()*8;
    const drift = (Math.random()*60-30) + 'px';
    p.style.left = left + 'vw';
    p.style.setProperty('--drift', drift);
    p.style.animationDuration = duration + 's';
    field.appendChild(p);
    setTimeout(() => p.remove(), duration*1000 + 500);
  }
  function ambientLoop(){
    if (count < MAX_AMBIENT){ spawn(); count++; }
    setTimeout(() => { count = Math.max(0,count-1); }, 1200);
    setTimeout(ambientLoop, 1800 + Math.random()*1800);
  }
  ambientLoop();
  function burst(n=6){ for (let i=0;i<n;i++) setTimeout(() => spawn(), i*90); }
  return { burst };
})();

/* ---------- conforto visual ---------- */
(function accessibilityModule(){
  const btn = $('#accessibilityToggle');
  if (!btn) return;
  const saved = localStorage.getItem('morganLiorVisualComfort') === '1';
  if (saved) document.body.classList.add('visual-comfort');
  btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
  btn.textContent = saved ? 'A−' : 'A+';
  btn.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('visual-comfort');
    localStorage.setItem('morganLiorVisualComfort', enabled ? '1' : '0');
    btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    btn.textContent = enabled ? 'A−' : 'A+';
  });
})();

/* ---------- abertura ---------- */
(function introModule(){
  const intro = $('#intro');
  const eyebrow = $('#introEyebrow');
  const line1 = $('#introLine1');
  const enterBtn = $('#introEnter');
  const navTop = $('#navTop');
  const navBottom = $('#navBottom');
  if (!intro) return;

  setTimeout(() => eyebrow.classList.add('show'), 250);
  setTimeout(() => line1.classList.add('show'), 950);
  setTimeout(() => enterBtn.classList.add('show'), 1900);

  function enter(){
    intro.classList.add('fade-out');
    document.body.style.overflow = 'auto';
    DustModule.burst(8);
    setTimeout(() => {
      navTop.classList.add('visible');
      navBottom.classList.add('visible');
    }, 500);
    setTimeout(() => intro.setAttribute('aria-hidden','true'), 1200);
  }
  document.body.style.overflow = 'hidden';
  enterBtn.addEventListener('click', enter);
})();

/* ---------- navegação ---------- */
(function navModule(){
  const navTop = $('#navTop');
  const navLinksBtns = $$('#navLinks button');
  const navBottom = $('#navBottom');
  const sectionIds = ['hero','tempo','regras','motivos','cartas','florescer','galeria','final'];
  const sections = sectionIds.map(id => $('#'+id)).filter(Boolean);

  sections.forEach((sec,i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Ir para seção '+(i+1));
    dot.addEventListener('click', () => sec.scrollIntoView({behavior: prefersReducedMotion ? 'auto':'smooth'}));
    navBottom.appendChild(dot);
  });
  const bottomDots = $$('button', navBottom);

  navLinksBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = $('#'+btn.dataset.target);
      target && target.scrollIntoView({behavior: prefersReducedMotion ? 'auto':'smooth'});
    });
  });

  window.addEventListener('scroll', () => {
    navTop.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive:true });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target);
      if (idx === -1) return;
      if (entry.isIntersecting){
        navLinksBtns.forEach(b => b.classList.toggle('active', b.dataset.target === entry.target.id));
        bottomDots.forEach((d,i) => d.classList.toggle('active', i===idx));
      }
    });
  }, { threshold:0.5 });
  sections.forEach(s => obs.observe(s));
})();

/* ---------- reveal — animações de entrada ---------- */
const RevealModule = (function(){
  function observeAll(){
    const targets = $$('[data-reveal]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
    targets.forEach(t => obs.observe(t));
  }
  return { observeAll };
})();

/* ---------- nosso mundo (hero) ---------- */
(function worldModule(){
  const wrap=$('#worldWrap'), burst=$('#worldBurst'), message=$('#worldMessage'), hint=$('#worldHint'), squish=$('#worldSquish');
  const symbols = wrap ? [...wrap.querySelectorAll('.world-symbol')] : [];
  if (!wrap || !squish || !symbols.length) return;
  const sequence = ['circle','heart','butterfly','universe','infinity','life'];
  const labels = { circle:'um círculo que respira', heart:'um coração', butterfly:'uma borboleta', universe:'um pequeno universo', infinity:'o infinito', life:'vida que continua a crescer' };
  let current = 0, started = false, timer = null;
  function get(name){ return symbols.find(el => el.dataset.symbol === name); }
  function show(name, animate=true){
    symbols.forEach(el => { el.classList.toggle('is-active', el.dataset.symbol===name); });
    squish.classList.remove('is-morphing'); void squish.offsetWidth; squish.classList.add('is-morphing');
  }
  function spawnBurst(){
    burst.innerHTML = ''; const n = 14;
    for (let i=0;i<n;i++){ const p = document.createElement('span'); p.className='bloom-petal'; p.style.setProperty('--a',(360/n*i)+'deg'); p.style.animationDelay=(Math.random()*.18)+'s'; burst.appendChild(p); }
  }
  function next(manual=false){
    let name = sequence[Math.floor(Math.random()*sequence.length)];
    if (name === sequence[current]) name = sequence[(sequence.indexOf(name)+1+Math.floor(Math.random()*(sequence.length-1)))%sequence.length];
    current = sequence.indexOf(name); show(name,true);
    if (!prefersReducedMotion) spawnBurst();
    if (manual) DustModule.burst(4);
    message.textContent = `Agora, o nosso mundo é ${labels[name]}.`;
    message.classList.add('show'); hint.style.opacity = '0';
  }
  function schedule(){ clearTimeout(timer); timer = setTimeout(() => { next(false); schedule(); }, 3600+Math.random()*3000); }
  function trigger(){ if (!started){ started = true; show('circle', false); schedule(); } next(true); }
  wrap.addEventListener('click', trigger);
  wrap.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){ e.preventDefault(); trigger(); } });
  show('circle', false);
})();

/* ---------- contador ---------- */
(function counterModule(){
  const elY=$('#cYears'), elMo=$('#cMonths'), elD=$('#cDays');
  const elH=$('#cHours'), elM=$('#cMinutes'), elS=$('#cSeconds');
  if (!elY) return;
  function diffBreakdown(start, now){
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();
    if (seconds<0){ seconds+=60; minutes--; }
    if (minutes<0){ minutes+=60; hours--; }
    if (hours<0){ hours+=24; days--; }
    if (days<0){ const prevMonth=new Date(now.getFullYear(),now.getMonth(),0); days+=prevMonth.getDate(); months--; }
    if (months<0){ months+=12; years--; }
    return { years, months, days, hours, minutes, seconds };
  }
  function tick(){
    const now = new Date();
    if (now < CONFIG.startDate){
      elY.textContent = elMo.textContent = elD.textContent = '0';
      elH.textContent = elM.textContent = elS.textContent = '00';
      return;
    }
    const b = diffBreakdown(CONFIG.startDate, now);
    elY.textContent = b.years; elMo.textContent = b.months; elD.textContent = b.days;
    elH.textContent = pad(b.hours); elM.textContent = pad(b.minutes); elS.textContent = pad(b.seconds);
  }
  tick(); setInterval(tick, 1000);
})();

/* ---------- curiosidades ---------- */
(function curiosityModule(){
  const list = [...CONFIG.curiosities];
  function pick(i){ return list[i % list.length]; }
  const c1 = $('#curiosity1'), c2 = $('#curiosity2');
  if (c1) c1.textContent = pick(Math.floor(Math.random()*list.length));
  if (c2) c2.textContent = pick(Math.floor(Math.random()*list.length)+1);
  const b1 = $('#bridge1'), b2 = $('#bridge2');
  if (b1) b1.textContent = CONFIG.curiosityBridges[0];
  if (b2) b2.textContent = CONFIG.curiosityBridges[1];
})();

/* ---------- nosso tempo — timeline ---------- */
(function timelineModule(){
  const list = $('#timelineList');
  if (!list) return;
  CONFIG.timeline.forEach((item) => {
    const el = document.createElement('article');
    el.className = 'timeline-item';
    el.setAttribute('data-reveal','');
    el.innerHTML = `
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-card">
        <span class="timeline-label">${item.label}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-text">${item.text}</p>
        <span class="timeline-toggle">ler mais</span>
      </div>`;
    el.addEventListener('click', () => {
      const wasOpen = el.classList.contains('open');
      el.classList.toggle('open');
      const toggle = $('.timeline-toggle', el);
      toggle.textContent = wasOpen ? 'ler mais' : 'fechar';
      if (!wasOpen) DustModule.burst(2);
    });
    list.appendChild(el);
  });
})();

/* ---------- regras ---------- */
(function rulesModule(){
  const grid = $('#rulesGrid');
  if (!grid) return;
  CONFIG.rules.forEach((text, i) => {
    const card = document.createElement('article');
    card.className = 'rule-card';
    card.setAttribute('data-reveal','');
    card.innerHTML = `<span class="rule-num">${pad3(i+1)}</span><p class="rule-text">${text}</p>`;
    grid.appendChild(card);
  });
})();

/* ---------- swipe genérico ---------- */
function bindSwipe(el, onLeft, onRight){
  let startX = 0, startY = 0, tracking = false;
  el.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; startY = e.touches[0].clientY; tracking = true;
  }, { passive:true });
  el.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)){
      if (dx < 0) onLeft(); else onRight();
    }
  }, { passive:true });
}

/* ---------- 100 motivos — carrossel ---------- */
(function reasonsModule(){
  const track = $('#reasonsTrack');
  if (!track) return;
  const data = CONFIG.reasons;
  const currentEl = $('#reasonsCurrent');
  const progressFill = $('#reasonsProgress');
  let idx = 0;
  function render(){
    track.innerHTML = '';
    const card = document.createElement('article');
    card.className = 'reason-card';
    card.innerHTML = `
      <span class="reason-category">${data[idx][1]}</span>
      <p class="reason-text">${data[idx][0]}</p>
      <span class="reason-num">Motivo #${pad3(idx+1)}</span>`;
    track.appendChild(card);
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('active')));
    currentEl.textContent = pad3(idx+1);
    progressFill.style.width = ((idx+1)/data.length*100) + '%';
  }
  function go(delta){ idx = (idx + delta + data.length) % data.length; render(); }
  $('#reasonsPrev').addEventListener('click', () => go(-1));
  $('#reasonsNext').addEventListener('click', () => go(1));
  bindSwipe(track, () => go(1), () => go(-1));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
  document.addEventListener('keydown', (e) => {
    const sec = $('#motivos');
    if (!sec) return;
    const rect = sec.getBoundingClientRect();
    const inView = rect.top < window.innerHeight*0.5 && rect.bottom > window.innerHeight*0.5;
    if (!inView) return;
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
  render();
})();

/* ---------- 100 cartas — envelope + carrossel ---------- */
(function lettersModule(){
  const track = $('#lettersTrack');
  if (!track) return;
  const data = CONFIG.letters;
  const currentEl = $('#lettersCurrent');
  const progressFill = $('#lettersProgress');
  let idx = 0;
  function render(){
    track.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'letter-card';
    wrap.innerHTML = `
      <div class="envelope-shell" tabindex="0" role="button" aria-label="Abrir carta ${idx+1}">
        <div class="envelope-label">
          <span class="env-num">Carta #${pad3(idx+1)}</span>
          <span class="env-title">Para Morgan</span>
        </div>
        <div class="envelope-flap"></div>
      </div>
      <div class="letter-paper">
        <span class="letter-close" aria-hidden="true">✕</span>
        <span class="letter-category">${data[idx][1]}</span>
        <p class="letter-greeting">${data[idx][0]}</p>
        <p class="letter-body"></p>
        <p class="letter-sign">— Lior</p>
      </div>`;
    track.appendChild(wrap);
    requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('active')));
    currentEl.textContent = pad3(idx+1);
    progressFill.style.width = ((idx+1)/data.length*100) + '%';

    const shell = $('.envelope-shell', wrap);
    const bodyEl = $('.letter-body', wrap);
    const closeBtn = $('.letter-close', wrap);
    let typed = false;

    function openEnvelope(){
      if (shell.classList.contains('opened')) return;
      shell.classList.add('opened');
      setTimeout(() => {
        if (!typed){
          typed = true;
          if (prefersReducedMotion){ bodyEl.textContent = data[idx][2]; }
          else typeWriter(data[idx][2], bodyEl, 13);
        }
      }, 480);
    }
    shell.addEventListener('click', openEnvelope);
    shell.addEventListener('keydown', (e) => { if (e.key==='Enter'||e.key===' '){ e.preventDefault(); openEnvelope(); } });
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); shell.classList.remove('opened'); });
  }
  function typeWriter(text, el, speed){
    el.textContent = ''; let i = 0;
    (function step(){ if (i <= text.length){ el.textContent = text.slice(0,i); i++; setTimeout(step, speed); } })();
  }
  function go(delta){ idx = (idx + delta + data.length) % data.length; render(); }
  $('#lettersPrev').addEventListener('click', () => go(-1));
  $('#lettersNext').addEventListener('click', () => go(1));
  bindSwipe(track, () => go(1), () => go(-1));
  document.addEventListener('keydown', (e) => {
    const sec = $('#cartas');
    if (!sec) return;
    const rect = sec.getBoundingClientRect();
    const inView = rect.top < window.innerHeight*0.5 && rect.bottom > window.innerHeight*0.5;
    if (!inView) return;
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
  render();
})();

/* ---------- florescer — jardim interativo ---------- */
(function gardenModule(){
  const wrap = $('#gardenWrap');
  if (!wrap) return;
  const caption = $('#gardenCaption');
  const hint = $('#gardenHint');
  const resetBtn = $('#gardenReset');
  let phraseIdx = 0, flowerCount = 0;
  const MAX_FLOWERS = 12;
  function svgFlower(){
    const palettes = [
      ['var(--orb-magenta)','var(--orb-violet)','var(--orb-gold)'],
      ['var(--orb-violet)','var(--orb-teal)','var(--orb-gold)'],
      ['var(--orb-teal)','var(--orb-magenta)','var(--orb-gold)']
    ];
    const pal = palettes[flowerCount % palettes.length];
    const petals = Array.from({length:8}).map((_,i) => {
      const angle = i * 45;
      const color = pal[i % 2];
      return `<ellipse cx="48" cy="39" rx="12" ry="24" fill="${color}" opacity=".9" transform="rotate(${angle} 48 39)"/>`;
    }).join('');
    return `<svg viewBox="0 0 96 180" width="100%" height="100%" aria-hidden="true">
      <path d="M48 174 C45 132 51 91 48 52" stroke="var(--color-mortar)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g>${petals}</g>
      <circle cx="48" cy="39" r="12" fill="${pal[2]}" opacity=".95"/>
    </svg>`;
  }
  function plant(x){
    if (flowerCount >= MAX_FLOWERS){
      const first = wrap.querySelector('.garden-flower');
      if (first) first.remove();
    } else { flowerCount++; }
    const f = document.createElement('div');
    f.className = 'garden-flower';
    f.style.left = x + 'px';
    f.innerHTML = svgFlower();
    wrap.appendChild(f);
    caption.style.opacity = '0';
    setTimeout(() => {
      caption.textContent = CONFIG.gardenPhrases[phraseIdx % CONFIG.gardenPhrases.length];
      caption.style.opacity = '1';
      phraseIdx++;
    }, 250);
    hint.style.opacity = '0';
  }
  wrap.addEventListener('click', (e) => {
    const rect = wrap.getBoundingClientRect();
    plant(e.clientX - rect.left);
  });
  wrap.addEventListener('keydown', (e) => {
    if (e.key==='Enter' || e.key===' '){ e.preventDefault(); plant(wrap.clientWidth/2 + (Math.random()*80-40)); }
  });
  resetBtn.addEventListener('click', () => {
    $$('.garden-flower', wrap).forEach(f => f.remove());
    flowerCount = 0; hint.style.opacity = ''; caption.textContent = '';
  });
})();

/* ---------- pequenas frases + poesia ---------- */
(function wordsModule(){
  const textEl = $('#wordsText');
  const dotsEl = $('#wordsDots');
  const tabQuotes = $('#tabQuotes');
  const tabPoems = $('#tabPoems');
  if (!textEl) return;
  let mode = 'quotes', idx = 0, autoTimer = null;
  function currentList(){ return mode === 'quotes' ? CONFIG.quotes : CONFIG.poems; }
  function buildDots(){
    dotsEl.innerHTML = '';
    currentList().forEach((_, i) => {
      const d = document.createElement('span');
      if (i===idx) d.classList.add('active');
      d.addEventListener('click', () => { idx=i; render(); resetAuto(); });
      dotsEl.appendChild(d);
    });
  }
  function render(){
    const list = currentList();
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = mode==='quotes' ? ('"' + list[idx] + '"') : list[idx];
      textEl.style.opacity = '1';
      $$('span', dotsEl).forEach((d,i) => d.classList.toggle('active', i===idx));
    }, 300);
  }
  function next(){ idx = (idx+1) % currentList().length; render(); }
  function resetAuto(){ clearInterval(autoTimer); autoTimer = setInterval(next, 6500); }
  function setMode(m){
    mode = m; idx = 0;
    tabQuotes.classList.toggle('active', m==='quotes');
    tabPoems.classList.toggle('active', m==='poems');
    buildDots(); render(); resetAuto();
  }
  tabQuotes.addEventListener('click', () => setMode('quotes'));
  tabPoems.addEventListener('click', () => setMode('poems'));
  buildDots(); render(); resetAuto();
})();

/* ---------- galeria (novo) ---------- */
(function galleryModule(){
  const grid = $('#galleryGrid');
  if (!grid) return;
  const list = Array.isArray(window.GALLERY_ITEMS) ? window.GALLERY_ITEMS : [];
  if (!list.length){
    grid.innerHTML = `<div class="gallery-empty">
      Ainda não há fotos aqui.<br>
      Coloca os ficheiros em <code>assets/gallery/</code> e regista-os em
      <code>assets/gallery/gallery.js</code>.
    </div>`;
    return;
  }
  grid.innerHTML = list.map(item => {
    const source = `assets/gallery/${item.file}`;
    const caption = item.caption || '';
    const isVideo = /\.(mp4|webm|ogg)$/i.test(item.file);
    const media = isVideo
      ? `<video src="${source}" controls preload="metadata" playsinline aria-label="${caption}"></video>`
      : `<img src="${source}" alt="${caption}" loading="lazy">`;
    return `<div class="gallery-item${isVideo ? ' gallery-video' : ''}">
      ${media}
      ${caption ? `<span class="gallery-caption">${caption}</span>` : ''}
    </div>`;
  }).join('');
})();

/* ---------- final ---------- */
(function finalModule(){
  const section = $('#final');
  if (!section) return;
  const petalsG = $('#finalPetals');
  const colors = ['var(--orb-magenta)','var(--orb-violet)','var(--orb-gold)'];
  for (let i=0;i<8;i++){
    const angle = i * 45;
    const p = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
    p.setAttribute('cx','60'); p.setAttribute('cy','40');
    p.setAttribute('rx','7'); p.setAttribute('ry','14');
    p.setAttribute('fill', colors[i % colors.length]);
    p.setAttribute('opacity','.9');
    p.setAttribute('transform', `rotate(${angle} 60 40)`);
    petalsG.appendChild(p);
  }
  let played = false;
  function playSequence(){
    if (played) return;
    played = true;
    ['finalLine1','finalLine2','finalLine3','finalLove','finalSign','finalFooter'].forEach((id, i) => {
      setTimeout(() => $('#'+id).classList.add('show'), 500 + i*900);
    });
    if (!prefersReducedMotion) DustModule.burst(10);
  }
  new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) playSequence(); });
  }, { threshold:0.4 }).observe(section);
})();

/* ---------- música ---------- */
(function musicModule(){
  const fab = $('#musicToggleFab');
  const panel = $('#musicPanel');
  const playBtn = $('#musicPlayPause');
  const audio = $('#bgAudio');
  const barFill = $('#musicBarFill');
  if (!fab) return;
  let playing = false, panelOpen = false;
  fab.addEventListener('click', () => {
    panelOpen = !panelOpen;
    panel.classList.toggle('open', panelOpen);
    fab.setAttribute('aria-expanded', String(panelOpen));
  });
  playBtn.addEventListener('click', () => {
    if (playing){
      audio.pause();
      playBtn.textContent = 'reproduzir';
      playing = false;
      return;
    }
    audio.play().then(() => {
      playBtn.textContent = 'pausar';
      playing = true;
    }).catch(() => {
      ToastModule.show('Adiciona o ficheiro assets/audio/trilha.mp3 para tocar a nossa trilha.');
    });
  });
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) barFill.style.width = (audio.currentTime/audio.duration*100)+'%';
  });
})();

/* ---------- inicialização ---------- */
RevealModule.observeAll();
