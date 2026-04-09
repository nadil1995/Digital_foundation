import useScrollReveal from '../hooks/useScrollReveal'

function HeroIllustration() {
  return (
    <>
      <style>{`
        /* ── illustration keyframes ── */
        @keyframes ill-fade-in  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ill-blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ill-bar-grow { from{width:0} to{width:var(--w)} }
        @keyframes ill-pulse    { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
        @keyframes ill-scan     { 0%{top:12px} 100%{top:calc(100% - 12px)} }
        @keyframes ill-float-a  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)}  }
        @keyframes ill-float-b  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(6px)}   }
        @keyframes ill-float-c  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-6px)}  }
        @keyframes ill-typing   {
          0%  { width:0 }
          40% { width:90% }
          60% { width:90% }
          90% { width:60% }
          100%{ width:60% }
        }
        @keyframes ill-glow {
          0%,100%{ box-shadow:0 0 24px rgba(201,168,76,.15) }
          50%    { box-shadow:0 0 48px rgba(201,168,76,.32) }
        }

        .ill-wrap {
          position:relative;
          width:100%;
          max-width:460px;
          margin:0 auto;
          user-select:none;
        }

        /* browser chrome */
        .ill-browser {
          border-radius:14px;
          border:1.5px solid rgba(201,168,76,.22);
          background:#0d1425;
          overflow:hidden;
          animation: ill-glow 4s ease-in-out infinite, ill-fade-in .8s ease both .3s;
          box-shadow: 0 24px 60px rgba(0,0,0,.45);
        }
        .ill-topbar {
          background:#111827;
          padding:10px 14px;
          display:flex;
          align-items:center;
          gap:12px;
          border-bottom:1px solid rgba(201,168,76,.1);
        }
        .ill-dots { display:flex; gap:5px; }
        .ill-dot  { width:8px;height:8px;border-radius:50%; }
        .ill-dot:nth-child(1){ background:#ff5f57; }
        .ill-dot:nth-child(2){ background:#febc2e; }
        .ill-dot:nth-child(3){ background:#28c840; }
        .ill-url {
          flex:1;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.07);
          border-radius:6px;
          padding:4px 10px;
          font-size:.68rem;
          color:rgba(248,246,241,.4);
          font-family:'Plus Jakarta Sans',sans-serif;
          overflow:hidden;
          white-space:nowrap;
        }
        .ill-url span {
          display:inline-block;
          overflow:hidden;
          animation: ill-typing 4s ease-in-out infinite;
          white-space:nowrap;
          vertical-align:bottom;
        }
        .ill-cursor {
          display:inline-block;
          width:1px;
          height:.75rem;
          background:rgba(201,168,76,.8);
          vertical-align:middle;
          margin-left:1px;
          animation: ill-blink 1s step-end infinite;
        }

        /* browser body */
        .ill-body { padding:16px; display:flex; flex-direction:column; gap:10px; }

        /* hero strip inside browser */
        .ill-hero-strip {
          border-radius:8px;
          background:linear-gradient(135deg,rgba(201,168,76,.07),rgba(201,168,76,.02));
          border:1px solid rgba(201,168,76,.12);
          padding:14px 16px;
          display:flex;
          align-items:center;
          gap:12px;
        }
        .ill-hero-text { flex:1; }
        .ill-h1 {
          height:10px;border-radius:4px;
          background:rgba(201,168,76,.55);
          margin-bottom:6px;
          --w:72%;
          width:0;
          animation: ill-bar-grow 1s ease .6s forwards;
        }
        .ill-h2 {
          height:7px;border-radius:4px;
          background:rgba(248,246,241,.15);
          --w:55%;
          width:0;
          animation: ill-bar-grow 1s ease .9s forwards;
        }
        .ill-hero-img {
          width:44px;height:44px;border-radius:8px;
          background:rgba(201,168,76,.1);
          border:1px solid rgba(201,168,76,.18);
          display:flex;align-items:center;justify-content:center;
          font-size:1.3rem;
          animation: ill-pulse 3s ease-in-out infinite;
          flex-shrink:0;
        }

        /* nav row */
        .ill-nav {
          display:flex;gap:8px;align-items:center;
          padding:8px 0;
          border-bottom:1px solid rgba(255,255,255,.05);
        }
        .ill-nav-dot {
          height:6px;border-radius:3px;
          background:rgba(248,246,241,.12);
        }
        .ill-nav-dot.active{ background:rgba(201,168,76,.5); }

        /* content rows */
        .ill-row { display:flex;gap:8px;align-items:center; }
        .ill-line {
          height:6px;border-radius:3px;
          background:rgba(248,246,241,.08);
          --w:100%;
          width:0;
          animation: ill-bar-grow 1s ease var(--d,1s) forwards;
        }
        .ill-line.gold { background:rgba(201,168,76,.25); }

        /* 3-col grid cards */
        .ill-cards { display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:4px; }
        .ill-card {
          border-radius:7px;
          border:1px solid rgba(201,168,76,.1);
          background:rgba(255,255,255,.02);
          padding:8px;
          animation: ill-fade-in .5s ease both;
        }
        .ill-card:nth-child(1){ animation-delay:1.1s; }
        .ill-card:nth-child(2){ animation-delay:1.3s; }
        .ill-card:nth-child(3){ animation-delay:1.5s; }
        .ill-card-icon {
          width:22px;height:22px;border-radius:5px;
          background:rgba(201,168,76,.1);
          margin-bottom:5px;
          display:flex;align-items:center;justify-content:center;
          font-size:.8rem;
        }
        .ill-card-line {
          height:4px;border-radius:2px;
          background:rgba(248,246,241,.08);
          margin-bottom:3px;
          --w:80%;
          width:0;
          animation: ill-bar-grow .6s ease var(--d,1.2s) forwards;
        }
        .ill-card-line.short{ --w:55%; }

        /* scan line */
        .ill-scan-wrap {
          position:relative;overflow:hidden;border-radius:4px;
        }
        .ill-scan-line {
          position:absolute;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,168,76,.45),transparent);
          animation: ill-scan 3s ease-in-out infinite alternate;
        }

        /* floating badge cards */
        .ill-badge {
          position:absolute;
          background:#111827;
          border:1.5px solid rgba(201,168,76,.22);
          border-radius:10px;
          padding:7px 11px;
          display:flex;align-items:center;gap:7px;
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:.7rem;
          font-weight:600;
          color:var(--text);
          box-shadow:0 8px 24px rgba(0,0,0,.35);
          white-space:nowrap;
        }
        .ill-badge-dot {
          width:7px;height:7px;border-radius:50%;flex-shrink:0;
        }
        .ill-badge.live   { top:-18px;right:10%;  animation: ill-float-a 5s ease-in-out infinite; }
        .ill-badge.email  { bottom:30px;left:-30px; animation: ill-float-b 6.5s ease-in-out infinite 0.5s; }
        .ill-badge.seo    { bottom:-16px;right:5%;  animation: ill-float-c 5.5s ease-in-out infinite 1s; }
      `}</style>

      <div className="ill-wrap">
        {/* floating badges */}
        <div className="ill-badge live">
          <span className="ill-badge-dot" style={{ background:'#28c840', boxShadow:'0 0 6px #28c840' }} />
          Site is live!
        </div>
        <div className="ill-badge email">
          <span style={{ fontSize:'.9rem' }}>✉️</span>
          hello@yourbusiness.co.uk
        </div>
        <div className="ill-badge seo">
          <span style={{ fontSize:'.9rem' }}>📈</span>
          SEO &amp; Google Business
        </div>

        {/* browser window */}
        <div className="ill-browser">
          {/* top bar */}
          <div className="ill-topbar">
            <div className="ill-dots">
              <div className="ill-dot" /><div className="ill-dot" /><div className="ill-dot" />
            </div>
            <div className="ill-url">
              <span>yourbusiness.co.uk</span>
              <span className="ill-cursor" />
            </div>
          </div>

          {/* page body */}
          <div className="ill-body">
            {/* nav */}
            <div className="ill-nav">
              {[70,45,55,40,50].map((w,i) => (
                <div key={i} className={`ill-nav-dot${i===0?' active':''}`} style={{ width:w }} />
              ))}
              <div style={{ flex:1 }} />
              <div style={{
                width:52,height:18,borderRadius:5,
                background:'rgba(201,168,76,.35)',
                border:'1px solid rgba(201,168,76,.3)',
              }} />
            </div>

            {/* hero strip */}
            <div className="ill-hero-strip ill-scan-wrap">
              <div className="ill-scan-line" />
              <div className="ill-hero-text">
                <div className="ill-h1" />
                <div className="ill-h2" />
                <div style={{
                  marginTop:8,
                  width:48,height:14,borderRadius:4,
                  background:'rgba(201,168,76,.4)',
                  animation:'ill-fade-in .5s ease 1.2s both',
                }} />
              </div>
              <div className="ill-hero-img">🚀</div>
            </div>

            {/* content lines */}
            {[
              { w:'85%', d:'.7s', gold:false },
              { w:'60%', d:'.9s', gold:true  },
              { w:'75%', d:'1.1s', gold:false },
            ].map(({ w, d, gold }, i) => (
              <div key={i} className="ill-row">
                <div className={`ill-line${gold?' gold':''}`} style={{ '--w':w, '--d':d, flex:1 }} />
              </div>
            ))}

            {/* service cards */}
            <div className="ill-cards">
              {[
                { icon:'🌐', label:'Website' },
                { icon:'✉️', label:'Email'   },
                { icon:'📋', label:'Plan'    },
              ].map(card => (
                <div key={card.label} className="ill-card">
                  <div className="ill-card-icon">{card.icon}</div>
                  <div className="ill-card-line" style={{ '--d':'1.2s' }} />
                  <div className="ill-card-line short" style={{ '--d':'1.4s' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Hero() {
  const r0 = useScrollReveal()
  const r1 = useScrollReveal()
  const r2 = useScrollReveal()
  const r3 = useScrollReveal()

  return (
    <section id="hero" className="hero">
      <div className="grid-bg" />
      <div className="hero-inner">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
          className="hero-two-col"
        >
          {/* LEFT copy */}
          <div>
            <div ref={r0} className="hero-badge reveal">
              <span className="dot" />
              UK Digital Services — Trusted by sole traders &amp; small businesses
            </div>
            <h1 ref={r1} className="hero-title reveal delay-1">
              Your business,<br />
              <em className="gold-italic">online in days.</em>
            </h1>
            <p ref={r2} className="hero-sub reveal delay-2">
              We build professional websites and set up business emails — so you can focus on running your business, not figuring out technology.
            </p>
            <div ref={r3} className="hero-btns reveal delay-3">
              <a href="#contact" className="btn-gold">Get your free quote</a>
              <a href="#pricing" className="btn-outline">View packages</a>
            </div>
          </div>

          {/* RIGHT illustration */}
          <HeroIllustration />
        </div>
      </div>

      <style>{`
        .hero-two-col { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }
        @media(max-width:860px){
          .hero-two-col { grid-template-columns:1fr; gap:3rem; }
          .ill-wrap { max-width:380px; }
          .ill-badge.email { display:none; }
        }
        @media(max-width:480px){
          .hero { padding-top:7rem; }
          .ill-wrap { max-width:100%; }
          .ill-badge.live, .ill-badge.seo { display:none; }
        }
      `}</style>
    </section>
  )
}
