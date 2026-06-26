/* ============================================================
   scroll.js — scroll progress fill, hero scroll indicator, loader
   ============================================================ */
(function(){
  'use strict';
  var qs = window.PCUtil.qs, throttle = window.PCUtil.throttle;

  var fill = qs('#frondProgressFill');
  var FILL_LENGTH = 1500; // matches stroke-dasharray in CSS

  function updateProgress(){
    var doc = document.documentElement;
    var scrolled = doc.scrollTop || document.body.scrollTop;
    var max = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    var ratio = max > 0 ? Math.min(1, scrolled / max) : 0;
    if(fill){
      fill.style.strokeDashoffset = String(FILL_LENGTH * (1 - ratio));
    }
  }

  window.addEventListener('scroll', throttle(updateProgress, 30));
  window.addEventListener('load', updateProgress);

  var scrollIndicator = qs('#scrollIndicator');
  if(scrollIndicator){
    scrollIndicator.addEventListener('click', function(){
      var about = document.getElementById('about');
      if(about) about.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Loader: hide once page is ready
  var loader = qs('#loader');
  function hideLoader(){
    if(!loader) return;
    loader.classList.add('is-hidden');
    setTimeout(function(){ loader.style.display = 'none'; }, 700);
  }
  if(document.readyState === 'complete'){
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener('load', function(){ setTimeout(hideLoader, 300); });
  }
  // Safety net in case load event is delayed by heavy video assets
  setTimeout(hideLoader, 3000);

  updateProgress();
})();
