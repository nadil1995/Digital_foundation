import useScrollReveal from '../hooks/useScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Free Consultation',
    desc: 'Tell us about your business and what you need. We\'ll recommend the right package and answer any questions — no pressure, no jargon.',
  },
  {
    num: '02',
    title: 'We Build It',
    desc: 'Our team gets to work on your website, email setup, and any extras. Most projects are ready within 24–48 hours of sign-off.',
  },
  {
    num: '03',
    title: 'You Review & Approve',
    desc: 'We share a preview for your feedback. We refine everything until you\'re 100% happy — unlimited revisions included in every package.',
  },
  {
    num: '04',
    title: 'Launch & Grow',
    desc: 'Your site goes live, your email is ready, and we hand everything over clearly. Ongoing support means we\'re here whenever you need us.',
  },
]

function StepCard({ step, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`step-card reveal${delay ? ` delay-${delay}` : ''}`}>
      <div className="step-num">{step.num}</div>
      <div className="step-title">{step.title}</div>
      <p className="step-desc">{step.desc}</p>
    </div>
  )
}

export default function HowItWorks() {
  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()

  return (
    <section id="how-it-works">
      <div className="container">
        <div ref={labelRef} className="section-label reveal">The Process</div>
        <h2 ref={titleRef} className="section-title reveal delay-1">Simple. Fast. Done right.</h2>
        <p ref={subRef} className="section-sub reveal delay-2">
          We handle all the technical complexity so you don't have to. From first conversation to live website, we keep things clear.
        </p>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <StepCard key={s.num} step={s} delay={i > 0 ? i : null} />
          ))}
        </div>
      </div>
    </section>
  )
}
