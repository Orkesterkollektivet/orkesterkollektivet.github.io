/**
 * Orkesterkollektivet Main JavaScript
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const faqItems = document.querySelectorAll('.faq__item');
  const heroImage = document.getElementById('heroImage');

  // Hero image pool for random selection
  const heroImages = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.jpg',
    '/images/hero/hero-4.jpg',
    '/images/hero/hero-5.jpg',
    '/images/hero/hero-6.jpg',
    '/images/hero/hero-7.jpg',
    '/images/hero/hero-8.jpg'
  ];

  /**
   * Set random hero background image
   */
  function setRandomHeroImage() {
    if (heroImage && heroImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * heroImages.length);
      heroImage.src = heroImages[randomIndex];
    }
  }

  /**
   * Header scroll effect
   */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  /**
   * Mobile navigation toggle
   */
  function toggleNav() {
    nav.classList.toggle('nav--open');

    // Update aria-expanded
    const isOpen = nav.classList.contains('nav--open');
    navToggle.setAttribute('aria-expanded', isOpen);
  }

  /**
   * Close mobile nav when clicking a link
   */
  function closeNavOnClick(e) {
    if (e.target.classList.contains('nav__link')) {
      nav.classList.remove('nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * FAQ Accordion
   */
  function toggleFaq(e) {
    const item = e.currentTarget.parentElement;
    const isOpen = item.classList.contains('faq__item--open');

    // Close all other items
    faqItems.forEach(faq => {
      faq.classList.remove('faq__item--open');
    });

    // Toggle current item
    if (!isOpen) {
      item.classList.add('faq__item--open');
    }
  }

  /**
   * Smooth scroll for anchor links
   */
  function smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, null, href);
      }
    }
  }

  /**
   * Active nav link based on scroll position
   */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - header.offsetHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('nav__link--active');
      }
    });
  }

  /**
   * Initialize
   */
  function init() {
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateActiveNav);

    // Mobile nav toggle
    if (navToggle) {
      navToggle.addEventListener('click', toggleNav);
    }

    // Close nav on link click
    if (nav) {
      nav.addEventListener('click', closeNavOnClick);
    }

    // FAQ accordion
    faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      if (question) {
        question.addEventListener('click', toggleFaq);
      }
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    // Initial calls
    setRandomHeroImage();
    handleScroll();
    updateActiveNav();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
