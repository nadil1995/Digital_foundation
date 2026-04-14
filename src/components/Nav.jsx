import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  function close() { setMenuOpen(false) }

  const links = [
    { href: '#how-it-works',   label: 'How It Works' },
    { href: '#pricing',        label: 'Pricing'       },
    { href: '#addons',         label: 'Add-ons'       },
    { href: '#questionnaire',  label: 'Find My Plan'  },
    { href: '#why',            label: 'Why Us'        },
    { href: '#faq',            label: 'FAQ'           },
  ]

  return (
    <>
      <nav className={`main-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">Setup<span>Desk</span></a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
          <li><a href="#contact" className="btn-gold">Get Started</a></li>
        </ul>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href="#contact" className="btn-gold" onClick={close}>Get Started</a>
      </div>
    </>
  )
}
