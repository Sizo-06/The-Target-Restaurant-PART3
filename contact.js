document.getElementById('contactForm').addEventListener('submit', async function(e){
  e.preventDefault();
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  let valid = true;

  const name = document.getElementById('cName');
  const email = document.getElementById('cEmail');
  const type = document.getElementById('cType');
  const message = document.getElementById('cMessage');

  // VALIDATION //
  if(name.value.trim().length < 3){ document.getElementById('cNameError').textContent = 'Name required'; valid = false; }
  if(!email.value.includes('@') || !email.value.includes('.')){ document.getElementById('cEmailError').textContent = 'Invalid email format'; valid = false; }
  if(type.value === ''){ document.getElementById('cTypeError').textContent = 'Select message type'; valid = false; }
  if(message.value.trim().length < 10){ document.getElementById('cMessageError').textContent = 'Message must be 10+ characters'; valid = false; }
  if(!valid) return;

  // COMPILE EMAIL //
  const compiledEmail = `
    To: info@targetrestaurant.co.za
    From: ${name.value} <${email.value}>
    Subject: ${type.value}
    Message: ${message.value}
  `;

  //Form Submission via action attribute//
  const formData = new FormData(this);
  try{
    const response = await fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if(response.ok){
      document.getElementById('formSuccess').textContent = 'Thank you! Your message compiled into an email and sent to info@targetrestaurant.co.za';
      this.reset();
    } else {
      document.getElementById('formSuccess').textContent = 'Failed. Please use Formspree ID.';
    }
  } catch(err){
    document.getElementById('formSuccess').textContent = 'Error: ' + err.message;
  }
});