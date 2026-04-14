import useScrollReveal from '../hooks/useScrollReveal'

const addons = [
  { emoji: '🎨', name: 'Logo & Brand Identity',    price: '£149', value: 'Add-on: Logo & Brand Identity — £149' },
  { emoji: '🛒', name: 'E-commerce Setup',          price: '£299', value: 'Add-on: E-commerce Setup — £299' },
  { emoji: '📊', name: 'Investor Pitch Deck',       price: '£249', value: 'Add-on: Investor Pitch Deck — £249' },
  { emoji: '📱', name: 'Social Media Setup',        price: '£99',  value: 'Add-on: Social Media Setup — £99' },
  { emoji: '📍', name: 'Local SEO Boost',           price: '£149', value: 'Add-on: Local SEO Boost — £149' },
  { emoji: '✉️', name: 'Business Email Migration', price: '£69',  value: 'Add-on: Business Email Migration — £69' },
  { emoji: '🤖', name: 'Chatbot Integration',       price: '£149', value: 'Add-on: Chatbot Integration — £149' },
  { emoji: '📅', name: 'Booking System',            price: '£79',  value: 'Add-on: Booking System — £79' },
]

function AddonCard({ addon, onSelect, delay }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`addon-card reveal${delay ? ` delay-${delay}` : ''}`}
      onClick={() => onSelect(addon.value)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(addon.value)}
    >
      <span className="addon-emoji">{addon.emoji}</span>
      <div className="addon-name">{addon.name}</div>
      <div className="addon-price">{addon.price}</div>
    </div>
  )
}

export default function Addons({ onSelect }) {
  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()

  return (
    <section id="addons">
      <div className="container">
        <div ref={labelRef} className="section-label reveal">Add-ons</div>
        <h2 ref={titleRef} className="section-title reveal delay-1">Enhance your package</h2>
        <p ref={subRef} className="section-sub reveal delay-2">
          Bolt any of these extras onto your package. Click a card to enquire.
        </p>
        <div className="addons-grid">
          {addons.map((a, i) => (
            <AddonCard key={a.name} addon={a} onSelect={onSelect} delay={i % 4 > 0 ? i % 4 : null} />
          ))}
        </div>
      </div>
    </section>
  )
}
