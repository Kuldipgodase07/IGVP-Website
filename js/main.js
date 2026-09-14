/**
 * DataPhi AI - Web Platform Interactive Scripts
 * Accurate 100% Clone of https://data-phi.ai/
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initHeaderScroll();
  initMobileDrawer();
  initCaseStudiesFilter();
  initIndustryTabs();
  initTestimonialsSlider();
  initModalListeners();
  initActiveNavTabs();
});

/* =====================================================
   1. HERO 5-SLIDE CAROUSEL WITH INTERACTIVE TABS
   ===================================================== */
let currentHeroSlide = 0;
const totalHeroSlides = 5;
let heroSlideTimer = null;
const heroSlideDuration = 6000; // 6 seconds

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const tabs = document.querySelectorAll('.hero-tab-item');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const heroContainer = document.querySelector('.hero-section');

  if (!slides.length || !tabs.length) return;

  function goToHeroSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    tabs.forEach((tab) => tab.classList.remove('active'));

    currentHeroSlide = (index + totalHeroSlides) % totalHeroSlides;

    slides[currentHeroSlide].classList.add('active');
    tabs[currentHeroSlide].classList.add('active');

    // Reset progress animation on active tab
    const progress = tabs[currentHeroSlide].querySelector('.hero-tab-progress');
    if (progress) {
      progress.style.animation = 'none';
      progress.offsetHeight; // Trigger reflow
      progress.style.animation = `heroTabFill ${heroSlideDuration / 1000}s linear forwards`;
    }

    startHeroTimer();
  }

  function startHeroTimer() {
    clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(() => {
      goToHeroSlide(currentHeroSlide + 1);
    }, heroSlideDuration);
  }

  // Click on tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetIndex = parseInt(tab.getAttribute('data-tab'), 10);
      goToHeroSlide(targetIndex);
    });
  });

  // Prev / Next arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToHeroSlide(currentHeroSlide - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToHeroSlide(currentHeroSlide + 1);
    });
  }

  // Pause on hover
  if (heroContainer) {
    heroContainer.addEventListener('mouseenter', () => clearInterval(heroSlideTimer));
    heroContainer.addEventListener('mouseleave', () => startHeroTimer());
  }

  // Initialize first slide timer
  goToHeroSlide(0);
}

/* =====================================================
   2. FLOATING HEADER (HIDE ON SCROLL DOWN, SHOW ON UP)
   ===================================================== */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      // Scrolling down
      header.classList.add('header-hidden');
    } else {
      // Scrolling up or at top
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* =====================================================
   3. MOBILE OFF-CANVAS DRAWER NAVIGATION
   ===================================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('mobileHamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerCloseBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCtaBtn = document.getElementById('mobileDrawerCtaBtn');

  if (!drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  if (mobileCtaBtn) {
    mobileCtaBtn.addEventListener('click', () => {
      closeDrawer();
      openContactModal();
    });
  }
}

/* =====================================================
   4. CASE STUDIES CATEGORY FILTER TABS
   ===================================================== */
function initCaseStudiesFilter() {
  const filterBtns = document.querySelectorAll('#caseStudiesFilterTabs .filter-tab-btn');
  const cards = document.querySelectorAll('#caseStudiesGrid .case-study-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* =====================================================
   4B. INDUSTRY DOMAIN EXPERTISE TABS (IGVP)
   ===================================================== */
const industryData = {
  healthcare: {
    img: 'assets/images/Semi-Government.webp',
    title: 'Building Intelligent Healthcare Systems with Data & AI',
    desc: 'Connect healthcare data, workflows and intelligence to improve operational visibility, enable analytics and support better decision-making.',
    tags: ['• Healthcare AI', '• Healthcare Analytics', '• Data Engineering', '• Intelligent Workflows'],
    ctaText: 'Explore Healthcare →'
  },
  finance: {
    img: 'assets/images/Real-Estate.webp',
    title: 'Transforming Financial Operations with AI and Data',
    desc: 'Modernize reconciliation, settlement, financial analytics, cash forecasting and finance operations through intelligent technology.',
    tags: ['• Finance AI', '• Reconciliation', '• Cash Intelligence', '• Financial Analytics'],
    ctaText: 'Explore Finance →'
  },
  enterprise: {
    img: 'assets/images/Retail.webp',
    title: 'Connecting Enterprise Data, AI and Operations',
    desc: 'Create connected technology environments where data, applications and intelligence work together to improve visibility and decision-making.',
    tags: ['• Enterprise AI', '• Data Platforms', '• Analytics', '• Automation'],
    ctaText: 'Explore Enterprise Solutions →'
  },
  government: {
    img: 'assets/images/Semi-Government.webp',
    title: 'Building Secure and Intelligent Digital Infrastructure',
    desc: 'Design scalable digital platforms that help public-sector organizations improve services, data visibility, security and operational efficiency.',
    tags: ['• Digital Government', '• Data Platforms', '• AI', '• Cybersecurity'],
    ctaText: 'Explore Public Sector →'
  },
  technology: {
    img: 'assets/images/Auto.webp',
    title: 'From Technology Ideas to Scalable Products',
    desc: 'Help technology organizations and emerging ventures design, engineer and scale intelligent digital products.',
    tags: ['• Product Engineering', '• AI', '• Cloud', '• Innovation'],
    ctaText: 'Explore Technology →'
  }
};

function initIndustryTabs() {
  const pill = document.getElementById('industryFilterPill');
  if (!pill) return;
  const btns = pill.querySelectorAll('.ind-tab-btn');
  const imgEl = document.getElementById('indImg');
  const titleEl = document.getElementById('indTitle');
  const descEl = document.getElementById('indDesc');
  const tagsEl = document.getElementById('indTags');
  const ctaEl = document.getElementById('indCtaBtn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const ind = btn.getAttribute('data-ind');
      const data = industryData[ind];
      if (!data) return;

      if (imgEl) imgEl.src = data.img;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => `<span style="color: #94A3B8; font-size: 13px;">${t}</span>`).join('');
      }
      if (ctaEl && data.ctaText) {
        ctaEl.textContent = data.ctaText;
      }
    });
  });
}

/* =====================================================
   5. CLIENT TESTIMONIALS SLIDER
   ===================================================== */
let currentTestiSlide = 0;

function initTestimonialsSlider() {
  const slides = document.querySelectorAll('#testimonialSlides .testimonial-slide');
  const dots = document.querySelectorAll('#testiDots .testi-dot');
  const prevBtn = document.getElementById('testiPrevBtn');
  const nextBtn = document.getElementById('testiNextBtn');

  if (!slides.length) return;

  function showTestiSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentTestiSlide = (index + slides.length) % slides.length;

    slides[currentTestiSlide].classList.add('active');
    if (dots[currentTestiSlide]) {
      dots[currentTestiSlide].classList.add('active');
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showTestiSlide(currentTestiSlide - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showTestiSlide(currentTestiSlide + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-testi'), 10);
      showTestiSlide(idx);
    });
  });

  // Auto rotate testimonials every 9 seconds
  setInterval(() => {
    showTestiSlide(currentTestiSlide + 1);
  }, 9000);
}

/* =====================================================
   6. POPUP CONTACT MODAL & VIDEO MODAL
   ===================================================== */
function initModalListeners() {
  const openBtn = document.getElementById('openContactModalBtn');
  if (openBtn) {
    openBtn.addEventListener('click', openContactModal);
  }

  // Close modals on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeVideoModal();
    }
  });

  // Close on backdrop click
  const contactModal = document.getElementById('contactModal');
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContactModal();
    });
  }

  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }
}

function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openVideoModal(videoId) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  if (modal && iframe) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  if (modal && iframe) {
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* =====================================================
   7. CONTACT FORM SUBMISSION HANDLERS
   ===================================================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const toast = document.getElementById('formToast');
  if (toast) {
    toast.classList.add('active');
    e.target.reset();
    setTimeout(() => {
      toast.classList.remove('active');
    }, 6000);
  }
}

function handleModalSubmit(e) {
  e.preventDefault();
  const toast = document.getElementById('modalToast');
  if (toast) {
    toast.classList.add('active');
    e.target.reset();
    setTimeout(() => {
      toast.classList.remove('active');
      closeContactModal();
    }, 2000);
  }
}


/* =====================================================
   8. LEADERSHIP MODAL DATA & CONTROLLER
   ===================================================== */
const leadersData = {
  shailesh: {
    name: 'Dr. Shailesh Chavan',
    title: 'Founder & Managing Director',
    photo: 'assets/images/Dr-Shailesh-Chavan.jpeg',
    bio: '<p>Dr. Shailesh Chavan is the Founder &amp; Managing Director of IGVP (Indigenous Global Venture Partners Inc.). With years of executive experience across technology, data, analytics, finance, artificial intelligence, and enterprise transformation, he spearheads IGVP’s mission to build intelligent platforms and scalable venture solutions that solve real-world problems.</p><p>Under his vision, IGVP unites AI, data engineering, healthcare intelligence, Edge PKI, digital trust, and technology consulting into transformative, enterprise-grade capabilities for organizations navigating a rapidly changing digital world.</p>'
  },
  bhairavi: {
    name: 'Bhairavi Chavan',
    title: 'CEO & President',
    photo: 'assets/images/Bhairavi-Chavan.jpeg',
    bio: '<p>Bhairavi Chavan serves as the CEO &amp; President at IGVP. She provides executive direction and operational leadership across global initiatives, steering corporate expansion, strategic client partnerships, and platform commercialization.</p><p>She is committed to fostering innovation with intent, building high-performing cross-functional teams, and ensuring IGVP delivers measurable impact, operational resilience, and enduring value to clients and partner ecosystems worldwide.</p>'
  },
  kuldip: {
    name: 'Kuldip Godase',
    title: 'Full Stack Developer & Sales Specialist',
    photo: 'assets/images/Kuldip-Godase.png',
    bio: '<p>Kuldip Godase is a Full Stack Developer &amp; Sales Specialist at IGVP. Combining strong engineering expertise with commercial strategy, he drives end-to-end development of modern web applications, scalable enterprise platforms, and cloud solutions, while actively engaging in technical sales, solution architecture, and strategic client advisory.</p><p>Passionate about crafting seamless user experiences and robust digital infrastructure, Kuldip bridges technical capability with business growth to deliver high-impact value for IGVP clients and partner ecosystems.</p>'
  },
  rajdip: {
    name: 'Rajdip Bankar',
    title: 'Full Stack Developer & Sales Specialist',
    photo: 'assets/images/Rajdip-Bankar.png',
    bio: '<p>Rajdip Bankar is a Full Stack Developer &amp; Sales Specialist at IGVP. Specializing in enterprise full-stack engineering, product development, and client solutioning, he plays a key role in designing responsive digital platforms and accelerating client acquisition.</p><p>With a strong background in modern software engineering and business development, Rajdip works across technology and market engagement to ensure IGVP solutions solve complex challenges and drive tangible commercial outcomes.</p>'
  }
};

function openLeaderModal(id) {
  const leader = leadersData[id];
  const modal = document.getElementById('leaderModal');
  if (!leader || !modal) return;

  document.getElementById('leaderModalImg').src = leader.photo;
  document.getElementById('leaderModalName').textContent = leader.name;
  document.getElementById('leaderModalTitle').textContent = leader.title;
  document.getElementById('leaderModalBio').innerHTML = leader.bio;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLeaderModal() {
  const modal = document.getElementById('leaderModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Add click listener to close leader modal on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const leaderModal = document.getElementById('leaderModal');
  if (leaderModal) {
    leaderModal.addEventListener('click', (e) => {
      if (e.target === leaderModal) closeLeaderModal();
    });
  }
});

/* =====================================================
   9. ACTIVE NAVIGATION TABS & SCROLLSPY
   ===================================================== */
function initActiveNavTabs() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (!navLinks.length) return;

  const currentPath = window.location.pathname;
  const isAboutPage = currentPath.endsWith('about.html');

  // Click listener: highlight clicked tab immediately with the blue indicator
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  if (isAboutPage) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes('about.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  } else {
    // On Home page (index.html)
    const currentHash = window.location.hash || '#home';
    let matchedInitial = false;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentHash || (currentHash === '#home' && href === '#home')) {
        link.classList.add('active');
        matchedInitial = true;
      } else {
        link.classList.remove('active');
      }
    });

    // Scrollspy on home page
    const sections = [
      { id: 'home', hash: '#home' },
      { id: 'services', hash: '#services' },
      { id: 'core-platform', hash: '#platforms' },
      { id: 'platforms', hash: '#platforms' },
      { id: 'industries', hash: '#industries' },
      { id: 'insights', hash: '#insights' },
      { id: 'contact', hash: '#contact' }
    ];

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 200;
      let activeHash = null;

      sections.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            activeHash = sec.hash;
          }
        }
      });

      if (activeHash) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === activeHash) {
            link.classList.add('active');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }
}
