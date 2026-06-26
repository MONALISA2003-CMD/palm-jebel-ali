/* ============================================================
   utilities.js — shared helpers (no dependencies, attached to window.PCUtil)
   ============================================================ */
(function(){
  'use strict';

  function qs(sel, ctx){ return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function debounce(fn, wait){
    var t;
    return function(){
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function(){ fn.apply(ctx, args); }, wait);
    };
  }

  function throttle(fn, wait){
    var last = 0, queued;
    return function(){
      var now = Date.now(), args = arguments, ctx = this;
      if(now - last >= wait){
        last = now;
        fn.apply(ctx, args);
      } else if(!queued){
        queued = setTimeout(function(){
          last = Date.now();
          queued = null;
          fn.apply(ctx, args);
        }, wait - (now - last));
      }
    };
  }

  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value){
    return /^[+\d][\d\s-]{6,18}$/.test(value.trim());
  }

  function trapFocus(container){
    var focusable = qsa('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])', container);
    if(!focusable.length) return function(){};
    var first = focusable[0], last = focusable[focusable.length - 1];
    function handler(e){
      if(e.key !== 'Tab') return;
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault(); last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault(); first.focus();
      }
    }
    container.addEventListener('keydown', handler);
    return function(){ container.removeEventListener('keydown', handler); };
  }

  window.PCUtil = {
    qs: qs,
    qsa: qsa,
    debounce: debounce,
    throttle: throttle,
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    trapFocus: trapFocus
  };
})();
