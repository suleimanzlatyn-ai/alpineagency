document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links');
  if(menu&&links){
    menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'×':'☰'});
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
  }
  const here=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href')===here)a.setAttribute('aria-current','page')});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window&&!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});revealEls.forEach(el=>observer.observe(el))}
  else revealEls.forEach(el=>el.classList.add('visible'));
  if(!document.querySelector('.scroll-progress')){const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.prepend(bar)}
  let top=document.querySelector('.back-top');
  if(!top){top=document.createElement('a');top.className='back-top';top.href='#top';top.setAttribute('aria-label','Back to top');top.textContent='↑';document.body.appendChild(top)}
  const progress=document.querySelector('.scroll-progress');
  const updateScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const pct=max>0?(window.scrollY/max)*100:0;if(progress)progress.style.width=pct+'%';if(top)top.classList.toggle('show',window.scrollY>500)};
  window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();
  document.querySelectorAll('[data-tilt]').forEach(card=>{
    card.addEventListener('pointermove',e=>{if(reduced||e.pointerType==='touch')return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1000px) rotateY('+(x*3.5)+'deg) rotateX('+(-y*3.5)+'deg) translateY(-5px)'});
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
  const form=document.querySelector('[data-mailto-form]');
  if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form),subject=encodeURIComponent('Website enquiry — Alpine Agencies'),body=encodeURIComponent('Name: '+d.get('name')+'\nOrganisation: '+(d.get('organisation')||'Not provided')+'\nEmail: '+d.get('email')+'\nPhone: '+(d.get('phone')||'Not provided')+'\nService: '+d.get('service')+'\n\nMessage:\n'+d.get('message'));window.location.href='mailto:ops@alpineagencies.co.ke?subject='+subject+'&body='+body;const status=form.querySelector('[role=status]');if(status)status.textContent='Your email app should open with your enquiry prepared. Please send it to complete your request.'});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const target=document.querySelector(a.getAttribute('href'));if(target)target.setAttribute('tabindex','-1')}));
});