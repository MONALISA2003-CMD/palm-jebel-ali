/* ============================================================
   chatbot.js — premium floating assistant (rule-based)
   ------------------------------------------------------------
   This assistant currently answers from a local knowledge base.
   To connect a real AI backend later, replace the body of
   getResponse() with a call to your API and keep the same
   function signature: getResponse(userText) -> Promise<string>
   ============================================================ */
(function(){
  'use strict';
  var qs = window.PCUtil.qs;

  var toggle = qs('#chatToggle');
  var win = qs('#chatWindow');
  var closeBtn = qs('#chatClose');
  var body = qs('#chatBody');
  var quick = qs('#chatQuick');
  var form = qs('#chatForm');
  var input = qs('#chatInput');

  if(!win) return;

  var KNOWLEDGE = [
    {
      keys: ['price', 'cost', 'how much', 'aed', 'million'],
      answer: 'Prices begin at AED 2.7 Million for a one bedroom residence and range up to AED 18.9 Million for the five bedroom collection. Prices are subject to change, our sales team can confirm the current list.'
    },
    {
      keys: ['payment plan', 'instalment', 'installment', 'pay'],
      answer: 'The payment plan is structured across the construction period: 20% on booking, smaller instalments through to 2029, and a 30% balance on handover in October 2030. Would you like the full schedule sent to you?'
    },
    {
      keys: ['bedroom', 'layout', 'size', 'sqm', 'apartment', 'unit'],
      answer: 'Residences range from one to five bedrooms, between 75 sqm and 470 sqm. Every layout is oriented toward the water.'
    },
    {
      keys: ['location', 'address', 'where', 'map', 'palm jebel ali'],
      answer: 'Palm Central Private Residences sits on Frond N of Palm Jebel Ali, Dubai. You will find the exact map pin in the Location section of this page.'
    },
    {
      keys: ['brochure', 'pdf', 'download'],
      answer: 'I can have the brochure sent straight to you on WhatsApp, just tap the Download Brochure button and our team will share it right away.'
    },
    {
      keys: ['developer', 'nakheel', 'who is building'],
      answer: 'Palm Central is developed by Nakheel, the team behind Palm Jumeirah and much of Dubai\'s waterfront coastline.'
    },
    {
      keys: ['handover', 'completion', 'finish', 'ready'],
      answer: 'Expected handover is 15 October 2030. The project launched on 22 June 2026.'
    },
    {
      keys: ['amenities', 'pool', 'gym', 'beach', 'spa'],
      answer: 'Residents have access to a private beach, an infinity pool, a wellness pavilion, a fitness studio, a landscaped promenade and a dedicated concierge.'
    },
    {
      keys: ['contact', 'callback', 'call me', 'speak', 'sales'],
      answer: 'I can arrange that. Please use the Request Callback form below, or message us directly on WhatsApp and a member of our team will reach out.'
    },
    {
      keys: ['hello', 'hi', 'hey'],
      answer: 'Hello, welcome to Palm Central Private Residences. Ask me about pricing, the payment plan, residence layouts or the location, or request a callback.'
    }
  ];

  var FALLBACK = "I do not have that detail to hand just yet. For anything specific, our sales team can help directly, would you like me to connect you on WhatsApp?";

  var QUICK_PROMPTS = ['Pricing', 'Payment plan', 'Location', 'Request callback'];

  function getResponse(userText){
    var text = userText.toLowerCase();
    for(var i = 0; i < KNOWLEDGE.length; i++){
      var entry = KNOWLEDGE[i];
      for(var j = 0; j < entry.keys.length; j++){
        if(text.indexOf(entry.keys[j]) !== -1){
          return Promise.resolve(entry.answer);
        }
      }
    }
    return Promise.resolve(FALLBACK);
  }
  // Exposed so a future integration can call the same entry point.
  window.PCAssistant = { getResponse: getResponse };

  function addBubble(text, role){
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble chat-bubble--' + role;
    bubble.textContent = text;
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  }

  function renderQuick(){
    quick.innerHTML = '';
    QUICK_PROMPTS.forEach(function(label){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      btn.addEventListener('click', function(){ handleUserMessage(label); });
      quick.appendChild(btn);
    });
  }

  function handleUserMessage(text){
    if(!text.trim()) return;
    addBubble(text, 'user');
    input.value = '';
    if(/callback|call me|contact/i.test(text)){
      addBubble('Taking you to the callback form now.', 'bot');
      setTimeout(function(){
        close();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return;
    }
    getResponse(text).then(function(reply){
      setTimeout(function(){ addBubble(reply, 'bot'); }, 350);
    });
  }

  var opened = false;
  function open(){
    win.classList.add('is-open');
    win.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    if(!opened){
      opened = true;
      addBubble('Hello, welcome to Palm Central Private Residences. How can I help today?', 'bot');
      renderQuick();
    }
    input.focus();
  }
  function close(){
    win.classList.remove('is-open');
    win.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function(){
    win.classList.contains('is-open') ? close() : open();
  });
  closeBtn.addEventListener('click', close);

  form.addEventListener('submit', function(e){
    e.preventDefault();
    handleUserMessage(input.value);
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && win.classList.contains('is-open')) close();
  });
})();
