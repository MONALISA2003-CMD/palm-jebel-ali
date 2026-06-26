/* ============================================================
   whatsapp.js — WhatsApp link helper + brochure download buttons
   ============================================================ */
(function(){
  'use strict';
  var qs = window.PCUtil.qs;

  var WHATSAPP_NUMBER = '256703953711';
  var DEFAULT_MESSAGE = "Hello. I'm interested in Palm Central Private Residences. " +
    'Please share the brochure, payment plan and current availability.';

  function buildWhatsAppUrl(message){
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message || DEFAULT_MESSAGE);
  }

  window.PCWhatsApp = { buildWhatsAppUrl: buildWhatsAppUrl };

  // Brochure buttons: a PDF was not supplied with this build, so both buttons
  // route the request straight to WhatsApp with a brochure-specific message.
  // Once a real brochure.pdf is placed in assets/brochure/, swap the handler
  // below for: window.location.href = 'assets/brochure/brochure.pdf'
  function requestBrochure(){
    var url = buildWhatsAppUrl('Hello. Could you please send me the brochure for Palm Central Private Residences, Frond N?');
    window.open(url, '_blank', 'noopener');
  }

  var heroBtn = qs('#heroBrochureBtn');
  var floatBtn = qs('#brochureFloatBtn');
  if(heroBtn) heroBtn.addEventListener('click', requestBrochure);
  if(floatBtn) floatBtn.addEventListener('click', requestBrochure);
})();
