/* ============================================================
   gallery.js — masonry lightbox viewer with keyboard + swipe nav
   ============================================================ */
(function(){
  'use strict';
  var qs = window.PCUtil.qs, qsa = window.PCUtil.qsa, trapFocus = window.PCUtil.trapFocus;

  var items = qsa('.masonry__item');
  if(!items.length) return;

  var lightbox = qs('#lightbox');
  var stage = qs('#lightboxStage');
  var caption = qs('#lightboxCaption');
  var closeBtn = qs('#lightboxClose');
  var prevBtn = qs('#lightboxPrev');
  var nextBtn = qs('#lightboxNext');

  var current = 0;
  var releaseFocusTrap = null;
  var lastFocused = null;

  function render(index){
    current = (index + items.length) % items.length;
    var item = items[current];
    var type = item.getAttribute('data-type');
    var src = item.getAttribute('data-src');
    var cap = item.getAttribute('data-caption') || '';

    stage.innerHTML = '';
    if(type === 'video'){
      var video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      stage.appendChild(video);
    } else {
      var img = document.createElement('img');
      img.src = src;
      img.alt = cap;
      stage.appendChild(img);
    }
    caption.textContent = cap;
  }

  function open(index){
    lastFocused = document.activeElement;
    render(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    releaseFocusTrap = trapFocus(lightbox);
    closeBtn.focus();
  }

  function close(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    stage.innerHTML = '';
    if(releaseFocusTrap) releaseFocusTrap();
    if(lastFocused) lastFocused.focus();
  }

  items.forEach(function(item, i){
    item.addEventListener('click', function(){ open(i); });
    var video = qs('video', item);
    if(video){
      item.addEventListener('mouseenter', function(){
        video.play().catch(function(){});
        item.classList.add('is-playing');
      });
      item.addEventListener('mouseleave', function(){
        video.pause();
        video.currentTime = 0;
        item.classList.remove('is-playing');
      });
    }
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function(){ render(current - 1); });
  nextBtn.addEventListener('click', function(){ render(current + 1); });

  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) close();
  });

  document.addEventListener('keydown', function(e){
    if(!lightbox.classList.contains('is-open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') render(current - 1);
    if(e.key === 'ArrowRight') render(current + 1);
  });

  // Basic swipe support
  var touchStartX = null;
  stage.addEventListener('touchstart', function(e){ touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function(e){
    if(touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(dx) > 40){ render(current + (dx < 0 ? 1 : -1)); }
    touchStartX = null;
  }, { passive: true });
})();
