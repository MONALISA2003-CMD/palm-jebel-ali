/* ============================================================
   animations.js — IntersectionObserver reveals, in-view video autoplay
   ============================================================ */
(function(){
  'use strict';
  var qsa = window.PCUtil.qsa;

  var revealEls = qsa('[data-reveal]');
  revealEls.forEach(function(el, i){
    el.style.setProperty('--reveal-delay', (Math.min(i % 4, 3) * 0.08) + 's');
  });

  if('IntersectionObserver' in window){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function(el){ revealObserver.observe(el); });

    var autoplayVideos = qsa('[data-autoplay-onview]');
    var videoObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var v = entry.target;
        if(entry.isIntersecting){
          v.play().catch(function(){});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.4 });
    autoplayVideos.forEach(function(v){ videoObserver.observe(v); });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }
})();
