import { useEffect, useState } from 'react'
import { CATEGORIES, PRODUCTS, COMPANY } from './data/products.js'

const BASE = import.meta.env.BASE_URL

/* ---------- icons ---------- */

const Leaf = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 4C12 4 5 8 4 16c-.2 1.6 0 3 .5 4 .8-4 3.5-8.5 9.5-11-4.5 3.5-7.5 7.5-8.5 11.5 1 .4 2.3.6 3.8.4C17.5 20 20.5 12 20 4Z"
      fill="currentColor"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" fill="currentColor" />
  </svg>
)

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 6h18v12H3V6Zm2 2 7 5 7-5" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
)

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="currentColor" />
  </svg>
)




/* ---------- layout pieces ---------- */

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span className="topbar__lic">{COMPANY.license}</span>
        <div className="topbar__contacts">
          {COMPANY.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, '')}`}><PhoneIcon /> {p}</a>
          ))}
          <a href={`mailto:${COMPANY.email}`}><MailIcon /> {COMPANY.email}</a>
        </div>
      </div>
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    ['#home', 'Home'],
    ['#products', 'Products'],
    ['#about', 'About Us'],
    ['#why', 'Why Meeksha'],
    ['#contact', 'Contact'],
  ]
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__leaf"><Leaf size={30} /></span>
          <span>
            <span className="brand__name">Meeksha</span>
            <span className="brand__tag">{COMPANY.tagline}</span>
          </span>
        </a>
        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}

/* Hero — v1 layout with the catalogue logo, icons and landscape */
function Hero() {
  const values = [
    { img: 'icon-soil.png', title: 'Nourishing Soil', text: 'Healthy soil, bountiful harvest.' },
    { img: 'icon-growth.png', title: 'Empowering Growth', text: 'Innovative solutions for brighter yields.' },
    { img: 'icon-future.png', title: 'Sustaining Future', text: 'Sustainable practices for generations.' },
  ]
  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundImage: `url(${BASE}hero-landscape.jpg)` }}
    >
      <div className="hero__scrim">
        <div className="container hero__inner">
          <img
            className="hero__logo"
            src={`${BASE}meeksha-logo.png`}
            alt="Meeksha — Serving Farmers with Trust"
          />
          <h1>
            Agri <em>Solutions</em> grown for<br />Karnataka&rsquo;s soil
          </h1>
          <p className="hero__motto">{COMPANY.motto}</p>
          <p className="hero__sub">
            Liquid fertilizers, micronutrients and biofertilizers formulated for
            real field conditions — from Narasapura, Kolar to farms across the state.
          </p>
          <div className="hero__cta">
            <a className="btn btn--green" href="#products">Explore products</a>
            <a className="btn btn--outline" href="#contact">Talk to us</a>
          </div>
          <div className="hero__values">
            {values.map((v) => (
              <div className="hval" key={v.title}>
                <img src={`${BASE}${v.img}`} alt="" className="hval__icon" />
                <span>
                  <span className="hval__title">{v.title}</span>
                  <span className="hval__text">{v.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryStrip({ active, onPick }) {
  return (
    <section className="cats" aria-label="Product categories">
      <div className="container">
        <div className="cats__grid">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href="#products"
              className={`catcard ${active === c.id ? 'is-active' : ''}`}
              onClick={() => onPick(c.id)}
            >
              <span className="catcard__leaf"><Leaf /></span>
              <span className="catcard__name">{c.name}</span>
              <span className="catcard__blurb">{c.blurb}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ p, onOpen }) {
  return (
    <article className="card" onClick={() => onOpen(p)} tabIndex={0} role="button"
      aria-label={`View details of ${p.name}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(p) } }}
    >
      <div className="card__media">
        <img src={`${BASE}${p.image}`} alt={p.name} loading="lazy" />
        <span className="card__tag">{p.tag}</span>
      </div>
      <div className="card__body">
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <dl>
          <div><dt>Contents</dt><dd>{p.contents}</dd></div>
          <div><dt>Dosage</dt><dd>{p.dosage}</dd></div>
        </dl>
        <span className="card__more">View details →</span>
      </div>
    </article>
  )
}

function ProductModal({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!p) return null
  const cat = CATEGORIES.find((c) => c.id === p.category)
  return (
    <div className="modal__overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" aria-label="Close" onClick={onClose}>×</button>
        <div className="modal__media">
          <img src={`${BASE}${p.image}`} alt={p.name} />
        </div>
        <div className="modal__body">
          <p className="modal__cat">{cat?.name}</p>
          <h3 id="modal-title">{p.name}</h3>
          <p className="modal__tagline">{p.tag}</p>
          <p className="modal__desc">{p.desc}</p>

          {p.benefits && (
            <>
              <h4>Key benefits</h4>
              <ul className="modal__benefits">
                {p.benefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </>
          )}

          <dl className="modal__specs">
            <div><dt>Contents</dt><dd>{p.contents}</dd></div>
            <div><dt>Dosage</dt><dd>{p.dosage}</dd></div>
            <div><dt>Pack sizes</dt><dd>{COMPANY.packSizes}</dd></div>
          </dl>

          <a className="btn btn--green" href={`tel:${COMPANY.phones[0].replace(/\s/g, '')}`}>
            Call to order — {COMPANY.phones[0]}
          </a>
        </div>
      </div>
    </div>
  )
}

function Products({ active, setActive, onOpen }) {
  const list = active === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)
  return (
    <section id="products" className="products">
      <div className="container">
        <p className="eyebrow">Our range</p>
        <h2>Products</h2>
        <p className="section-lede">
          Tap any product for full details. Every product is available in {COMPANY.packSizes} packs.
        </p>
        <div className="tabs" role="tablist" aria-label="Filter products by category">
          <button
            role="tab"
            aria-selected={active === 'all'}
            className={active === 'all' ? 'is-active' : ''}
            onClick={() => setActive('all')}
          >
            All ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((c) => {
            const n = PRODUCTS.filter((p) => p.category === c.id).length
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                className={active === c.id ? 'is-active' : ''}
                onClick={() => setActive(c.id)}
              >
                {c.name} ({n})
              </button>
            )
          })}
        </div>
        <div className="products__grid">
          {list.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about">
      <div className="container about__grid">
        <div>
          <p className="eyebrow eyebrow--light">About us</p>
          <h2>Rooted in Kolar, built on agronomy</h2>
          <p>
            Meeksha Agro Trading Company supplies quality agricultural inputs to
            farmers across Kolar and Karnataka — liquid fertilizers,
            micronutrients, biofertilizers, growth regulators, bio stimulants
            and organic fertilizers, all selected to nourish the soil first and
            the crop next.
          </p>
          <p>
            We believe good agronomy travels one acre and one litre at a time.
            That is why every recommendation we make starts with the field:
            the crop, its stage, and what the soil actually needs.
          </p>
        </div>
        <aside className="about__card">
          <p className="about__role">Proprietor</p>
          <p className="about__name">{COMPANY.proprietor}</p>
          <p className="about__qual">{COMPANY.proprietorQual}</p>
          <hr />
          <p className="about__addr"><PinIcon /> {COMPANY.address}</p>
        </aside>
      </div>
    </section>
  )
}

function WhyUs() {
  const points = [
    ['Agronomist-led', 'Guidance from a qualified M.Sc (Agriculture) proprietor — not just a price list.'],
    ['Soil-first range', 'Biofertilizers and organic inputs alongside chemistry, so soil health compounds season after season.'],
    ['Licensed & local', 'A licensed fertilizer dealer in Narasapura, Kolar — easy to reach, easy to trust.'],
    ['Every pack size', 'From 250 ml trial packs to 5 L farm packs, for smallholders and estates alike.'],
  ]
  return (
    <section id="why" className="why">
      <div className="container">
        <p className="eyebrow">Why Meeksha</p>
        <h2>Why farmers choose us</h2>
        <div className="why__grid">
          {points.map(([t, d], i) => (
            <div className="why__item" key={t}>
              <span className="why__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__grid">
        <div>
          <p className="eyebrow eyebrow--light">Get in touch</p>
          <h2>Visit us or call — we answer</h2>
          <ul className="contact__list">
            <li><PinIcon /><span>{COMPANY.address}</span></li>
            {COMPANY.phones.map((p) => (
              <li key={p}><PhoneIcon /><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></li>
            ))}
            <li><MailIcon /><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
          </ul>
          <p className="contact__lic">{COMPANY.license}</p>
        </div>
        <div className="contact__mapwrap">
          <iframe
            title="Meeksha Agro Trading Company, Narasapura, Kolar"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1942.674066226241!2d78.004526!3d13.140427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3badfd8af2863aef%3A0x3548ba9da1d14a67!2sMeeksha%20Agro%20Trading%20Company!5e0!3m2!1sen!2sus!4v1787137649761!5m2!1sen!2sus"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen=""
          />
        </div>


      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="brand brand--footer">
          <span className="brand__leaf"><Leaf size={26} /></span>
          <span>
            <span className="brand__name">Meeksha</span>
            <span className="brand__tag">{COMPANY.tagline}</span>
          </span>
        </div>
        <p className="footer__motto">&ldquo;{COMPANY.motto}&rdquo;</p>
        <p className="footer__copy">
          © {new Date().getFullYear()} {COMPANY.name}, Narasapura, Kolar. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const [activeCat, setActiveCat] = useState('all')
  const [openProduct, setOpenProduct] = useState(null)
  return (
    <div className="frame">
      <TopBar />
      <Nav />
      <main>
        <Hero />
        <CategoryStrip active={activeCat} onPick={setActiveCat} />
        <Products active={activeCat} setActive={setActiveCat} onOpen={setOpenProduct} />
        <About />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      {openProduct && (
        <ProductModal p={openProduct} onClose={() => setOpenProduct(null)} />
      )}
    </div>
  )
}
