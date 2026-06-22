/* Py-Microgrid website — interactions */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initHeaderState();
    initMobileMenu();
    initSmoothScroll();
    initTabs();
    initCopyButtons();
    initScrollReveal();
    initDiagram();
  });

  /* Diagram nodes: click / keyboard toggles the info card (hover handled by CSS) */
  function initDiagram() {
    var nodes = document.querySelectorAll('.diagram-component, .diagram-center');
    if (!nodes.length) return;

    var closeAll = function () {
      nodes.forEach(function (n) { n.classList.remove('active'); });
    };

    nodes.forEach(function (node) {
      node.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasActive = node.classList.contains('active');
        closeAll();
        if (!wasActive) node.classList.add('active');
      });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.click();
        }
      });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  }

  /* Theme toggle (persisted, respects system preference) */
  function initTheme() {
    var toggle = document.getElementById('theme-toggle');
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');

    apply(theme);

    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        apply(next);
      });
    }

    function apply(t) {
      document.documentElement.setAttribute('data-theme', t);
      var icon = toggle && toggle.querySelector('.theme-icon');
      if (icon) icon.className = (t === 'dark' ? 'fas fa-sun' : 'fas fa-moon') + ' theme-icon';
      if (toggle) toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  /* Add a subtle border/shadow to the header once the page is scrolled */
  function initHeaderState() {
    var header = document.querySelector('.header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile menu */
  function initMobileMenu() {
    var btn = document.querySelector('.mobile-menu-toggle');
    var menu = document.querySelector('.mobile-menu');
    var hamburger = document.querySelector('.hamburger');
    if (!btn || !menu) return;

    var setOpen = function (open) {
      menu.classList.toggle('hidden', !open);
      if (hamburger) hamburger.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', function () {
      setOpen(menu.classList.contains('hidden'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
  }

  /* Smooth scroll for in-page anchors */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* Example tabs (no reliance on the global event object) */
  function initTabs() {
    var tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = tab.getAttribute('data-target');
        document.querySelectorAll('.example-content').forEach(function (c) {
          c.classList.remove('active');
        });
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        var panel = document.getElementById(targetId);
        if (panel) panel.classList.add('active');
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      });
    });
  }

  /* Copy buttons read the code from the adjacent <pre> */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var block = btn.closest('.code-block');
        var code = block && block.querySelector('pre');
        if (!code) return;
        var text = code.innerText;
        var done = function () {
          var original = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.innerHTML = original;
            btn.classList.remove('copied');
          }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () { fallback(text, done); });
        } else {
          fallback(text, done);
        }
      });
    });

    function fallback(text, done) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* no-op */ }
      document.body.removeChild(ta);
    }
  }

  /* Reveal elements on scroll */
  function initScrollReveal() {
    var targets = document.querySelectorAll('.feature-card, .step-card, .stat, .section-header');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    targets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [el];
        var index = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(index, 5) * 70 + 'ms';
        el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }
})();
