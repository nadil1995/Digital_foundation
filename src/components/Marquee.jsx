const items = [
  'Website Design', 'Business Email Setup', 'Business Plans',
  'Google Workspace', 'Microsoft 365', 'SEO Setup',
  'Logo & Branding', 'E-commerce', 'Pitch Decks', 'Monthly Support',
]

export default function Marquee() {
  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
