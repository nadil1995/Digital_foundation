import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const oneoff = [
  {
    name: 'Starter',
    price: '£349',
    period: 'one-off payment',
    value: 'Starter — £349',
    popular: false,
    features: [
      '1-page professional website',
      'Domain registration included',
      'Google Workspace business email',
      'Fully mobile responsive',
      'Contact form integration',
      '1 month support included',
    ],
  },
  {
    name: 'Growth',
    price: '£699',
    period: 'one-off payment',
    value: 'Growth — £699',
    popular: true,
    badge: 'Most Popular',
    features: [
      '5-page professional website',
      'Domain + 1 year hosting',
      'M365 or Google Workspace',
      'SEO setup + Google Business',
      'Basic business plan PDF',
      '3 months support included',
    ],
  },
  {
    name: 'Premium',
    price: '£1,299',
    period: 'one-off payment',
    value: 'Premium — £1,299',
    popular: false,
    features: [
      '10-page site + blog',
      'Full email + cloud setup',
      'Investor-ready business plan',
      'Full SEO + social media setup',
      'Logo + brand pack',
      '6 months priority support',
    ],
  },
]

const retainers = [
  {
    name: 'Basic Care',
    price: '£49',
    period: 'per month',
    value: 'Basic Care — £49/mo',
    popular: false,
    features: [
      'Monthly site health check',
      'Security monitoring',
      'Plugin & software updates',
      '2 hours of changes/month',
      'Email support',
    ],
  },
  {
    name: 'Growth Care',
    price: '£99',
    period: 'per month',
    value: 'Growth Care — £99/mo',
    popular: true,
    badge: 'Best Value',
    features: [
      'Everything in Basic Care',
      '5 hours of changes/month',
      'Monthly performance report',
      'SEO monitoring',
      'Priority email & phone support',
      'Quarterly strategy review',
    ],
  },
  {
    name: 'Full Management',
    price: '£199',
    period: 'per month',
    value: 'Full Management — £199/mo',
    popular: false,
    features: [
      'Everything in Growth Care',
      'Unlimited minor changes',
      'Monthly blog or content post',
      'Social media management',
      'Dedicated account manager',
      'Same-day support response',
    ],
  },
]

function PricingCard({ card, onSelect, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`pricing-card${card.popular ? ' popular' : ''} reveal${delay ? ` delay-${delay}` : ''}`}>
      {card.badge && <div className="pricing-badge">{card.badge}</div>}
      <div className="pricing-name">{card.name}</div>
      <div className="pricing-price">{card.price}</div>
      <div className="pricing-period">{card.period}</div>
      <div className="pricing-divider" />
      <ul className="feature-list">
        {card.features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <button
        className={`pricing-cta ${card.popular ? 'cta-primary' : 'cta-secondary'}`}
        onClick={() => onSelect(card.value)}
      >
        Get {card.name}
      </button>
    </div>
  )
}

export default function Pricing({ onSelect }) {
  const [tab, setTab] = useState('oneoff')

  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()
  const toggleRef = useScrollReveal()

  const plans = tab === 'oneoff' ? oneoff : retainers

  return (
    <section id="pricing">
      <div className="container">
        <div ref={labelRef} className="section-label reveal">Pricing</div>
        <h2 ref={titleRef} className="section-title reveal delay-1">
          Transparent pricing.<br />No surprises.
        </h2>
        <p ref={subRef} className="section-sub reveal delay-2">
          Choose a one-off setup package or an ongoing monthly retainer. Everything you need, nothing you don't.
        </p>

        <div ref={toggleRef} className="pricing-toggle reveal delay-3">
          <button
            className={`toggle-btn${tab === 'oneoff' ? ' active' : ''}`}
            onClick={() => setTab('oneoff')}
          >
            One-off Setup
          </button>
          <button
            className={`toggle-btn${tab === 'retainer' ? ' active' : ''}`}
            onClick={() => setTab('retainer')}
          >
            Monthly Retainer
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((card, i) => (
            <PricingCard key={card.name} card={card} onSelect={onSelect} delay={i > 0 ? i : null} />
          ))}
        </div>
      </div>
    </section>
  )
}
