import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, Search, ShoppingCart, Phone, ChevronDown, MessageCircle, ShieldCheck, MapPin, CarFront, Headphones, SlidersHorizontal, ChevronLeft, ChevronRight, Plus, Minus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductCard } from '@/components/storefront/product-card';
import { products, categories, filterProducts, basketTotal, money, type Product } from '@/lib/catalogue';
import logo from '@/assets/logo.png.asset.json';
import banner from '@/assets/Details2.jpg.asset.json';
import bannerTwo from '@/assets/details1.jpg.asset.json';
import audi from '@/assets/audia3.jpg.asset.json';
import ranger from '@/assets/searchpopularmodelsfordranger.jpg.asset.json';
import golf from '@/assets/suskitgolf5.jpg.asset.json';

export const Route = createFileRoute('/')({
  head:()=>({meta:[
    {title:'Vuma Auto Spares | Quality parts. Keeping you moving.'},
    {name:'description',content:'Explore Vuma Auto Spares: brake parts, suspension kits, batteries, oils, tools and accessories. Find parts for your vehicle and visit our stores.'},
    {property:'og:title',content:'Vuma Auto Spares | Driving to the future'},
    {property:'og:description',content:'Browse quality auto spares, popular vehicle parts and workshop essentials at Vuma Auto Spares.'},
    {property:'og:type',content:'website'},
    {name:'twitter:card',content:'summary_large_image'},
  ]}),
  component: Index,
});

const whatsapp='https://wa.me/27749040877';
const models:Record<string,string[]>={Volkswagen:['Golf','Jetta','Touran','Passat'],Audi:['A3','A4'],BMW:['X5','X6'],Renault:['Kiger','Triber','Kwid'],Hyundai:['i20'],Chery:['Tiggo'],Toyota:['Starlet'],Suzuki:['Baleno'],Ford:['Ranger']};

function Index() {
  const [query,setQuery]=useState('');
  const [searchCategory,setSearchCategory]=useState('All categories');
  const [activeQuery,setActiveQuery]=useState('');
  const [activeCategory,setActiveCategory]=useState('All categories');
  const [make,setMake]=useState('');
  const [model,setModel]=useState('');
  const [year,setYear]=useState('');
  const [activeMake,setActiveMake]=useState('');
  const [activeModel,setActiveModel]=useState('');
  const [tab,setTab]=useState('Featured products');
  const [slide,setSlide]=useState(0);
  const [selected,setSelected]=useState<Product|null>(null);
  const [basket,setBasket]=useState<Record<string,number>>({});
  const [basketOpen,setBasketOpen]=useState(false);
  const [notice,setNotice]=useState('');
  const basketCount=Object.values(basket).reduce((a,b)=>a+b,0);
  const visibleProducts=filterProducts(activeQuery,activeCategory,activeMake,activeModel).filter(p=>tab!=='New arrivals'||p.badge==='NEW ARRIVAL');
  const isFiltered=activeQuery||activeCategory!=='All categories'||activeMake;
  function scrollTo(id:string) { document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); }
  function browse(category='All categories',search='') { setActiveCategory(category);setActiveQuery(search);setActiveMake('');setActiveModel('');setTab('Featured products');scrollTo('products'); }
  function add(product:Product) { setBasket(b=>({...b,[product.id]:(b[product.id]??0)+1}));setNotice(`${product.name} added to your basket`); }
  function changeQuantity(id:string,amount:number) { setBasket(b=>{const next={...b};const quantity=(next[id]??0)+amount;if(quantity<=0)delete next[id];else next[id]=quantity;return next;}); }
  const enquiry=encodeURIComponent('Hi Vuma Auto Spares, I would like to enquire about:\n'+products.filter(p=>basket[p.id]).map(p=>`${basket[p.id]} × ${p.name}`).join('\n'));

  return <>
    <header>
      <div className="announcement"><div className="wrap"><span>QUALITY AUTO SPARES. LOCAL EXPERTISE. KEEPING YOU MOVING.</span><span className="announcement-secondary">Pretoria West & Mabopane <span className="mx-3">|</span> Driving to the future</span></div></div>
      <div className="masthead"><div className="wrap main-header">
        <a href="/" aria-label="Vuma Auto Spares home"><img className="brand-logo" src={logo.url} alt="Vuma Auto Spares"/></a>
        <form className="search-form" onSubmit={e=>{e.preventDefault();browse(searchCategory,query);}}>
          <input aria-label="Search parts" placeholder="Search parts, brands or your vehicle…" value={query} onChange={e=>setQuery(e.target.value)}/>
          <select aria-label="Search category" value={searchCategory} onChange={e=>setSearchCategory(e.target.value)}><option>All categories</option>{categories.map(c=><option key={c.name}>{c.name}</option>)}</select>
          <Button type="submit" size="icon" className="search-submit" aria-label="Search"><Search size={19}/></Button>
        </form>
        <a href={whatsapp} target="_blank" rel="noreferrer" className="header-action header-help"><Headphones size={24}/><div><small>Need a hand?</small><strong>Talk to our team</strong></div></a>
        <Button variant="ghost" className="header-action" onClick={()=>setBasketOpen(true)} aria-label={`Open basket, ${basketCount} items`}><span className="relative"><ShoppingCart size={24}/><span className="cart-number">{basketCount}</span></span><div className="text-left"><small>Your basket</small><strong>{money(basketTotal(basket))}</strong></div></Button>
      </div></div>
      <nav className="navigation" aria-label="Shop departments"><div className="wrap nav-inner"><div className="nav-links">
        <Button variant="ghost" className="nav-item active" onClick={()=>{browse();window.scrollTo({top:0,behavior:'smooth'});}}>Home</Button>
        {[['Parts','Suspension & Steering'],['Electrical','Starter & Alternator Components'],['Car Care','Car Care & Additives'],['Accessories','Car Accessories'],['Tools','Automotive & DIY Tools']].map(([label,category])=><Button key={label} variant="ghost" className="nav-item" onClick={()=>browse(category)}>{label}<ChevronDown size={12}/></Button>)}
        <Button variant="ghost" className="nav-item" onClick={()=>{browse();setTab('New arrivals');}}>New arrivals</Button>
      </div><a href={whatsapp} target="_blank" rel="noreferrer" className="nav-contact"><Phone size={14} className="text-primary"/>074 904 0877</a></div></nav>
    </header>

    <main>
      <section className="hero" aria-label="Vuma Auto Spares promotions">
        <img className="hero-image" src={slide===0?banner.url:bannerTwo.url} alt={slide===0?'Vuma Auto Spares supporting Bafana Bafana, with auto parts and accessories':'Vuma Auto Spares — driving to the future'}/>
        <div className="wrap hero-content"><div className="eyebrow">Your local auto parts specialists</div><h1>VUMA AUTO SPARES<span>.</span></h1><p>{slide===0?'Quality parts. Local expertise.\nKeeping you moving, on and off the road.':'From everyday essentials to complete suspension kits. Driving to the future, together.'}</p><Button className="hero-cta" onClick={()=>scrollTo('categories')}>SHOP AUTO SPARES <ArrowRight size={16}/></Button></div>
        <div className="hero-controls"><Button variant="ghost" size="icon" className="slide-control" aria-label="Previous promotion" onClick={()=>setSlide(s=>s===0?1:0)}><ChevronLeft/></Button>{[0,1].map(s=><Button key={s} variant="ghost" size="icon" className={`slide-control ${s===slide?'selected':''}`} aria-label={`Show promotion ${s+1}`} onClick={()=>setSlide(s)}>{s+1}</Button>)}<Button variant="ghost" size="icon" className="slide-control" aria-label="Next promotion" onClick={()=>setSlide(s=>s===0?1:0)}><ChevronRight/></Button></div>
      </section>

      <section className="service-strip" aria-label="Why Vuma"><div className="wrap service-inner">
        {[[ShieldCheck,'Quality auto parts','The parts your vehicle deserves'],[CarFront,'All makes & models','Everyday cars to workhorses'],[MapPin,'Two local stores','Pretoria West & Mabopane'],[MessageCircle,'Expert parts advice','Let’s find your perfect fit']].map(([Icon,title,subtitle])=>{const ServiceIcon=Icon as typeof ShieldCheck;return <div className="service-item" key={String(title)}><ServiceIcon/><div><strong>{String(title)}</strong><span>{String(subtitle)}</span></div></div>;})}
      </div></section>

      <section className="vehicle-band"><div className="wrap vehicle-inner"><div className="vehicle-title"><CarFront/><div><h2>Find parts for your vehicle</h2><p>The right part starts with the right fit.</p></div></div><form className="vehicle-form" onSubmit={e=>{e.preventDefault();setActiveCategory('All categories');setActiveQuery('');setActiveMake(make);setActiveModel(model);setTab('Featured products');scrollTo('products');}}>
        <select aria-label="Vehicle make" value={make} onChange={e=>{setMake(e.target.value);setModel('');}} required><option value="">Select make</option>{Object.keys(models).map(m=><option key={m}>{m}</option>)}</select>
        <select aria-label="Vehicle model" value={model} disabled={!make} onChange={e=>setModel(e.target.value)}><option value="">Select model</option>{(models[make]??[]).map(m=><option key={m}>{m}</option>)}</select>
        <select aria-label="Vehicle year" value={year} onChange={e=>setYear(e.target.value)}><option value="">Select year</option>{Array.from({length:33},(_,i)=>2026-i).map(y=><option key={y}>{y}</option>)}</select>
        <Button type="submit" className="vehicle-submit"><Search size={14}/> FIND PARTS</Button>
      </form></div></section>

      <section id="categories" className="wrap store-section"><div className="section-heading"><div><h2>Browse by category</h2><p>Everything you need. All in one place.</p></div><Button variant="link" className="section-link" onClick={()=>browse()}>Shop all parts <ArrowRight size={14}/></Button></div><div className="category-grid">{categories.map(c=><div key={c.name} className="category-card" role="button" tabIndex={0} aria-label={`Browse ${c.name}`} onClick={()=>browse(c.name)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();browse(c.name);}}}><img src={c.image} className="category-image" alt={c.name} loading="lazy"/><div className="category-label"><strong>{c.name}</strong><ArrowRight/></div></div>)}</div></section>

      <section id="products" className="products-section store-section"><div className="wrap"><div className="section-heading"><div><h2>{isFiltered?(activeCategory!=='All categories'?activeCategory:activeMake?`${activeMake} ${activeModel} parts`:'Search results'):'Parts that keep you moving'}</h2><p>{isFiltered?`${visibleProducts.length} products${activeQuery?` for “${activeQuery}”`:''}`:'Popular picks for your next service, repair or upgrade.'}</p></div><Button variant="link" className="section-link" onClick={()=>browse()}>{isFiltered?'Clear filters':'View all products'} {isFiltered?<X size={14}/>:<ArrowRight size={14}/>}</Button></div>
        <div className="product-tabs" role="tablist" aria-label="Product selection">{['Featured products','Suspension kits','New arrivals'].map(t=><Button key={t} role="tab" aria-selected={tab===t} variant="ghost" className={`product-tab ${tab===t?'active':''}`} onClick={()=>{setTab(t);if(t==='Suspension kits'){setActiveCategory('Suspension & Steering');setActiveQuery('');setActiveMake('');setActiveModel('');}}>{t}</Button>)}<span className="ml-auto pb-3 text-[10px] text-muted-foreground flex items-center gap-1 whitespace-nowrap"><SlidersHorizontal size={12}/> {visibleProducts.length} products</span></div>
        {visibleProducts.length>0?<div className="products-grid">{visibleProducts.map(p=><ProductCard key={p.id} product={p} onOpen={setSelected} onAdd={add}/>)}</div>:<div className="empty-results"><h3 className="font-semibold text-foreground mb-2">Looking for something specific?</h3><p>This category’s products aren’t in our showcase yet. Our team can help you find the right part.</p><div className="flex gap-3 mt-5 flex-wrap"><Button asChild><a href={`${whatsapp}?text=${encodeURIComponent(`Hi Vuma, I'm looking for ${activeQuery||activeCategory} ${activeMake} ${activeModel}.`)}`} target="_blank" rel="noreferrer"><MessageCircle/> Ask about a part</a></Button><Button variant="outline" onClick={()=>browse()}>Browse showcase</Button></div></div>}
        <p className="text-[10px] text-muted-foreground mt-6">Showcase catalogue · Reference-store prices shown for illustration. Availability and vehicle compatibility to be confirmed with Vuma.</p>
      </div></section>

      <section className="wrap store-section"><div className="section-heading"><div><h2>Shop popular models</h2><p>Your vehicle. Your parts. Your next adventure.</p></div><Button variant="link" className="section-link" onClick={()=>{document.querySelector<HTMLSelectElement>('[aria-label="Vehicle make"]')?.focus();scrollTo('categories');}}>Find my vehicle <ArrowRight size={14}/></Button></div><div className="models-grid">{[{name:'Volkswagen Golf',query:'Golf',image:golf.url},{name:'Ford Ranger',query:'Ford Ranger',image:ranger.url},{name:'Audi A3',query:'A3',image:audi.url}].map(m=><article className="model-card" key={m.name}><img src={m.image} alt={`Parts for ${m.name}`} loading="lazy"/><Button variant="ghost" className="model-name" onClick={()=>browse('All categories',m.query)}>{m.name}<ArrowRight size={16}/></Button></article>)}</div></section>

      <section className="brand-band" aria-label="Auto brands"><div className="wrap brand-row"><small>PARTS FOR THE BRANDS YOU DRIVE</small>{['VOLKSWAGEN','TOYOTA','FORD','BMW','AUDI','HYUNDAI','NISSAN'].map(b=><span key={b}>{b}</span>)}</div></section>
      <section className="contact-band"><div className="wrap contact-inner"><div><h2>Not sure which part you need?</h2><p>Send our team your vehicle details. We’ll help you find the right fit.</p></div><Button variant="secondary" asChild><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> CHAT WITH US <ArrowRight size={15}/></a></Button></div></section>
    </main>

    <footer className="site-footer"><div className="wrap footer-grid"><div><img src={logo.url} alt="Vuma Auto Spares" className="footer-logo" loading="lazy"/><p>Driving to the future.</p><p>Auto spare parts, lubricants and accessories.<br/>Local people. A passion for keeping you moving.</p></div><div><h3>Shop our range</h3>{categories.slice(0,5).map(c=><Button key={c.name} variant="link" className="footer-link" onClick={()=>browse(c.name)}>{c.name}</Button>)}</div><div><h3>Visit our stores</h3><p className="store-address"><strong>01 / Pretoria West</strong><br/>Pretoria, Gauteng</p><p className="store-address"><strong>02 / Mabopane</strong><br/>Morula View Complex<br/>Mabopane, Gauteng</p></div><div><h3>Let’s talk parts</h3><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp: 074 904 0877</a><a href="tel:+27605458863">Call: 060 545 8863</a><p className="mt-4">All makes. All models.<br/>One team you can count on.</p></div></div><div className="wrap footer-bottom"><span>© 2026 Vuma Auto Spares. All rights reserved.</span><span>Showcase prototype · No payments or orders are processed.</span><span>PROUDLY SOUTH AFRICAN</span></div></footer>
    <Button size="icon" asChild className="whatsapp-float" title="Chat with Vuma on WhatsApp"><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with Vuma on WhatsApp"><MessageCircle size={23}/></a></Button>

    {notice&&<div role="status" className="basket-notice"><Check size={16}/><span>Added to your basket</span><Button variant="link" onClick={()=>{setBasketOpen(true);setNotice('');}}>View basket</Button><Button variant="ghost" size="icon" aria-label="Dismiss notification" onClick={()=>setNotice('')}><X/></Button></div>}

    <Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent>{selected&&<><DialogTitle>{selected.name}</DialogTitle><DialogDescription>{selected.brand} · {selected.id}</DialogDescription><img className="modal-photo" src={selected.image} alt={selected.name}/><div className="flex justify-between items-center"><strong className="text-2xl">{money(selected.price)}</strong><span className="text-xs text-muted-foreground">Reference price</span></div><p className="text-sm text-muted-foreground">Front suspension components for {selected.model}. Kit contents are shown in the product photo. Confirm fitment and availability with our parts team before purchase.</p><Button onClick={()=>{add(selected);setSelected(null);}}><ShoppingCart/> Add to basket</Button><Button variant="outline" asChild><a href={`${whatsapp}?text=${encodeURIComponent(`Hi Vuma, can you help with ${selected.name}?`)}`} target="_blank" rel="noreferrer"><MessageCircle/> Enquire about this part</a></Button></>}</DialogContent></Dialog>
    <Dialog open={basketOpen} onOpenChange={setBasketOpen}><DialogContent><DialogTitle>Your basket <span className="text-muted-foreground">({basketCount})</span></DialogTitle><DialogDescription>Save your selection and enquire with our parts team. No online payment is taken.</DialogDescription>{basketCount===0?<div className="py-8 text-center"><ShoppingCart className="mx-auto mb-4 text-muted-foreground" size={36}/><p>Your basket is empty.</p><Button className="mt-5" onClick={()=>{setBasketOpen(false);browse();}}>Browse parts <ArrowRight/></Button></div>:<><div className="basket-items">{products.filter(p=>basket[p.id]).map(p=><div className="basket-row" key={p.id}><img src={p.image} alt={p.name}/><div><h3>{p.name}</h3><p className="text-sm font-semibold mt-1">{money(p.price)}</p></div><div className="quantity"><Button variant="outline" size="icon" className="quantity-button" aria-label={`Remove one ${p.name}`} onClick={()=>changeQuantity(p.id,-1)}><Minus/></Button><span className="text-xs">{basket[p.id]}</span><Button variant="outline" size="icon" className="quantity-button" aria-label={`Add one ${p.name}`} onClick={()=>changeQuantity(p.id,1)}><Plus/></Button></div></div>)}</div><div className="flex justify-between font-semibold py-3"><span>Illustrative total</span><span>{money(basketTotal(basket))}</span></div><Button asChild><a href={`${whatsapp}?text=${enquiry}`} target="_blank" rel="noreferrer"><MessageCircle/> Enquire on WhatsApp <ArrowRight/></a></Button></>}</DialogContent></Dialog>
  </>;
}
