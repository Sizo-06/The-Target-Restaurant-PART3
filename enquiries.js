document.getElementById('enquiryForm').addEventListener('submit', function(e){
  e.preventDefault();
  
  // Reset errors //
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  let valid = true;

  const name = document.getElementById('eName');
  const email = document.getElementById('eEmail');
  const phone = document.getElementById('ePhone');
  const type = document.getElementById('eType');
  const quantity = document.getElementById('eQuantity');

  // CLIENT SIDE VALIDATION //
  if(name.value.trim().length < 3){
    document.getElementById('eNameError').textContent = 'Name must be 3+ letters';
    valid = false;
  }
  if(!email.value.includes('@')){
    document.getElementById('eEmailError').textContent = 'Invalid email';
    valid = false;
  }
  if(!/^[0-9]{10}$/.test(phone.value)){
    document.getElementById('ePhoneError').textContent = 'Phone must be 10 digits';
    valid = false;
  }
  if(type.value === ''){
    document.getElementById('eTypeError').textContent = 'Select enquiry type';
    valid = false;
  }
  if(!valid) return; 

  // PROCESSING //
  let cost = 0;
  let responseText = '';
  const qty = parseInt(quantity.value);

  switch(type.value){
    case 'Catering': cost = qty * 120; responseText = `Catering available for ${qty} guests. Cost: R${cost}. Available this weekend.`; break;
    case 'Menu Products': cost = qty * 85; responseText = `Products available. Estimated cost: R${cost} for ${qty} items.`; break;
    case 'Volunteer': responseText = `Thank you for volunteering! We have shifts available Monday-Saturday 9am-5pm. No cost.`; break;
    case 'Sponsor': responseText = `Sponsorship from R500. We will contact you about availability for branding at our restaurant.`; break;
  }

  const responseBox = document.getElementById('enquiryResponse');
  responseBox.style.display = 'block';
  responseBox.innerHTML = `<h3>Enquiry Processed for ${name.value}</h3><p>${responseText}</p><p>We will email you at ${email.value}</p>`;
});