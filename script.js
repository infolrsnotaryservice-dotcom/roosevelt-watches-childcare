const S=window.SITE;
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-email]').forEach(a=>a.href=`mailto:${S.email}`);
document.querySelectorAll('[data-sms]').forEach(a=>a.href=`sms:${S.phone}`);
document.querySelectorAll('[data-email-text]').forEach(a=>{a.href=`mailto:${S.email}`;a.textContent=S.email});
document.querySelectorAll('[data-sms-text]').forEach(a=>{a.href=`sms:${S.phone}`;a.textContent=S.phoneDisplay});
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelector('#question-form').addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget,status=document.querySelector('#form-status');
 const data=Object.fromEntries(new FormData(form).entries());
 // Native FormData requires name attributes, which are set in the HTML.
 if(S.formEndpoint){
  status.textContent='Sending…';
  try{const r=await fetch(S.formEndpoint,{method:'POST',body:JSON.stringify(data),headers:{'Accept':'application/json','Content-Type':'application/json'}});if(!r.ok)throw Error('Could not send');status.textContent='Thank you! Your question has been sent.';form.reset()}
  catch{status.textContent='Unable to send right now. Please email or text us directly.'}
 }else{
  const subject=encodeURIComponent('Roosevelt Watches website question from '+data.name);
  const body=encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nQuestion:\n${data.question}`);
  window.location.href=`mailto:${S.email}?subject=${subject}&body=${body}`;
  status.textContent='Your email app should open with your question ready to send. Please press Send there.';
 }
});
