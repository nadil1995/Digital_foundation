const links = [
  { href: '#how-it-works',  label: 'How It Works' },
  { href: '#pricing',       label: 'Pricing'       },
  { href: '#addons',        label: 'Add-ons'       },
  { href: '#questionnaire', label: 'Find My Plan'  },
  { href: '#why',           label: 'Why Us'        },
  { href: '#contact',       label: 'Contact'       },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <a href="#hero" className="nav-logo">Setup<span>Desk</span></a>
        <ul className="footer-nav">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <p className="footer-copy">© 2025 SetupDesk.</p>
      </div>
    </footer>
  )
}
