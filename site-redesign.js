(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const page=location.pathname.split('/').pop()||'index.html',header=$('.header,.site-header'),nav=$('.navlinks,.nav-links'),menu=$('.menu-toggle');
if(header)header.classList.add('js-ready');
if(nav){$$('a',nav).forEach(a=>{if((a.getAttribute('href')||'').split('#')[0]===page){a.setAttribute('aria-current','page');a.classList.add('active')}});
 if(menu){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'×':'☰';document.body.classList.toggle('menu-open',open)});$$('a',nav).forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';document.body.classList.remove('menu-open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';document.body.classList.remove('menu-open')}})}
}
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
if(header){const scroll=()=>header.classList.toggle('scrolled',window.scrollY>12);scroll();window.addEventListener('scroll',scroll,{passive:true})}
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});$$('.reveal').forEach(el=>io.observe(el))}else $$('.reveal').forEach(el=>el.classList.add('visible'));
const serviceSearch=$('[data-service-search]'),serviceCategory=$('[data-service-category-filter]'),serviceCards=$('[data-service-card]');if(serviceCards.length&&(serviceSearch||serviceCategory)){const results=$('[data-service-results]');const applyFilters=()=>{const q=(serviceSearch?.value||'').trim().toLowerCase(),cat=serviceCategory?.value||'all';let n=0;serviceCards.forEach(card=>{const show=(!q||card.textContent.toLowerCase().includes(q))&&(cat==='all'||card.dataset.category===cat);card.hidden=!show;if(show)n++});if(results)results.textContent=n+' service area'+(n===1?'':'s')+' shown'};serviceSearch?.addEventListener('input',applyFilters);serviceCategory?.addEventListener('change',applyFilters);applyFilters()}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){$$('[data-tilt],.service-card,.feature-card,.sector-card').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(1100px) rotateY('+(x*2.6)+'deg) rotateX('+(-y*2.6)+'deg) translateY(-3px)'});el.addEventListener('pointerleave',()=>el.style.transform='')})}
$$('.hero,.page-hero').forEach(hero=>{if(!$('.hero-grid',hero)){const grid=document.createElement('div');grid.className='hero-grid';grid.setAttribute('aria-hidden','true');hero.prepend(grid)}});
if(!$('a.skip-link')){const skip=document.createElement('a');skip.className='skip-link';skip.href='#main';skip.textContent='Skip to content';document.body.prepend(skip)}
if(!$('#main')&&!$('main[id]')){const main=$('main');if(main)main.id='main'}
/* Reading progress and a back-to-top control are available on every page. */
const progress=document.createElement('div');progress.className='site-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
let top=$('.back-top,.site-back-top');if(!top){top=document.createElement('button');top.type='button';top.className='site-back-top';top.setAttribute('aria-label','Back to top');top.textContent='↑';document.body.appendChild(top)}top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'auto':'smooth'}));
let busy=false;const updateScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+'%';top.classList.toggle('show',window.scrollY>500);busy=false};window.addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
/* Global keyboard-accessible site search. */
const pages=[
['Home','index.html','Company overview, featured capabilities and contact'],
['Services','services.html','All service areas and capabilities'],
['Environmental services','environmental-services.html','Environmental strategy and compliance'],
['Environmental consultancy','environmental-consultancy.html','Environmental assessments and planning'],
['Infrastructure','infrastructure.html','Infrastructure and asset lifecycle'],
['Asset infrastructure','asset-infrastructure.html','Asset infrastructure services'],
['Asset maintenance','asset-maintenance.html','Planned maintenance and asset care'],
['Planned maintenance','planned-maintenance.html','Planned inspections and asset care'],
['Engineering maintenance','engineering-maintenance.html','Engineering and maintenance'],
['Water and drainage','water-drainage.html','Water systems, drainage and pollution control'],
['Drainage and environment','drainage-environment.html','Drainage and environmental concerns'],
['Water management','water-management.html','Water and wastewater management'],
['Fuel and energy','fuel-energy.html','Fuel systems and energy infrastructure'],
['Fuel infrastructure','fuel-infrastructure.html','Fuel asset support'],
['Energy infrastructure','energy-infrastructure.html','Energy systems and asset needs'],
['Energy transition','energy-transition.html','Energy transition and resilience'],
['Incident response','incident-response.html','Incident readiness and response'],
['Environmental response','environmental-response.html','Environmental incident support'],
['Emergency guidance','emergency.html','Urgent issue guidance and escalation'],
['Climate resilience','climate-resilience.html','Climate resilience and adaptation'],
['Contaminated land','contaminated-land.html','Site investigation and remediation'],
['Remediation','remediation.html','Remediation and restoration'],
['Health and safety','health-safety.html','Health and safety considerations'],
['Compliance','compliance.html','Compliance planning and documentation'],
['Compliance training','compliance-training.html','Training and awareness'],
['Industries','industries.html','Industries and operating environments'],
['Sectors','sectors.html','Sector-specific requirements'],
['Projects and experience','projects.html','Project approach and verifiable experience'],
['Our approach','approach.html','Process, scope and responsibilities'],
['About Alpine','about.html','Company information and principles'],
['Service network','network.html','Network and delivery coordination'],
['Insights','insights.html','Articles and practical insights'],
['Resources and FAQs','resources.html','Guides and common questions'],
['Resource checklist','resource-checklist.html','Prepare for an initial discussion'],
['Asset maintenance guide','asset-maintenance-guide.html','Asset maintenance planning guide'],
['Environmental risk guide','environmental-risk-guide.html','Environmental risk guide'],
['Climate resilience guide','climate-resilience-guide.html','Climate resilience guide'],
['FAQs','faqs.html','Frequently asked questions'],
['FAQ','faq.html','Questions about services'],
['Procurement','procurement.html','Procurement and supplier enquiries'],
['Request a quote','request-quote.html','Share your project requirement'],
['Contact','contact.html','Phone, email and enquiries'],
['Privacy','privacy.html','Privacy information']
];
const searchButton=document.createElement('button');searchButton.type='button';searchButton.className='site-search-trigger';searchButton.setAttribute('aria-label','Search website');searchButton.innerHTML='<span aria-hidden="true">⌕</span><span class="search-word">Search</span>';
const navHost=header&&$('.nav',header);if(navHost){if($('.nav-cta',navHost))$('.nav-cta',navHost).insertAdjacentElement('afterend',searchButton);else navHost.appendChild(searchButton)}
const overlay=document.createElement('div');overlay.className='site-search-overlay';overlay.hidden=true;overlay.innerHTML='<section class="site-search-dialog" role="dialog" aria-modal="true" aria-labelledby="site-search-title"><div class="site-search-top"><div><div class="eyebrow">Explore Alpine</div><h2 id="site-search-title">What are you looking for?</h2></div><button class="site-search-close" type="button" aria-label="Close search">×</button></div><label class="site-search-field"><span aria-hidden="true">⌕</span><input type="search" autocomplete="off" placeholder="Search services, industries, guides…" aria-label="Search pages"></label><div class="site-search-hint">Use keywords such as drainage, energy, compliance or maintenance.</div><div class="site-search-results" role="listbox" aria-label="Search results"></div><div class="site-search-footer"><span>↑ ↓ to navigate · Enter to open</span><span>ESC to close</span></div></section>';document.body.appendChild(overlay);
const searchInput=$('.site-search-field input',overlay),results=$('.site-search-results',overlay),closeSearch=$('.site-search-close',overlay);let chosen=-1,lastFocus=null;
function drawResults(){const q=searchInput.value.trim().toLowerCase();const found=pages.filter(p=>!q||(p[0]+' '+p[2]+' '+p[1]).toLowerCase().includes(q)).slice(0,12);chosen=found.length?0:-1;results.innerHTML=found.length?found.map((p,i)=>'<a role="option" aria-selected="'+(i===chosen)+'" class="site-search-result" href="'+p[1]+'"><span class="site-search-result-icon">↗</span><span><strong>'+p[0]+'</strong><small>'+p[2]+'</small></span><span class="site-search-result-arrow">↗</span></a>').join(''):'<div class="site-search-empty">No matching pages. Try a broader term or contact Alpine directly.</div>'}
function openSearch(){lastFocus=document.activeElement;overlay.hidden=false;document.body.classList.add('search-open');drawResults();searchInput.value='';drawResults();setTimeout(()=>searchInput.focus(),20)}
function closeSearchNow(){overlay.hidden=true;document.body.classList.remove('search-open');if(lastFocus&&lastFocus.focus)lastFocus.focus()}
searchButton.addEventListener('click',openSearch);closeSearch.addEventListener('click',closeSearchNow);overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearchNow()});searchInput.addEventListener('input',drawResults);searchInput.addEventListener('keydown',e=>{const items=$$('.site-search-result',results);if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!items.length)return;chosen=(chosen+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach((a,i)=>a.setAttribute('aria-selected',String(i===chosen)));items[chosen].scrollIntoView({block:'nearest'})}else if(e.key==='Enter'&&items[chosen]){location.href=items[chosen].getAttribute('href')}});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}if(e.key==='Escape'&&!overlay.hidden)closeSearchNow()});
/* Contact forms prepare an email rather than pretending to submit to a backend. */
$('form[data-email-form],form[data-mailto-form],form[data-mailto],form[data-enquiry-form],form#enquiry-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form),lines=[];data.forEach((v,k)=>lines.push(k+': '+v));const subject=encodeURIComponent('Website enquiry — Alpine Agencies'),body=encodeURIComponent(lines.join('\n'));location.href='mailto:ops@alpineagencies.co.ke?subject='+subject+'&body='+body;const status=$('[data-form-status]',form)||$('[role=status]',form);if(status)status.textContent='Your email app should open with your enquiry prepared. Please send it to complete submission.'}));

/* Service finder: send the visitor to the chosen dedicated page. */
$('form[data-service-finder]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const select=$('select',form),status=$('[data-finder-result]',form);if(!select||!select.value){if(status)status.textContent='Choose a service area to continue.';return}if(status)status.textContent='Opening the selected service page…';location.href=select.value}));
/* Accessible dropdown navigation: works with mouse, touch and keyboard. */
$$('.navdrop>button').forEach(button=>{button.addEventListener('click',e=>{e.preventDefault();const group=button.closest('.navdrop'),open=group.classList.toggle('open');button.setAttribute('aria-expanded',String(open))});button.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();button.closest('.navdrop').classList.add('open');button.setAttribute('aria-expanded','true');const first=$('a',button.nextElementSibling);if(first)first.focus()}})});document.addEventListener('click',e=>{if(!e.target.closest('.navdrop'))$$('.navdrop.open').forEach(group=>{group.classList.remove('open');const b=$('button',group);if(b)b.setAttribute('aria-expanded','false')})});document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.navdrop.open').forEach(group=>{group.classList.remove('open');const b=$('button',group);if(b){b.setAttribute('aria-expanded','false');b.focus()}})});

/* Homepage service finder routes directly to the selected dedicated page. */
const finder=$('[data-service-finder]');if(finder)finder.addEventListener('submit',e=>{e.preventDefault();const select=$('select',finder),status=$('[data-finder-result]',finder);if(select&&select.value){if(status)status.textContent='Opening your selected service area…';location.href=select.value}else if(status)status.textContent='Choose a topic first to find the most relevant page.'});
})();