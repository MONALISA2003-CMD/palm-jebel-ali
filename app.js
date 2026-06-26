/* ============================================================
   app.js — bootstraps content that depends on data (explore cards)
   and wires up small cross-cutting interactions
   ============================================================ */
(function(){
  'use strict';
  var qs = window.PCUtil.qs, qsa = window.PCUtil.qsa;

  var PROJECTS = [
    'Palm Jumeirah', 'Dubai Islands', 'The Oasis', 'Dubai Creek Harbour',
    'Emaar Beachfront', 'Sobha Hartland II', 'District One', 'Dubai Hills Estate',
    'Rashid Yachts and Marina', 'DAMAC Lagoons', 'Arabian Ranches III', 'The Valley',
    'Tilal Al Ghaf', 'Bluewaters Island', 'City Walk Residences'
  ];

  var grid = qs('#exploreGrid');
  if(grid){
    PROJECTS.forEach(function(name){
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'explore-card reveal';
      card.setAttribute('data-reveal', '');
      // Architected so a real route can replace this handler per project,
      // e.g. card.dataset.slug = slugify(name); then navigate to /projects/slug
      card.innerHTML = '<span class="explore-card__tag">Coming Soon</span><h3>' + name + '</h3>';
      card.addEventListener('click', function(){
        alert('Project page coming soon.');
      });
      grid.appendChild(card);
    });

    if('IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      qsa('.explore-card', grid).forEach(function(el){ obs.observe(el); });
    } else {
      qsa('.explore-card', grid).forEach(function(el){ el.classList.add('is-visible'); });
    }
  }

  // Any element with data-open-contact scrolls to and focuses the contact form
  qsa('[data-open-contact]').forEach(function(el){
    el.addEventListener('click', function(){
      var contact = document.getElementById('contact');
      if(contact) contact.scrollIntoView({ behavior: 'smooth' });
      setTimeout(function(){
        var nameField = document.getElementById('name');
        if(nameField) nameField.focus();
      }, 600);
    });
  });

  // Mute toggle for lifestyle video
  var muteToggle = qs('[data-video-mute-toggle]');
  if(muteToggle){
    muteToggle.addEventListener('click', function(){
      var video = qs('.lifestyle__video video');
      if(!video) return;
      video.muted = !video.muted;
      muteToggle.classList.toggle('is-on', !video.muted);
    });
  }
})();
