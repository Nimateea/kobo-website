
(function(){
const k=window.__k,track=k.track,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const home=$('#main'),pages=$('#pages'),views=$$('[data-view]'),foot=$('.footer-bg-custom'),homeTitle=document.title;
let saved=0,navigated=false,current='';
const jump=y=>scrollTo({left:0,top:y,behavior:'instant'});
function viewFor(hs){const key=hs.replace(/^#\/?/,'').replace(/\/+$/,'').replace(/\//g,'-');return key&&views.find(v=>v.dataset.view===key)||null}
function route(){
 const hs=location.hash,v=viewFor(hs);
 if(v){
  if(!current)saved=scrollY;
  current=v.dataset.view;
  home.hidden=true;pages.hidden=false;views.forEach(x=>x.hidden=x!==v);
  document.title=v.dataset.title;k.setActive('');jump(0);
  const h=v.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}
  track('page_view',{page:current});return}
 const was=!!current;current='';
 home.hidden=false;pages.hidden=true;foot.hidden=false;views.forEach(x=>x.hidden=true);document.title=homeTitle;
 let id='';try{id=decodeURIComponent(hs.replace(/^#\/?/,''))}catch(_){}
 const el=id&&document.getElementById(id);
 if(el)el.scrollIntoView({behavior:was?'instant':'smooth'});else if(was)jump(saved);
}
addEventListener('hashchange',()=>{navigated=true;route()});route();
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-back]');
 if(b){e.preventDefault();if(navigated)history.back();else location.hash='#use-cases';return}
 const c=e.target.closest('[data-href]');if(c)location.hash=c.dataset.href;
});
document.addEventListener('keydown',e=>{const c=e.target.closest&&e.target.closest('[data-href]');if(c&&c===e.target&&(e.key==='Enter'||e.key===' ')){e.preventDefault();location.hash=c.dataset.href}});
const skip=$('a[href="#main"]');
if(skip)skip.addEventListener('click',e=>{e.preventDefault();const t=current?$('[data-view]:not([hidden]) h1'):home;if(t){t.tabIndex=-1;t.focus()}});

})();
