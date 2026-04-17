    lucide.createIcons();

    // ===== CUSTOM CURSOR =====
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let isMobile = window.matchMedia('(hover: none)').matches;

    if (!isMobile) {
      document.addEventListener('mousemove', e => {
        dotX = e.clientX; dotY = e.clientY;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
      });

      function animateRing() {
        ringX += (dotX - ringX) * 0.12;
        ringY += (dotY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();

      document.querySelectorAll('a, button, .proj-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
      });
      document.addEventListener('mousedown', () => cursorRing.classList.add('clicked'));
      document.addEventListener('mouseup', () => cursorRing.classList.remove('clicked'));
    } else {
      cursorDot.style.display = 'none';
      cursorRing.style.display = 'none';
      document.body.style.cursor = 'auto';
    }

    // ===== HEADER SCROLL EFFECT =====
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

    // ===== 3D TILT ON CARDS =====
    document.querySelectorAll('.proj-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateZ(6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // ===== MODAL PROJET =====
    const projectModal = document.getElementById('projectModal');
    const previewFrame = document.getElementById('previewFrame');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLink = document.getElementById('modalLink');
    const modalTag = document.getElementById('modalTag');
    const closeProject = document.getElementById('closeProject');

    function openProjectModal(url, title, desc) {
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalLink.href = url;
      previewFrame.src = url;
      const card = document.querySelector(`[data-url="${url}"]`);
      const tagEl = card ? card.querySelector('.card-tag') : null;
      modalTag.textContent = tagEl ? tagEl.textContent : '';
      projectModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeProjectModal() {
      projectModal.classList.remove('open');
      previewFrame.src = '';
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
    const closeAbout = document.getElementById('closeAbout');
    function openAbout() { aboutModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeAboutFn() { aboutModal.classList.remove('open'); document.body.style.overflow = ''; }
    ['openAbout', 'mobileAbout', 'footerAbout'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', e => { e.preventDefault(); openAbout(); });
    });
    closeAbout.addEventListener('click', closeAboutFn);
    aboutModal.addEventListener('click', e => { if (e.target === aboutModal) closeAboutFn(); });

    // ===== MODAL CONTACT =====
    const contactModal = document.getElementById('contactModal');
    const closeContact = document.getElementById('closeContact');
    function openContact() { contactModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeContactFn() { contactModal.classList.remove('open'); document.body.style.overflow = ''; }
    ['openContact', 'mobileContact', 'footerContact'].forEach(id => {
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
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.proj-card, .category').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s`;
      observer.observe(el);
    });