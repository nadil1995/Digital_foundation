import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'How much does a small business website cost in the UK?',
    a: 'Our packages start from £349 for a professional 1-page website including domain, business email, and a contact form. A 5-page Growth website with SEO and Google Business setup is £699. Prices are transparent — no hidden fees, no monthly platform costs forced on you.',
  },
  {
    q: 'How long does it take to build my website?',
    a: 'Most websites are delivered within 24–48 hours of you approving the plan. Complex projects like e-commerce stores or 10-page sites typically take 3–5 days. We always give you a clear timeline upfront before we start.',
  },
  {
    q: 'I already have a domain — can you still build my site?',
    a: 'Absolutely. If you have an existing domain with GoDaddy, Namecheap, 123-reg, or any other registrar, we\'ll connect it to your new site. We just need access to your DNS settings — we\'ll guide you through it step by step.',
  },
  {
    q: 'Can you set up Google Workspace or Microsoft 365 for my business email?',
    a: 'Yes — this is one of our most popular services. We set up professional email (e.g. hello@yourbusiness.co.uk) on either Google Workspace or Microsoft 365, including DNS configuration, MX records, and basic onboarding. We can also migrate your existing emails.',
  },
  {
    q: 'Do I need to know anything technical?',
    a: 'Not at all. We handle everything — domain, hosting, DNS, email setup, SEO, and more. We explain things in plain English and hand everything over with clear instructions. You\'ll know how to update your site and access your email without needing a developer.',
  },
  {
    q: 'What platforms do you build websites on?',
    a: 'We build on WordPress, Shopify, and Wix depending on your needs. WordPress is best for content-heavy or service businesses, Shopify for e-commerce, and Wix for fast and simple sites. We recommend the right one for your situation during the free consultation.',
  },
  {
    q: 'Is my website GDPR compliant?',
    a: 'Yes. All SetupDesk websites are built to UK GDPR standards — including cookie consent notices, a privacy policy, and secure contact forms. We\'re UK-based and understand your legal obligations as a business operating in England, Scotland, Wales, or Northern Ireland.',
  },
  {
    q: 'What is a business plan and do I need one?',
    a: 'A business plan is a written document that outlines your business goals, target market, revenue model, and financial projections. Banks, investors, and grant bodies require one before approving funding. Our plans are investor-ready PDF documents, professionally written and tailored to your business.',
  },
  {
    q: 'Can you add a chatbot to my website?',
    a: 'Yes. We integrate AI-powered chatbots that can answer FAQs, capture leads, handle support queries, or take bookings — 24/7, without you lifting a finger. The chatbot is trained on your business information and embedded directly into your site for £149.',
  },
  {
    q: 'What happens after my website goes live?',
    a: 'Every package includes post-launch support — from 1 month on Starter to 6 months priority support on Premium. We also offer monthly retainer plans from £49/mo for ongoing maintenance, updates, and SEO monitoring. You\'re never left on your own.',
  },
  {
    q: 'Do you work with sole traders and limited companies?',
    a: 'Yes — we work with sole traders, freelancers, partnerships, and limited companies across the UK. Whether you\'re just starting out or established and need a refresh, we have a package that fits.',
  },
  {
    q: 'Can I upgrade my package later?',
    a: 'Of course. You can start with the Starter package and upgrade at any time. We keep your project files and can expand your site, add e-commerce, or move you onto a retainer plan whenever you\'re ready.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`faq-item reveal${index % 3 !== 0 ? ` delay-${index % 3}` : ''}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        className={`faq-q${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span itemProp="name">{faq.q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div
          className="faq-a"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <p itemProp="text">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const subRef   = useScrollReveal()

  return (
    <>
      <style>{`
        .faq-list {
          max-width: 820px;
          margin: 0 auto;
        }
        .faq-item {
          border-bottom: 1px solid var(--border);
        }
        .faq-item:first-child { border-top: 1px solid var(--border); }

        .faq-q {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          padding: 1.35rem 0;
          background: none;
          border: none;
          color: var(--text);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.97rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: color 0.2s;
          line-height: 1.5;
        }
        .faq-q:hover { color: var(--gold); }
        .faq-q.open  { color: var(--gold); }

        .faq-icon {
          font-size: 1.3rem;
          color: var(--gold);
          flex-shrink: 0;
          line-height: 1;
          font-weight: 300;
          width: 22px;
          text-align: center;
        }

        .faq-a {
          padding-bottom: 1.35rem;
          padding-right: 2.5rem;
        }
        .faq-a p {
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.75;
        }
      `}</style>

      <section
        id="faq"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="container">
          <div ref={labelRef} className="section-label reveal">FAQ</div>
          <h2 ref={titleRef} className="section-title reveal delay-1">
            Frequently asked questions
          </h2>
          <p ref={subRef} className="section-sub reveal delay-2">
            Everything UK sole traders and small businesses ask us before getting started.
          </p>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
