/* ============================================================
   forms.js — contact form validation and submission
   ============================================================ */
(function(){
  'use strict';
  var qs = window.PCUtil.qs, isValidEmail = window.PCUtil.isValidEmail, isValidPhone = window.PCUtil.isValidPhone;

  var form = qs('#contactForm');
  if(!form) return;

  var status = qs('#contactStatus');

  function setError(fieldName, message){
    var el = qs('[data-error-for="' + fieldName + '"]');
    if(el) el.textContent = message || '';
  }

  function validate(data){
    var errors = {};
    if(!data.name.trim()) errors.name = 'Please enter your name.';
    if(!data.email.trim()) errors.email = 'Please enter your email.';
    else if(!isValidEmail(data.email)) errors.email = 'Please enter a valid email address.';
    if(!data.phone.trim()) errors.phone = 'Please enter your phone number.';
    else if(!isValidPhone(data.phone)) errors.phone = 'Please enter a valid phone number.';
    return errors;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    ['name','email','phone','message'].forEach(function(f){ setError(f, ''); });

    var data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value
    };

    var errors = validate(data);
    var hasErrors = Object.keys(errors).length > 0;

    if(hasErrors){
      Object.keys(errors).forEach(function(f){ setError(f, errors[f]); });
      status.textContent = 'Please correct the highlighted fields.';
      status.className = 'contact__status is-error';
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // No backend is connected yet. We forward the enquiry to WhatsApp so it
    // reaches the sales team immediately, and keep the structure ready for
    // a real form endpoint to be wired in later.
    setTimeout(function(){
      var message = 'Callback request from ' + data.name + '. Email: ' + data.email +
        '. Phone: ' + data.phone + (data.message ? ('. Message: ' + data.message) : '.');
      var waUrl = 'https://wa.me/256703953711?text=' + encodeURIComponent(message);

      status.textContent = 'Thank you. Your request has been received, opening WhatsApp to confirm the details.';
      status.className = 'contact__status is-success';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request Callback';
      form.reset();

      window.open(waUrl, '_blank', 'noopener');
    }, 600);
  });
})();
