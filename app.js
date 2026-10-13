'use strict';
(function () {
  const config = window.MEDINITOR_CONFIG || {};
  const catalog = window.MEDINITOR_CATALOG || [];
  const icons = {
    lab:'<path d="M16 7v9l-8 16h24l-8-16V7M12 7h16M11 26h18"/>',
    pulse:'<path d="M4 21h8l4-9 7 19 4-10h9"/>',
    test:'<rect x="9" y="7" width="23" height="27" rx="5"/><path d="M15 17h11M20.5 11v12M15 28h11"/>',
    molecule:'<circle cx="11" cy="12" r="5"/><circle cx="28" cy="10" r="4"/><circle cx="26" cy="29" r="6"/><path d="m15 11 9-1M14 16l8 9M29 14l-2 9"/>',
    screen:'<rect x="5" y="7" width="30" height="23" rx="4"/><path d="M11 18h5l3-5 4 12 3-7h4M20 30v4M12 34h16"/>',
    heart:'<path d="M20 33S6 24 6 15a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 9-14 18-14 18Z"/><path d="M11 20h6l3-6 4 10 3-4h3"/>',
    cross:'<path d="M15 6h10v9h9v10h-9v9H15v-9H6V15h9V6Z"/>',
    flask:'<path d="M15 6h10M17 6v13L8 32a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3l-9-13V6M13 27h14"/>',
    snow:'<path d="M20 5v30M7 12l26 16M7 28l26-16M15 10l5 5 5-5M15 30l5-5 5 5"/>',
    bed:'<path d="M5 30V12M5 26h30v4M9 19h25a3 3 0 0 1 3 3v4H5v-3a4 4 0 0 1 4-4ZM10 19v-5h8v5M9 30v4M34 30v4"/>',
    package:'<path d="m20 4 14 8v16l-14 8-14-8V12l14-8ZM6 12l14 8 14-8M20 20v16M13 8l14 8"/>',
    home:'<path d="M6 17 20 6l14 11v17H6V17ZM15 34V22h10v12"/>'
  };
  const $ = (id) => document.getElementById(id);
  const all = ['All categories','Diagnostics','Equipment','Laboratory','Care & Supplies'];
  let selected = 'All categories';
  let expanded = false;
  let keyword = '';

  function getMatched() {
    return catalog.filter((c) => {
      const matchesCategory = selected === 'All categories' || c.category === selected;
      const searchable = [c.title,c.desc,c.category,...c.items].join(' ').toLowerCase();
      return matchesCategory && searchable.includes(keyword);
    });
  }
  function buildCard(c) {
    const icon = icons[c.icon] || icons.cross;
    const tags = c.items.slice(0,3).map((s) => '<span>'+escapeHTML(s)+'</span>').join('');
    return `<article class="product-card"><div class="product-card__art product-card__art--${c.category.toLowerCase().replace(/\W+/g,'-')}"><div class="product-card__number">${c.number} / 12</div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg><div class="product-card__orb"></div></div><div class="product-card__body"><div class="product-card__eyebrow">${escapeHTML(c.kicker)}</div><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.desc)}</p><div class="product-card__tags">${tags}</div><button class="product-card__link" type="button" data-enquire="${escapeHTML(c.id)}">Inquire about this category <span aria-hidden="true">↗</span></button></div></article>`;
  }
  function escapeHTML(s) {return String(s).replace(/[&<>"']/g,(v)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));}
  function render() {
    const matched = getMatched();
    const visible = expanded ? matched : matched.slice(0,6);
    $('productGrid').innerHTML = visible.map(buildCard).join('');
    $('catalogCounter').textContent = matched.length + (matched.length === 1 ? ' category':' categories');
    $('emptyState').hidden = matched.length !== 0;
    $('showMore').hidden = matched.length <= 6;
    $('showMore').innerHTML = expanded ? 'Show fewer categories <span aria-hidden="true">↑</span>' : `View all ${matched.length} categories <span aria-hidden="true">↓</span>`;
    document.querySelectorAll('.filter-btn').forEach((el) => {el.classList.toggle('is-active',el.dataset.filter === selected);el.setAttribute('aria-pressed',String(el.dataset.filter===selected));});
  }
  $('filterRow').innerHTML=all.map((f)=>`<button class="filter-btn ${f === selected ? 'is-active':''}" type="button" data-filter="${escapeHTML(f)}" aria-pressed="${f===selected}">${escapeHTML(f)}</button>`).join('');
  $('filterRow').addEventListener('click',(e)=>{const b=e.target.closest('[data-filter]');if(!b)return;selected=b.dataset.filter;expanded=false;render();});
  $('productSearch').addEventListener('input',(e)=>{keyword=e.target.value.trim().toLowerCase();expanded=false;render();});
  $('showMore').addEventListener('click',()=>{expanded=!expanded;render();});
  $('resetSearch').addEventListener('click',()=>{selected='All categories';keyword='';$('productSearch').value='';render();$('productSearch').focus();});
  $('productGrid').addEventListener('click',(e)=>{const btn=e.target.closest('[data-enquire]');if(!btn)return;const item=catalog.find(c=>c.id===btn.dataset.enquire);if(!item)return;$('inquiryType').value=item.category==='Diagnostics'?'Reagent inquiry':'Product sourcing';$('requirement').value='I am interested in '+item.title+'.\nRequested product(s): \nPreferred model / specification: \nQuantity: \nDelivery location (Bangladesh): ';document.getElementById('contact').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('requirement').focus({preventScroll:true}),550);});
  render();
  const email = (config.contactEmail||'').trim();
  if(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    $('businessEmail').href='mailto:'+encodeURIComponent(email);
    $('businessEmail').textContent=email;
    $('inquiryButton').innerHTML='Open email inquiry <span aria-hidden="true">↗</span>';
  }
  $('inquiryForm').addEventListener('submit',async(e)=>{
    e.preventDefault();if(!$('inquiryForm').reportValidity())return;
    const lines=['MediNitor — Business Inquiry','',`Name: ${$('fullName').value.trim()}`,`Organization: ${$('organization').value.trim()||'Not specified'}`,`Email: ${$('replyEmail').value.trim()}`,`Type: ${$('inquiryType').value}`,'','Requirements:', $('requirement').value.trim()];
    const body=lines.join('\n');
    if(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const subject=encodeURIComponent('MediNitor inquiry — '+$('inquiryType').value);
      window.location.href='mailto:'+email+'?subject='+subject+'&body='+encodeURIComponent(body);
      $('formStatus').textContent='Your email application should open with the inquiry. Please review and send it there.';
    }else{
      try{await navigator.clipboard.writeText(body);$('formStatus').textContent='Inquiry copied. Add an official MediNitor email to config.js before publishing so visitors can send this inquiry.';}
      catch(_){$('formStatus').textContent='Clipboard unavailable. Please copy your inquiry text manually and configure a business email before publishing.';}
    }
  });
  const menu=$('menuToggle');const nav=$('mainNav');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.classList.toggle('nav--open',!open);});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('nav--open');}));
  $('year').textContent=new Date().getFullYear();
})();
