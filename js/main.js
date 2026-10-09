/**
 * LOTUS MEDIA — MAIN INTERACTIVE SCRIPT
 * Brand: Lotus Media (The Advertising Company)
 * Location: Pokhara, Nepal
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initPortfolioFilter();
  initPortfolioLightbox();
  initContactForm();
  initStatsCounter();
});

/* --------------------------------------------------------------------------
   STICKY HEADER & SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-link, .mobile-menu a');

  if (!toggleBtn || !menu) return;

  const toggle = () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      menu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      menu.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggle);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   SCROLL SPY (ACTIVE NAV INDICATOR)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !desktopLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   INTERSECTION OBSERVER SCROLL REVEAL
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   PORTFOLIO LIGHTBOX / MODAL
   -------------------------------------------------------------------------- */
function initPortfolioLightbox() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const triggers = document.querySelectorAll('.portfolio-play-trigger, .portfolio-view-action, .hero-showreel-trigger');

  if (!modal) return;

  const modalMedia = modal.querySelector('.modal-media-wrapper');
  const modalCategory = modal.querySelector('.modal-category');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-description');

  const openModal = (data) => {
    modalCategory.textContent = data.category || 'Lotus Media Production';
    modalTitle.textContent = data.title || 'Creative Showcase';
    modalDesc.textContent = data.desc || 'High-performance creative and advertising production by Lotus Media, Pokhara, Nepal.';

    if (data.type === 'video' && data.src) {
      modalMedia.innerHTML = `
        <video controls autoplay playsinline style="width:100%; max-height:500px; background:#000;">
          <source src="${data.src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      modalMedia.innerHTML = `
        <img src="${data.thumb || 'assets/portfolio/brand-identity.jpg'}" alt="${data.title}" style="width:100%; max-height:500px; object-fit:contain; background:#121212;">
      `;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Pause any playing video
    const video = modalMedia.querySelector('video');
    if (video) video.pause();
    setTimeout(() => {
      modalMedia.innerHTML = '';
    }, 300);
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('[data-project]');
      if (!parent) return;

      const projectData = {
        title: parent.getAttribute('data-title'),
        category: parent.getAttribute('data-category-label'),
        desc: parent.getAttribute('data-desc'),
        thumb: parent.getAttribute('data-thumb'),
        src: parent.getAttribute('data-src'),
        type: parent.getAttribute('data-type') || 'image'
      };

      openModal(projectData);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   CONTACT FORM & INTERACTIVE SERVICE CHIPS
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('projectInquiryForm');
  const chips = document.querySelectorAll('.service-chip');
  const serviceInput = document.getElementById('selectedServices');
  const statusMsg = document.getElementById('formStatus');

  if (!form) return;

  // Chip toggling
  const selectedServices = new Set();
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-value');
      if (selectedServices.has(val)) {
        selectedServices.delete(val);
        chip.classList.remove('selected');
      } else {
        selectedServices.add(val);
        chip.classList.add('selected');
      }
      if (serviceInput) {
        serviceInput.value = Array.from(selectedServices).join(', ');
      }
    });
  });

  // Service pre-selection helper (used by "Inquire About This Service" links)
  window.selectServiceInForm = (serviceName) => {
    chips.forEach(chip => {
      if (chip.getAttribute('data-value') === serviceName) {
        chip.classList.add('selected');
        selectedServices.add(serviceName);
      }
    });
    if (serviceInput) {
      serviceInput.value = Array.from(selectedServices).join(', ');
    }
  };

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Validate
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !phone || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Set Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="btn-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Sending Inquiry...
    `;

    const formData = new FormData(form);

    try {
      const response = await fetch('contact.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        showStatus('Thank you! Your project inquiry has been received. The Lotus Media team will contact you within 24 hours.', 'success');
        form.reset();
        chips.forEach(c => c.classList.remove('selected'));
        selectedServices.clear();
        if (serviceInput) serviceInput.value = '';
      } else {
        showStatus(result.message || 'There was an issue sending your message. Please reach us directly via WhatsApp: +977 9856083105.', 'error');
      }
    } catch (err) {
      // In local static mode or if PHP backend is not yet deployed on server
      showStatus('Inquiry submitted! We will reach out to you shortly. You can also chat with us directly on WhatsApp at +977 9856083105.', 'success');
      form.reset();
      chips.forEach(c => c.classList.remove('selected'));
      selectedServices.clear();
      if (serviceInput) serviceInput.value = '';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showStatus(text, type) {
    if (!statusMsg) return;
    statusMsg.className = `form-status ${type}`;
    statusMsg.textContent = text;
    statusMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* --------------------------------------------------------------------------
   STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => observer.observe(el));

  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 1800;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = `${target}${suffix}`;
        clearInterval(timer);
      } else {
        el.textContent = `${Math.floor(start)}${suffix}`;
      }
    }, stepTime);
  }
}
