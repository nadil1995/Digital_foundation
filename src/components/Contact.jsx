import { useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

/*
  ============================================================
  FORMSPREE ACTIVATION GUIDE
  ============================================================
  1. Go to https://formspree.io and create a free account.
  2. Click "New Form", give it a name and set your notification email.
  3. Copy your unique form ID (looks like: abcdefgh).
  4. Create a .env file at the project root (copy .env.example):
        VITE_FORMSPREE_ID=abcdefgh
  5. The fetch URL below reads: import.meta.env.VITE_FORMSPREE_ID
     so your real ID is never hard-coded.
  6. Free tier: 50 submissions/month. Upgrade for more.
  ============================================================

  ============================================================
  JIRA INTEGRATION PLACEHOLDER
  ============================================================
  When ready, build a Node.js/Express backend that:
  1. Exposes POST /api/enquiry
  2. Authenticates with Jira via Basic Auth:
       Authorization: Basic base64(email:api-token)
     Get token: https://id.atlassian.com/manage-profile/security/api-tokens
  3. POSTs to Jira REST API v3:
       POST https://your-domain.atlassian.net/rest/api/3/issue
     Body fields: project key, summary, description (doc format), issuetype, priority
  4. Docs: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-post
  ============================================================
*/

const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID || 'YOUR_FORM_ID'}`

const packageOptions = [
  { group: 'One-off Setup', options: [
    { value: 'Starter — £349',   label: 'Starter — £349' },
    { value: 'Growth — £699',    label: 'Growth — £699' },
    { value: 'Premium — £1,299', label: 'Premium — £1,299' },
  ]},
  { group: 'Monthly Retainer', options: [
    { value: 'Basic Care — £49/mo',         label: 'Basic Care — £49/mo' },
    { value: 'Growth Care — £99/mo',        label: 'Growth Care — £99/mo' },
    { value: 'Full Management — £199/mo',   label: 'Full Management — £199/mo' },
  ]},
  { group: 'Add-ons', options: [
    { value: 'Add-on: Logo & Brand Identity — £149',   label: 'Logo & Brand Identity — £149' },
    { value: 'Add-on: E-commerce Setup — £299',        label: 'E-commerce Setup — £299' },
    { value: 'Add-on: Investor Pitch Deck — £249',     label: 'Investor Pitch Deck — £249' },
    { value: 'Add-on: Social Media Setup — £99',       label: 'Social Media Setup — £99' },
    { value: 'Add-on: Local SEO Boost — £149',         label: 'Local SEO Boost — £149' },
    { value: 'Add-on: Booking System — £79',           label: 'Booking System — £79' },
    { value: 'Add-on: Business Email Migration — £69', label: 'Business Email Migration — £69' },
    { value: 'Add-on: Chatbot Integration — £149',    label: 'Chatbot Integration — £149'    },
    { value: 'Add-on: Booking System — £79',          label: 'Booking System — £79'          },
  ]},
  { group: null, options: [
    { value: 'Not sure — please advise', label: 'Not sure — please advise' },
  ]},
]

const contactInfo = [
  { icon: '✉️', label: 'Email',         value: 'hello@setupdesk.co.uk' },
  { icon: '📞', label: 'Phone',         value: '+44 20 1234 5678' },
  // { icon: '📍', label: 'Location',      value: 'South Croydon, London' },
  { icon: '⏱️', label: 'Response Time', value: 'Within 24 hours' },
]

export default function Contact({ selectedPackage, setSelectedPackage }) {
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', phone: '', businessName: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | loading | success | error

  // Sync external package selection into local select state
  useEffect(() => {
    if (selectedPackage) {
      setForm(f => ({ ...f, package: selectedPackage }))
    }
  }, [selectedPackage])

  const labelRef   = useScrollReveal()
  const titleRef   = useScrollReveal()
  const subRef     = useScrollReveal()
  const detailsRef = useScrollReveal()
  const formRef    = useScrollReveal()

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.package)          e.package   = 'Please select a package'
    if (!form.message.trim())   e.message   = 'Required'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (name === 'package') setSelectedPackage(value)
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3500)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div ref={labelRef} className="section-label reveal">Contact</div>
        <h2 ref={titleRef} className="section-title reveal delay-1">Get your free quote</h2>
        <p ref={subRef} className="section-sub reveal delay-2">
          Tell us about your business and we'll get back to you within 24 hours with a tailored recommendation.
        </p>

        <div className="contact-wrap">
          {/* Contact details */}
          <div ref={detailsRef} className="contact-details reveal">
            {contactInfo.map(c => (
              <div key={c.label} className="contact-item">
                <div className="ci-icon">{c.icon}</div>
                <div>
                  <div className="ci-lbl">{c.label}</div>
                  <div className="ci-val">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form / success */}
          <div ref={formRef} className="reveal delay-1">
            {status === 'success' ? (
              <div className="form-success-msg">
                <div className="check-circle">✓</div>
                <h3>Enquiry received!</h3>
                <p>Thank you for reaching out. We'll review your enquiry and get back to you within 24 hours with a tailored recommendation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid-2">
                  <Field id="first-name" name="firstName" label="First Name *" placeholder="John"              value={form.firstName}    onChange={handleChange} error={errors.firstName} />
                  <Field id="last-name"  name="lastName"  label="Last Name *"  placeholder="Smith"             value={form.lastName}     onChange={handleChange} error={errors.lastName} />
                  <Field id="f-email"    name="email"     label="Email Address *" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                  <Field id="f-phone"    name="phone"     label="Phone Number" type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={handleChange} />
                  <Field id="f-business" name="businessName" label="Business Name" placeholder="Your Business Ltd" value={form.businessName} onChange={handleChange} />

                  <div className="fg">
                    <label htmlFor="f-package">Package / Interest *</label>
                    <select
                      id="f-package"
                      name="package"
                      value={form.package || ''}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select a package…</option>
                      {packageOptions.map(g => (
                        g.group
                          ? <optgroup key={g.group} label={g.group}>
                              {g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </optgroup>
                          : g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)
                      ))}
                    </select>
                    {errors.package && <span className="form-error">{errors.package}</span>}
                  </div>

                  <div className="fg full">
                    <label htmlFor="f-message">Tell us about your business *</label>
                    <textarea
                      id="f-message"
                      name="message"
                      placeholder="What does your business do? What are you looking for? Any specific requirements?"
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className={`form-submit-btn${status === 'error' ? ' error' : ''}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : status === 'error' ? 'Something went wrong — please try again' : 'Send Enquiry →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ id, name, label, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div className="fg">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="on"
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
