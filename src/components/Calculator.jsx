import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

function fmt(n) {
  return '£' + n.toLocaleString('en-GB')
}

export default function Calculator() {
  const [oneoffClients,   setOneoffClients]   = useState(5)
  const [pkgValue,        setPkgValue]        = useState(699)
  const [retainerClients, setRetainerClients] = useState(10)
  const [retainerValue,   setRetainerValue]   = useState(99)

  const monthlyOneoff   = oneoffClients * pkgValue
  const monthlyRetainer = retainerClients * retainerValue
  const annualRevenue   = (monthlyOneoff + monthlyRetainer) * 12
  const netProfit       = annualRevenue - 2000 * 12

  const labelRef  = useScrollReveal()
  const titleRef  = useScrollReveal()
  const subRef    = useScrollReveal()
  const slidersRef = useScrollReveal()
  const resultsRef = useScrollReveal()

  return (
    <section id="calculator">
      <div className="container">
        <div ref={labelRef} className="section-label reveal">Revenue Calculator</div>
        <h2 ref={titleRef} className="section-title reveal delay-1">See your potential</h2>
        <p ref={subRef} className="section-sub reveal delay-2">
          Estimate your monthly and annual revenue from one-off projects and recurring retainer clients.
        </p>

        <div className="calc-wrap">
          {/* Sliders */}
          <div ref={slidersRef} className="calc-sliders reveal">

            <div className="slider-group">
              <label htmlFor="sl-oneoff-clients">
                One-off clients / month
                <span className="slider-val">{oneoffClients}</span>
              </label>
              <input
                type="range" id="sl-oneoff-clients"
                min="1" max="20" value={oneoffClients}
                onChange={e => setOneoffClients(+e.target.value)}
              />
            </div>

            <div className="slider-group">
              <label htmlFor="sl-pkg-value">
                Average package value
                <span className="slider-val">{fmt(pkgValue)}</span>
              </label>
              <input
                type="range" id="sl-pkg-value"
                min="349" max="1299" step="50" value={pkgValue}
                onChange={e => setPkgValue(+e.target.value)}
              />
            </div>

            <div className="slider-group">
              <label htmlFor="sl-retainer-clients">
                Retainer clients
                <span className="slider-val">{retainerClients}</span>
              </label>
              <input
                type="range" id="sl-retainer-clients"
                min="0" max="30" value={retainerClients}
                onChange={e => setRetainerClients(+e.target.value)}
              />
            </div>

            <div className="slider-group">
              <label htmlFor="sl-retainer-value">
                Avg retainer value
                <span className="slider-val">{fmt(retainerValue)}</span>
              </label>
              <input
                type="range" id="sl-retainer-value"
                min="49" max="199" step="10" value={retainerValue}
                onChange={e => setRetainerValue(+e.target.value)}
              />
            </div>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="calc-results reveal delay-1">
            <div className="calc-annual-block">
              <div className="calc-annual-lbl">Projected Annual Revenue</div>
              <div className="calc-annual-val">{fmt(annualRevenue)}</div>
            </div>
            <div className="calc-row">
              <span className="calc-row-lbl">Monthly one-off revenue</span>
              <span className="calc-row-val">{fmt(monthlyOneoff)}</span>
            </div>
            <div className="calc-row">
              <span className="calc-row-lbl">Monthly retainer revenue</span>
              <span className="calc-row-val">{fmt(monthlyRetainer)}</span>
            </div>
            <div className="calc-row">
              <span className="calc-row-lbl">Estimated monthly costs</span>
              <span className="calc-row-val" style={{ color: '#f87171' }}>−£2,000</span>
            </div>
            <div className="calc-row">
              <span className="calc-row-lbl">Estimated net profit (annual)</span>
              <span
                className="calc-row-val"
                style={{ color: netProfit >= 0 ? 'var(--gold)' : '#f87171' }}
              >
                {netProfit >= 0
                  ? fmt(netProfit)
                  : '−£' + Math.abs(netProfit).toLocaleString('en-GB')
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
