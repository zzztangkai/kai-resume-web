/* Kai Tang Resume — Vanilla JS
   Replaces: vendor.js (328KB) + custom.js (8KB)
   + lightbox-plus-jquery.min.js (100KB) → ~2KB */

(function () {
  'use strict';

  // Mobile sidebar toggle
  var toggle = document.querySelector('.mobile-toggle');
  var sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    // Close sidebar when clicking a nav link on mobile
    sidebar.querySelectorAll('nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
      });
    });
  }

  // Highlight active nav link based on current page
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar nav a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Lightbox for project images
  var overlay = document.getElementById('lightbox');
  if (overlay) {
    var lbImg = overlay.querySelector('img');
    var lbCaption = overlay.querySelector('.caption');

    document.querySelectorAll('[data-lightbox]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        lbImg.src = this.href;
        lbCaption.textContent = this.dataset.title || '';
        overlay.classList.add('active');
      });
    });

    overlay.addEventListener('click', function (e) {
      if (e.target !== lbImg) {
        overlay.classList.remove('active');
        lbImg.src = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
        lbImg.src = '';
      }
    });
  }

  // Contact form - EmailJS
  var form = document.getElementById('myForm');
  if (form && typeof emailjs !== 'undefined') {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      emailjs.sendForm('service_a7d3mie', 'template_j42qi7g', form).then(
        function () {
          alert('Thanks for your enquiry. I will get back to you as soon as possible. -- Cheers, Kai');
          form.reset();
          btn.disabled = false;
          btn.textContent = 'Submit';
        },
        function () {
          alert('Server busy, please try again later.');
          btn.disabled = false;
          btn.textContent = 'Submit';
        }
      );
    });
  }
})();
