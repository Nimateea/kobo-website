(function(){
const k=window.__k,track=k.track,$=s=>document.querySelector(s);
k.setActive('contact');track('page_view',{page:'contact'});
const f=$('#contact-form'),st=$('#ct-status'),btn=$('#ct-btn');let busy=false,done=false,started=false;
const msg=(t,ok)=>{st.textContent=t;st.className='text-xs min-h-[1rem] '+(ok?'text-primary-light':'text-red-400')};
f.addEventListener('focusin',()=>{if(!started){started=true;track('contact_form_start')}});
f.addEventListener('submit',async e=>{e.preventDefault();if(busy||done||f.company.value)return;
 const n=f.elements["name"].value.trim(),m=f.email.value.trim(),t=f.message.value.trim(),bad=(el,fld,text)=>{el.setAttribute('aria-invalid','true');el.focus();track('contact_validation_error',{field:fld});msg(text)};
 [f.elements["name"],f.email,f.message].forEach(x=>x.removeAttribute('aria-invalid'));
 if(!n)return bad(f.elements["name"],'name','Please tell us your name.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m))return bad(f.email,'email','Please enter a valid email address, like name@example.com.');
 if(t.length<10)return bad(f.message,'message','Please add a short message (at least 10 characters).');
 if(!$('#ct-consent').checked){$('#ct-consent').focus();track('contact_validation_error',{field:'consent'});return msg('Please tick the box so we can reply to you.')}
 busy=true;btn.disabled=true;btn.textContent='Sending…';track('contact_submit',{topic:f.topic.value});
 try{await k.post(k.CONFIG.contactEndpoint,{name:n,email:m,topic:f.topic.value,message:t});done=true;track('contact_success');
  f.innerHTML='<div tabindex="-1" id="ct-ok" class="text-center py-6"><p class="text-white font-medium mb-1">Thanks, your message is on its way.</p><p class="text-gray-400 text-[13px] leading-relaxed">We\'ll reply to the email address you gave us. In the meantime, <a href="/#faq" class="underline hover:text-primary-light">browse the FAQ</a>.</p></div>';$('#ct-ok').focus()}
 catch(_){busy=false;btn.disabled=false;btn.textContent='Send message';track('contact_error');msg("Something went wrong and your message wasn't sent. Please try again, or email hello@getappkobo.com.")}});
})();
