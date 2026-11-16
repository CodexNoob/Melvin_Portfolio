import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, ChefHat, Clock3, Globe2, Mail, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react'
import './styles.css'

const jobs = [
  {
    role: 'Assistant Restaurant Manager', place: 'Jollibee Bayan-Bayanan · Marikina', date: '2025 — 2026', type: 'LEADERSHIP',
    points: ['Supported the daily rhythm of restaurant operations and helped the crew work smoothly together.', 'Guided team members and responded to customer concerns with care and professionalism.'],
  },
  {
    role: 'Service Crew', place: 'The Westin Manila', date: '2024 — 2025', type: 'GUEST EXPERIENCE',
    points: ['Delivered attentive guest assistance and friendly, thoughtful service.', 'Helped customers with orders, questions, and requests.'],
  },
  {
    role: 'Dining Team Leader', place: 'Jollibee Montalban Town Center', date: '2023', type: 'TEAM LEAD',
    points: ['Supervised and supported dining crew through daily restaurant operations.', 'Helped resolve customer concerns and maintain service standards.'],
  },
  {
    role: 'Service Crew', place: 'Timberland Highlands Resort', date: '2022 — 2023', type: 'HOSPITALITY',
    points: ['Assisted guests with orders and inquiries in a welcoming manner.', 'Kept dining areas organized and followed food handling standards.'],
  },
  {
    role: 'Kitchen Staff', place: 'Restaurant operations', date: 'Experience', type: 'FOOD PREPARATION',
    points: ['Prepared and assembled food while maintaining quality standards.', 'Kept kitchen areas clean and followed food safety procedures, including during peak hours.'],
  },
]

const skills = ['Food preparation', 'Customer service', 'Food safety', 'Team leadership', 'Communication', 'Teamwork', 'Problem solving', 'Creativity', 'Guest assistance', 'Kitchen sanitation', 'Working under pressure']
const education = [
  ['Asian Institute of Computer Studies', '2020 — 2022'],
  ['Kasiglahan Village National High School', '2016 — 2020'],
  ['Kasiglahan Village Elementary School', '2013 — 2016'],
]

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['About', '#about'], ['Experience', '#experience'], ['Skills', '#skills'], ['Education', '#education']]
  return <header className="topbar wrap">
    <a className="wordmark" href="#home" aria-label="Melvin Justol home">M<span>.</span>K<span className="wordmark-slash">/</span></a>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
      {links.map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}</a>)}
      <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={14} /></a>
    </nav>
  </header>
}

function Hero() {
  const photo = useRef(null)
  const movePhoto = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 760) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height
    if (photo.current) photo.current.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 6}deg) translateY(-4px)`
  }
  const resetPhoto = () => { if (photo.current) photo.current.style.transform = '' }
  return <section className="hero wrap" id="home">
    <div className="hero-copy">
      <div className="eyebrow reveal-item"><span className="eyebrow-dot" /> SERVICE · HOSPITALITY · PEOPLE</div>
      <h1 className="hero-title"><span className="title-line">A little more</span><span className="title-line title-accent">care<span className="title-period">.</span> in</span><span className="title-line">every detail<span className="title-period">.</span></span></h1>
      <div className="hero-bottom">
        <div className="hero-person"><span className="micro-label">MEET YOUR NEXT TEAMMATE</span><h2>Melvin Ken Justol</h2><p>A thoughtful, hands-on hospitality professional who helps teams and guests feel well looked after.</p></div>
        <a className="circle-link" href="#about" aria-label="Scroll to about Melvin"><ArrowDown size={20} /></a>
      </div>
    </div>
    <div className="hero-visual" onMouseMove={movePhoto} onMouseLeave={resetPhoto}>
      <div className="visual-grid" aria-hidden="true" />
      <div className="portrait-frame" ref={photo}>
        <img src="/melvin-justol.png" alt="Portrait of Melvin Ken Justol" className="portrait-img" />
        <div className="portrait-fallback"><span>MK</span><small>YOUR NEXT<br />TEAMMATE</small></div>
      </div>
      <div className="image-index">FIG. 01 <span>·</span> MELVIN KEN JUSTOL</div>
      <div className="hero-sticker"><Sparkles size={15} /><span>Here to make<br />a difference</span></div>
      <div className="vertical-note">OPEN TO OPPORTUNITIES — 2026</div>
    </div>
    <div className="hero-location"><MapPin size={13} /> RODRIGUEZ, RIZAL <span>PHILIPPINES</span></div>
  </section>
}

function Marquee() {
  const words = ['Good service is a team effort', 'Care in every detail', 'People first, always']
  return <div className="marquee" aria-label="Good service is a team effort"><div className="marquee-track">{[...words, ...words].map((word, i) => <span key={i}>{word}<b>✳</b></span>)}</div></div>
}

function About() {
  return <section className="section about-section" id="about"><div className="wrap">
    <div className="section-top" data-reveal><span className="section-number">01 / ABOUT</span><span className="section-aside">A NOTE ON HOW I WORK</span></div>
    <div className="about-layout">
      <h2 className="about-headline" data-reveal>Good service<br />starts with <em>showing up.</em></h2>
      <div className="about-text" data-reveal><p>I’m a hardworking and responsible team member with experience across restaurants and resort hospitality. I enjoy helping customers, keeping service areas organized, and making sure food is prepared and handled with care.</p><p>I adapt quickly, stay calm when things get busy, and look for ways to support the people around me. I’m eager to keep learning and take on new responsibilities with a team that takes pride in its work.</p><div className="about-facts"><div><strong>4<span>+</span></strong><small>YEARS IN SERVICE</small></div><div><strong>3</strong><small>HOSPITALITY TEAMS</small></div><div><strong>02</strong><small>LANGUAGES</small></div></div></div>
    </div>
  </div></section>
}

function Experience() {
  return <section className="section experience-section" id="experience"><div className="wrap">
    <div className="section-top" data-reveal><span className="section-number">02 / EXPERIENCE</span><span className="section-aside">RESTAURANT · RESORT · GUEST SERVICE</span></div>
    <div className="experience-heading" data-reveal><h2>Every shift<br /><em>adds up.</em></h2><p>Different teams, the same goal:<br />make the experience a little better.</p></div>
    <div className="jobs-list">{jobs.map((job, i) => <article className="job-row" key={job.role + job.place} data-reveal style={{ '--delay': `${i * 65}ms` }}>
      <span className="job-index">0{i + 1}</span><div className="job-main"><div className="job-kicker">{job.type}</div><h3>{job.role}</h3><div className="job-place"><MapPin size={12} /> {job.place}</div></div>
      <div className="job-details"><span className="job-date"><Clock3 size={13} /> {job.date}</span><ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul></div><ArrowUpRight className="job-arrow" size={19} />
    </article>)}</div>
  </div></section>
}

function Skills() {
  return <section className="section skills-section" id="skills"><div className="wrap skills-layout">
    <div className="skills-intro" data-reveal><div className="section-top"><span className="section-number">03 / THE TOOLKIT</span></div><h2>Useful skills.<br /><em>Human touch.</em></h2><p>The practical know-how to keep service moving, with the people skills to make it count.</p><div className="language-note"><Globe2 size={16} /><span>LANGUAGES</span><strong>Filipino</strong><i>·</i><strong>English</strong></div></div>
    <div className="skill-cloud" data-reveal>{skills.map((skill, i) => <span className={`skill-chip ${i === 0 || i === 1 ? 'skill-featured' : ''}`} key={skill}>{i === 0 ? <ChefHat size={15} /> : null}{skill}<ArrowUpRight size={12} className="chip-arrow" /></span>)}</div>
  </div></section>
}

function Education() {
  return <section className="section education-section" id="education"><div className="wrap education-layout">
    <div data-reveal><div className="section-top"><span className="section-number">04 / EDUCATION</span></div><h2>Always<br /><em>learning.</em></h2></div>
    <div className="education-list">{education.map(([school, date], i) => <article className="education-row" key={school} data-reveal style={{ '--delay': `${i * 80}ms` }}><span className="education-index">0{i + 1}</span><div><h3>{school}</h3><span>{date}</span></div><ArrowUpRight size={16} /></article>)}</div>
  </div></section>
}

function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.get('name'), email: form.get('email'), message: form.get('message') }),
      })
      const responseText = await response.text()
      let result = null
      try {
        result = responseText ? JSON.parse(responseText) : null
      } catch {
        result = null
      }
      if (!response.ok) throw new Error(result?.error || `Contact service returned an unexpected response (${response.status}).`)
      if (!result?.ok) throw new Error('Contact service returned an unexpected response. Please try again later.')
      formElement.reset()
      setStatus('success')
    } catch (error) {
      setStatus(error instanceof TypeError
        ? 'Could not connect to the contact service. Make sure the portfolio server is running, then try again.'
        : error.message || 'Could not send your message. Please try again.')
    }
  }

  return <section className="contact-section" id="contact"><div className="wrap contact-inner" data-reveal>
    <div className="contact-label"><span className="eyebrow-dot" /> YOUR NEXT GOOD HIRE COULD BE ONE MESSAGE AWAY</div>
    <h2>Let’s make<br /><em>good things</em> happen.</h2>
    <div className="contact-bottom">
      <div className="contact-intro">
        <p>Looking for a reliable, service-minded addition to your team? Send me a message and let’s talk.</p>
        <h3 className="contact-details-title">CONTACT DETAILS</h3>
        <div className="contact-ways">
          <a className="contact-way" href="mailto:melvinkenj@gmail.com"><Mail size={16} /><span><small>EMAIL</small><strong>melvinkenj@gmail.com</strong></span><ArrowUpRight size={14} /></a>
          <div className="contact-way contact-way-location"><MapPin size={16} /><span><small>ADDRESS</small><strong>Rodriguez Rizal</strong></span></div>
          <a className="contact-way" href="tel:+639511754567"><Phone size={16} /><span><small>PHONE NUMBER</small><strong>09 511754567</strong></span><ArrowUpRight size={14} /></a>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">YOUR NAME</label>
        <input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required />
        <label htmlFor="contact-email">EMAIL ADDRESS</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        <label htmlFor="contact-message">MESSAGE</label>
        <textarea id="contact-message" name="message" rows="4" placeholder="How can I help?" required />
        <button className="email-button" type="submit" disabled={status === 'sending'}><Mail size={16} /> {status === 'sending' ? 'Sending…' : 'Send a message'} <ArrowUpRight size={16} /></button>
        <p className={`form-note ${status === 'success' ? 'form-success' : ''} ${status !== 'idle' && status !== 'sending' && status !== 'success' ? 'form-error' : ''}`} aria-live="polite" role={status !== 'idle' && status !== 'sending' ? 'status' : undefined}>{status === 'success' ? 'Message sent. Thanks for reaching out!' : status === 'idle' ? 'Your message will be emailed directly to Melvin.' : status === 'sending' ? 'Sending your message…' : status}</p>
      </form>
    </div>
    <div className="contact-orbit" aria-hidden="true">MK<span>✳</span></div>
  </div></section>
}

function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-main">
      <a className="wordmark" href="#home" aria-label="Back to top">M<span>.</span>K<span className="wordmark-slash">/</span></a>
      <p>Care in every detail. Service in every moment.</p>
      <a className="footer-top" href="#home">BACK TO TOP <ArrowUpRight size={15} /></a>
    </div>
    <div className="wrap footer-bottom">
      <span>© {new Date().getFullYear()} MELVIN KEN JUSTOL</span>
      <span>HOSPITALITY · FOOD SERVICE · GUEST CARE</span>
    </div>
  </footer>
}

function App() {
  useReveal()
  return <><div className="grain" aria-hidden="true" /><Header /><main><Hero /><Marquee /><About /><Experience /><Skills /><Education /><Contact /></main><Footer /></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
