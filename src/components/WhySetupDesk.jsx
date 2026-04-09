import useScrollReveal from '../hooks/useScrollReveal'

const floatCards = [
  { icon: '🚀', title: 'Website live',             sub: 'yoursite.co.uk — Online now' },
  { icon: '✉️', title: 'Business email ready',     sub: 'hello@yourbusiness.co.uk' },
  { icon: '📋', title: 'Business plan delivered',  sub: 'Investor-ready PDF · 12 pages' },
  { icon: '⭐', title: '4.9 / 5.0',               sub: null, rating: true },
]

const points = [
  {
    num: '1',
    title: 'IT infrastructure knowledge',
    desc: 'We\'re not just designers — we understand hosting, DNS, email protocols, cloud infrastructure, and security. Your setup is done properly from the ground up.',
  },
  {
    num: '2',
    title: 'UK-focused & GDPR compliant',
    desc: 'All our work follows UK data protection law. Privacy policies, cookie notices, and GDPR-compliant setups are standard practice — not an afterthought.',
  },
  {
    num: '3',
    title: 'Everything under one roof',
    desc: 'Website, email, business plan, branding, SEO — you don\'t need five different agencies. We handle your entire digital foundation so you can focus on growth.',
  },
  {
    num: '4',
    title: 'Ongoing support that actually responds',
    desc: 'We\'re a small, dedicated team — not a faceless corporation. When you message us, a real person who worked on your project responds, usually within hours.',
  },
]

export default function WhySetupDesk() {
  const panelRef = useScrollReveal()
  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()

  const pointRefs = [useScrollReveal(), useScrollReveal(), useScrollReveal(), useScrollReveal()]

  return (
    <section id="why">
      <div className="container">
        <div className="why-grid">
          {/* Floating cards */}
          <div ref={panelRef} className="float-panel reveal">
            {floatCards.map((c, i) => (
              <div key={i} className="float-card">
                <div className="fc-icon">{c.icon}</div>
                <div>
                  <div className="fc-title">{c.title}</div>
                  {c.rating
                    ? <div className="fc-sub"><span className="stars">★★★★★</span>&nbsp; 80+ reviews</div>
                    : <div className="fc-sub">{c.sub}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Points */}
          <div>
            <div ref={labelRef} className="section-label reveal">Why SetupDesk</div>
            <h2 ref={titleRef} className="section-title reveal delay-1">
              Built for UK businesses.<br />Designed to last.
            </h2>
            <ul className="why-points">
              {points.map((p, i) => (
                <li key={p.num} ref={pointRefs[i]} className={`why-point reveal delay-${i + 1}`}>
                  <div className="why-num">{p.num}</div>
                  <div>
                    <div className="why-point-title">{p.title}</div>
                    <p className="why-point-desc">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
