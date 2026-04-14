import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

/* ─── Question tree ────────────────────────────────────────── */
const SITUATIONS = [
  { id: 'new',      emoji: '🆕', label: 'Starting fresh',         sub: 'New business, need everything set up'         },
  { id: 'redesign', emoji: '🔄', label: 'Existing website',        sub: 'Need updates, redesign or new pages'          },
  { id: 'domain',   emoji: '🌐', label: 'Have a domain, no site',  sub: 'Domain purchased, want a website built'       },
  { id: 'email',    emoji: '✉️', label: 'Need business email',     sub: 'Have a website, just need professional email' },
  { id: 'plan',     emoji: '📋', label: 'Business plan / pitch',   sub: 'Need a plan for funding or investors'         },
  { id: 'chatbot',  emoji: '🤖', label: 'Chatbot for my website',  sub: 'Automated chat, lead capture or support bot'  },
]

const FOLLOW_UPS = {
  new: {
    question: 'What type of business?',
    options: [
      { id: 'service',   label: 'Service / Freelance' },
      { id: 'ecommerce', label: 'E-commerce / Shop'   },
      { id: 'hospitality', label: 'Restaurant / Hospitality' },
      { id: 'professional', label: 'Professional / Consultancy' },
      { id: 'other',    label: 'Other'                },
    ],
  },
  redesign: {
    question: 'What platform is your current site on?',
    options: [
      { id: 'wordpress', label: 'WordPress' },
      { id: 'wix',       label: 'Wix'       },
      { id: 'shopify',   label: 'Shopify'   },
      { id: 'other',     label: 'Other'     },
      { id: 'unsure',    label: 'Not sure'  },
    ],
  },
  domain: {
    question: 'Do you have access to your DNS / domain panel?',
    options: [
      { id: 'yes',    label: 'Yes, full access'    },
      { id: 'no',     label: 'No access'           },
      { id: 'unsure', label: 'Not sure what DNS is' },
    ],
  },
  email: {
    question: 'Which email provider do you prefer?',
    options: [
      { id: 'google',  label: 'Google Workspace' },
      { id: 'm365',    label: 'Microsoft 365'    },
      { id: 'migrate', label: 'Migrate existing email' },
      { id: 'unsure',  label: 'Advise me'        },
    ],
  },
  plan: {
    question: "What's the purpose of the business plan?",
    options: [
      { id: 'bank',      label: 'Bank loan / funding' },
      { id: 'investor',  label: 'Investor pitch deck' },
      { id: 'personal',  label: 'Personal roadmap'    },
    ],
  },
  chatbot: {
    question: 'What should the chatbot do?',
    options: [
      { id: 'faq',      label: 'Answer FAQs'       },
      { id: 'leads',    label: 'Capture leads'     },
      { id: 'support',  label: 'Customer support'  },
      { id: 'booking',  label: 'Take bookings'     },
    ],
  },
}

const TIMELINES = [
  { id: 'asap',    label: 'ASAP',           sub: 'Within 48 hours'  },
  { id: 'week',    label: 'This week',      sub: 'Within 7 days'    },
  { id: 'month',   label: 'This month',     sub: 'Within 30 days'   },
  { id: 'explore', label: 'Just exploring', sub: 'No rush right now' },
]

/* ─── Recommendation logic ──────────────────────────────────── */
function getRecommendation(situation, followUp) {
  if (situation === 'chatbot') return {
    package: 'Add-on: Chatbot Integration — £149',
    title: 'Chatbot Integration',
    summary: 'We\'ll build and embed a smart chatbot on your site — FAQ, lead capture, support, or booking flow.',
    extras: ['Recommended base: Growth — £699', 'Chatbot add-on: £149'],
    badge: '🤖',
  }
  if (situation === 'email') return {
    package: 'Add-on: Business Email Migration — £69',
    title: 'Professional Email Setup',
    summary: 'We\'ll set up your business email with Google Workspace or Microsoft 365 — including DNS configuration.',
    extras: ['Google Workspace from £6/user/mo', 'Microsoft 365 from £5/user/mo'],
    badge: '✉️',
  }
  if (situation === 'plan') return {
    package: followUp === 'investor' ? 'Add-on: Investor Pitch Deck — £249' : 'Premium — £1,299',
    title: followUp === 'investor' ? 'Investor Pitch Deck' : 'Business Plan',
    summary: followUp === 'investor'
      ? 'A polished, investor-ready pitch deck with financials, market analysis, and your story.'
      : 'A detailed business plan suitable for bank funding or personal roadmap.',
    extras: ['Included in Premium package', 'Or as a standalone add-on'],
    badge: '📋',
  }
  if (situation === 'domain') return {
    package: 'Growth — £699',
    title: 'Growth Package — Website Build',
    summary: 'Perfect — you have the domain, we\'ll build the site. We\'ll handle DNS, hosting, and get you live.',
    extras: ['DNS setup included', 'Hosting arranged', 'Business email included'],
    badge: '🌐',
  }
  if (situation === 'redesign') return {
    package: 'Growth — £699',
    title: 'Website Redesign / Update',
    summary: followUp === 'wordpress'
      ? 'We\'ll redesign your WordPress site — fresh look, better speed, and updated content.'
      : 'We\'ll review your existing site and rebuild or migrate it to a better platform.',
    extras: ['Content migration included', 'SEO preserved', '3 months support'],
    badge: '🔄',
  }
  // situation === 'new'
  if (followUp === 'ecommerce') return {
    package: 'Premium — £1,299',
    title: 'Premium Package — E-commerce Ready',
    summary: 'A full Shopify or WooCommerce store with payments, inventory, and SEO — ready to sell from day one.',
    extras: ['E-commerce add-on: £299', 'Logo & branding included', '6 months support'],
    badge: '🛒',
  }
  return {
    package: 'Starter — £349',
    title: 'Starter Package',
    summary: 'A professional 1-page website with your domain, business email, and contact form — up in 48 hours.',
    extras: ['Domain included', 'Google Workspace email', '1 month support'],
    badge: '🚀',
  }
}

/* ─── Step components ───────────────────────────────────────── */
function OptionCard({ label, sub, emoji, selected, onClick }) {
  return (
    <button
      className={`q-option${selected ? ' selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      {emoji && <span className="q-option-emoji">{emoji}</span>}
      <div>
        <div className="q-option-label">{label}</div>
        {sub && <div className="q-option-sub">{sub}</div>}
      </div>
    </button>
  )
}

function ProgressBar({ step, total }) {
  return (
    <div className="q-progress">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`q-progress-dot${i < step ? ' done' : i === step ? ' active' : ''}`} />
      ))}
    </div>
  )
}

/* ─── Main component ────────────────────────────────────────── */
export default function Questionnaire({ onSelect }) {
  const [step, setStep]           = useState(0)   // 0=situation 1=followup 2=timeline 3=result
  const [situation, setSituation] = useState(null)
  const [followUp,  setFollowUp]  = useState(null)
  const [timeline,  setTimeline]  = useState(null)

  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()
  const cardRef  = useScrollReveal()

  function handleSituation(id) {
    setSituation(id)
    setStep(1)
  }

  function handleFollowUp(id) {
    setFollowUp(id)
    setStep(2)
  }

  function handleTimeline(id) {
    setTimeline(id)
    setStep(3)
  }

  function reset() {
    setStep(0); setSituation(null); setFollowUp(null); setTimeline(null)
  }

  const rec = step === 3 ? getRecommendation(situation, followUp) : null

  return (
    <>
      <style>{`
        .q-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2.5rem;
          max-width: 780px;
          margin: 0 auto;
        }
        .q-progress {
          display: flex; gap: 8px; margin-bottom: 2rem; align-items: center;
        }
        .q-progress-dot {
          height: 4px; flex: 1; border-radius: 2px;
          background: rgba(201,168,76,0.12);
          transition: background 0.3s;
        }
        .q-progress-dot.done   { background: var(--gold); }
        .q-progress-dot.active { background: rgba(201,168,76,0.5); }

        .q-question {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }
        .q-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        .q-options.single-col { grid-template-columns: 1fr; }

        .q-option {
          display: flex; align-items: center; gap: 0.9rem;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid var(--border);
          border-radius: 11px;
          padding: 1rem 1.2rem;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: var(--text);
          width: 100%;
        }
        .q-option:hover  { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.04); transform: translateY(-2px); }
        .q-option.selected { border-color: var(--gold); background: rgba(201,168,76,0.07); }
        .q-option-emoji { font-size: 1.5rem; flex-shrink: 0; }
        .q-option-label { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.15rem; }
        .q-option-sub   { font-size: 0.75rem; color: var(--muted); line-height: 1.4; }

        /* Timeline grid */
        .q-timeline { display: grid; grid-template-columns: repeat(2,1fr); gap:0.85rem; }

        /* Result card */
        .q-result {
          text-align: center;
          padding: 0.5rem 0;
        }
        .q-result-badge {
          width: 70px; height: 70px;
          border-radius: 50%;
          background: rgba(201,168,76,0.1);
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.25rem;
        }
        .q-result-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .q-result-summary { color: var(--muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 1.5rem; line-height: 1.7; }
        .q-result-extras {
          display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem;
        }
        .q-result-tag {
          background: rgba(201,168,76,0.08);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0.3rem 0.9rem;
          font-size: 0.78rem;
          color: var(--gold);
        }
        .q-result-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .q-back-btn {
          background: none; border: none; color: var(--muted);
          font-size: 0.82rem; cursor: pointer; margin-top: 1.5rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex; align-items: center; gap: 0.4rem;
          transition: color 0.2s;
        }
        .q-back-btn:hover { color: var(--text); }

        @media(max-width:600px){
          .q-options  { grid-template-columns: 1fr; }
          .q-timeline { grid-template-columns: 1fr; }
          .q-wrap     { padding: 1.5rem 1.25rem; }
        }
      `}</style>

      <section id="questionnaire">
        <div className="container">
          <div ref={labelRef} className="section-label reveal">Smart Finder</div>
          <h2 ref={titleRef} className="section-title reveal delay-1">Not sure what you need?</h2>
          <p ref={subRef} className="section-sub reveal delay-2">
            Answer 3 quick questions and we'll recommend the right package for your business.
          </p>

          <div ref={cardRef} className="q-wrap reveal delay-2">
            <ProgressBar step={step} total={4} />

            {/* ── Step 0: Situation ── */}
            {step === 0 && (
              <>
                <div className="q-question">What best describes your situation?</div>
                <div className="q-options">
                  {SITUATIONS.map(s => (
                    <OptionCard key={s.id} emoji={s.emoji} label={s.label} sub={s.sub}
                      onClick={() => handleSituation(s.id)} />
                  ))}
                </div>
              </>
            )}

            {/* ── Step 1: Follow-up ── */}
            {step === 1 && situation && (
              <>
                <div className="q-question">{FOLLOW_UPS[situation].question}</div>
                <div className="q-options single-col">
                  {FOLLOW_UPS[situation].options.map(o => (
                    <OptionCard key={o.id} label={o.label}
                      onClick={() => handleFollowUp(o.id)} />
                  ))}
                </div>
                <button className="q-back-btn" onClick={() => setStep(0)}>← Back</button>
              </>
            )}

            {/* ── Step 2: Timeline ── */}
            {step === 2 && (
              <>
                <div className="q-question">How soon do you need this?</div>
                <div className="q-timeline">
                  {TIMELINES.map(t => (
                    <OptionCard key={t.id} label={t.label} sub={t.sub}
                      onClick={() => handleTimeline(t.id)} />
                  ))}
                </div>
                <button className="q-back-btn" onClick={() => setStep(1)}>← Back</button>
              </>
            )}

            {/* ── Step 3: Result ── */}
            {step === 3 && rec && (
              <div className="q-result">
                <div className="q-result-badge">{rec.badge}</div>
                <div className="q-result-title">We recommend: {rec.title}</div>
                <p className="q-result-summary">{rec.summary}</p>
                <div className="q-result-extras">
                  {rec.extras.map(e => <span key={e} className="q-result-tag">{e}</span>)}
                  {timeline === 'asap' && <span className="q-result-tag">⚡ 48hr fast-track available</span>}
                </div>
                <div className="q-result-actions">
                  <button className="btn-gold" onClick={() => onSelect(rec.package)}>
                    Get this package →
                  </button>
                  <button className="btn-outline" onClick={reset}>
                    Start again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
