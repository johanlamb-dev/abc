lucide.createIcons();

// ===== MAGNETIC CURSOR =====
const cursorDot   = document.getElementById('cursorDot');
const cursorTrail = document.getElementById('cursorTrail');
let dotX = 0, dotY = 0, trailX = 0, trailY = 0;
const isMobile = window.matchMedia('(hover: none)').matches;

if (!isMobile) {
  document.addEventListener('mousemove', e => {
    dotX = e.clientX; dotY = e.clientY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top  = dotY + 'px';
  });

  (function animateTrail() {
    trailX += (dotX - trailX) * 0.10;
    trailY += (dotY - trailY) * 0.10;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  })();

  document.querySelectorAll('a, button, .proj-card, .cat-tab, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursorTrail.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorTrail.classList.remove('hovered'));
  });
  document.addEventListener('mousedown', () => cursorTrail.classList.add('clicked'));
  document.addEventListener('mouseup',   () => cursorTrail.classList.remove('clicked'));
} else {
  cursorDot.style.display   = 'none';
  cursorTrail.style.display = 'none';
  document.body.style.cursor = 'auto';
  document.querySelectorAll('button, a').forEach(el => el.style.cursor = 'pointer');
}

// ===== HEADER SCROLL =====
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== BURGER MENU =====
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    burgerBtn.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ===== CATEGORY TABS FILTER =====
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.category').forEach(cat => {
      if (filter === 'all' || cat.id === filter) {
        cat.removeAttribute('data-hidden');
        cat.style.animation = 'none';
        cat.offsetHeight;
        cat.style.animation = '';
      } else {
        cat.setAttribute('data-hidden', 'true');
      }
    });
  });
});

// ===== SUBTLE CARD TILT =====
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(700px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== MODAL PROJET =====
const projectModal = document.getElementById('projectModal');
const previewFrame = document.getElementById('previewFrame');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDesc');
const modalLink    = document.getElementById('modalLink');
const modalTag     = document.getElementById('modalTag');
const closeProject = document.getElementById('closeProject');

function openProjectModal(url, title, desc) {
  modalTitle.textContent = title;
  modalDesc.textContent  = desc;
  modalLink.href         = url;
  previewFrame.src       = url;
  const card  = document.querySelector(`[data-url="${url}"]`);
  const tagEl = card ? card.querySelector('.card-tag') : null;
  modalTag.textContent = tagEl ? tagEl.textContent.toUpperCase() : '';
  projectModal.style.display = 'flex';
  requestAnimationFrame(() => projectModal.classList.add('open'));
  document.body.style.overflow = 'hidden';
}
function closeProjectModal() {
  projectModal.classList.remove('open');
  setTimeout(() => { projectModal.style.display = ''; previewFrame.src = ''; }, 320);
  document.body.style.overflow = '';
}

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.tagName === 'A') return;
    openProjectModal(card.dataset.url, card.dataset.title, card.dataset.desc);
  });
});
document.querySelectorAll('.card-arrow').forEach(arrow => {
  arrow.addEventListener('click', e => {
    e.preventDefault();
    openProjectModal(arrow.dataset.url, arrow.dataset.title, arrow.dataset.desc);
  });
});
closeProject.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', e => { if (e.target === projectModal) closeProjectModal(); });

// ===== MODAL ABOUT =====
const aboutModal = document.getElementById('aboutModal');
const closeAbout  = document.getElementById('closeAbout');
function openAbout()     { aboutModal.style.display = 'flex'; requestAnimationFrame(() => aboutModal.classList.add('open')); document.body.style.overflow = 'hidden'; }
function closeAboutFn()  { aboutModal.classList.remove('open'); setTimeout(() => aboutModal.style.display = '', 320); document.body.style.overflow = ''; }
['openAbout','mobileAbout','footerAbout'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { e.preventDefault(); openAbout(); });
});
closeAbout.addEventListener('click', closeAboutFn);
aboutModal.addEventListener('click', e => { if (e.target === aboutModal) closeAboutFn(); });

// ===== MODAL CONTACT =====
const contactModal = document.getElementById('contactModal');
const closeContact  = document.getElementById('closeContact');
function openContact()    { contactModal.style.display = 'flex'; requestAnimationFrame(() => contactModal.classList.add('open')); document.body.style.overflow = 'hidden'; }
function closeContactFn() { contactModal.classList.remove('open'); setTimeout(() => contactModal.style.display = '', 320); document.body.style.overflow = ''; }
['openContact','mobileContact','footerContact','ctaBandContact'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { e.preventDefault(); openContact(); });
});
closeContact.addEventListener('click', closeContactFn);
contactModal.addEventListener('click', e => { if (e.target === contactModal) closeContactFn(); });

// ===== ESCAPE KEY =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeProjectModal(); closeAboutFn(); closeContactFn(); }
});

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.proj-card, .category').forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .5s ease ${i * 0.035}s, transform .5s ease ${i * 0.035}s`;
  observer.observe(el);
});
