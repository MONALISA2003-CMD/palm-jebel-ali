/* ============================================================
   navigation.js — header glass state, mobile menu, active link
   ============================================================ */
(function(){
  'use strict';
  var qs = window.PCUtil.qs, qsa = window.PCUtil.qsa, throttle = window.PCUtil.throttle;

  var header = qs('#siteHeader');
  var toggle = qs('#navToggle');
  var menu = qs('#navMenu');
  var links = qsa('[data-nav]');
  var sections = links.map(function(a){
    return document.getElementById(a.getAttribute('href').slice(1));
  }).filter(Boolean);

  function onScroll(){
    if(window.scrollY > 40){
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    updateActiveLink();
  }

  function updateActiveLink(){
    var pos = window.scrollY + window.innerHeight * 0.3;
    var current = null;
    sections.forEach(function(sec){
      if(sec.offsetTop <= pos) current = sec.id;
    });
    links.forEach(function(a){
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
    });
  }

  function closeMenu(){
    menu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if(toggle){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  links.forEach(function(a){
    a.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', throttle(onScroll, 80));
  window.addEventListener('resize', throttle(function(){
    if(window.innerWidth > 980) closeMenu();
  }, 150));

  onScroll();
})();
