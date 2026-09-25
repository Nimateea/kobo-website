
(function(){
const track=(e,p)=>{try{(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:e},p||{}))}catch(_){}};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CONFIG={waitlistEndpoint:'/api/waitlist',contactEndpoint:'/api/contact'}; // Vercel functions in /api. Set a value to '' for demo mode (simulated success).
async function post(url,payload){if(!url){await new Promise(r=>setTimeout(r,700));return{ok:true,demo:true}}const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'Request failed');return data}
const mb=$('#menu-btn'),mm=$('#mobile-menu');
function menu(o){mm.classList.toggle('hidden',!o);mm.classList.toggle('flex',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');mb.querySelector('.i-menu').classList.toggle('hidden',o);mb.querySelector('.i-x').classList.toggle('hidden',!o)}
mb.addEventListener('click',()=>menu(mb.getAttribute('aria-expanded')!=='true'));
mm.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
const on='text-doly-darker bg-white/90 rounded-full shadow-sm hover:bg-white'.split(' '),off=['text-gray-400','hover:text-white'];
function setActive(id){$$('[data-nav]').forEach(a=>{const act=a.dataset.nav===id;if(a.closest('#mobile-menu')){a.classList.toggle('text-white',act);a.classList.toggle('text-gray-400',!act)}else{on.forEach(c=>a.classList.toggle(c,act));off.forEach(c=>a.classList.toggle(c,!act))}act?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})}
window.__k={track,setActive,post,CONFIG};const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){setActive(e.target.id);track('section_view',{section:e.target.id})}}),{rootMargin:'-40% 0px -55% 0px'});
['home','how-it-works','features','use-cases','security','faq'].forEach(i=>{const el=document.getElementById(i);el&&io.observe(el)});
document.addEventListener('click',e=>{const a=e.target.closest('[data-cta]');if(a)track('cta_click',{cta:a.dataset.cta})});
const cio=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){track('cta_view',{cta:e.target.dataset.cta});o.unobserve(e.target)}}));
$$('[data-cta]').forEach(el=>cio.observe(el));
const revealObserver=new IntersectionObserver((entries,observer)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -8%'});
  const viewElements=$$('body *:not(script):not(style):not(svg):not(path):not(.type-char):not(.type-char *)');
  viewElements.forEach((el,index)=>{if(el.closest('.hero-type')||el.classList.contains('view-reveal'))return;const direction=index%3;el.classList.add('view-reveal');el.style.setProperty('--reveal-delay',`${(index%3)*300}ms`);el.style.setProperty('--reveal-x',direction===0?'-24px':direction===1?'24px':'0');el.style.setProperty('--reveal-y',direction===2?'24px':'0');if(el.getBoundingClientRect().top<innerHeight){el.classList.add('is-visible')}else{revealObserver.observe(el)}});
  document.body.classList.add('reveal-ready');
$$('body h1:not(.hero-type), body h2, body h3, body h4').forEach(el=>{el.classList.add('blur-reveal');revealObserver.observe(el)});
const hero=$('.hero-type');
if(hero){
  let charIndex=0;
  hero.querySelectorAll('[aria-hidden="true"]:not(br)').forEach(line=>{line.innerHTML=[...line.textContent].map(char=>{const span=`<span class="type-char" aria-hidden="true" style="transition-delay:${charIndex*28}ms">${char}</span>`;charIndex++;return span}).join('')});
  revealObserver.observe(hero);
}
const globe=$('#globe');if(globe){globe.classList.add('reveal');revealObserver.observe(globe)}
$$('[aria-label*="conversation" i]').forEach(el=>{el.classList.add('chat-pop');revealObserver.observe(el)});
$$('#faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)track('faq_open',{question:d.querySelector('summary').textContent.trim()})}));
const seen={};addEventListener('scroll',()=>{const p=Math.round(100*(scrollY+innerHeight)/document.documentElement.scrollHeight);[25,50,75,100].forEach(m=>{if(p>=m&&!seen[m]){seen[m]=1;track('scroll_depth',{percent:m})}})},{passive:true});
const submitWaitlist=p=>post(CONFIG.waitlistEndpoint,p);
const f=$('#waitlist-form'),st=$('#wl-status'),btn=$('#wl-btn'),em=$('#wl-email'),cs=$('#wl-consent');
let started=false,busy=false,done=false,last=0;
if(f){f.addEventListener('focusin',()=>{if(!started){started=true;track('waitlist_form_start')}});
const msg=(t,ok)=>{st.textContent=t;st.className='text-xs text-center min-h-[1rem] '+(ok?'text-primary-light':'text-red-400')};
f.addEventListener('submit',async e=>{e.preventDefault();if(busy||done||f.company.value)return;
const v=em.value.trim();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){em.setAttribute('aria-invalid','true');em.focus();track('waitlist_validation_error',{field:'email'});return msg('Please enter a valid email address, like name@example.com.')}
em.removeAttribute('aria-invalid');
if(!cs.checked){cs.focus();track('waitlist_validation_error',{field:'consent'});return msg('Please tick the box so we can email you about early access.')}
if(Date.now()-last<3000)return msg('One moment, then try again.');last=Date.now();
busy=true;btn.disabled=true;btn.textContent='Joining…';track('waitlist_submit');
try{await submitWaitlist({email:v,consent:true});done=true;track('waitlist_success');
f.innerHTML='<div tabindex="-1" id="wl-ok" class="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 text-center"><p class="text-white font-medium mb-1">You\'re on the list.</p><p class="text-gray-400 text-[13px] leading-relaxed">We\'ll email you when early access opens. Meanwhile, <a href="#how-it-works" class="underline hover:text-primary-light">see how Kobo works</a>.</p></div>';$('#wl-ok').focus()}
catch(_){busy=false;btn.disabled=false;btn.textContent='Join the Kobo waitlist';track('waitlist_error');msg("Something went wrong on our side and your email wasn't saved. Please try again in a moment.")}});}
})();
