// Mobile page designs — 375px wide

function MHome() {
  return (
    <div className="mframe">
      <MobileTop />
      <div className="mbody" style={{ textAlign: 'center', paddingTop: 32 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 24px',
          background: 'linear-gradient(135deg,#c27a5c,#7a4532)',
          boxShadow: '0 0 0 3px var(--bg), 0 0 0 4px var(--border-2)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 35%, rgba(255,240,220,0.3) 0 22%, transparent 24%), radial-gradient(ellipse at 50% 80%, rgba(30,20,15,0.4) 0 40%, transparent 55%)' }} />
        </div>
        <h1 className="serif" style={{ fontSize: 38, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          Hello, I'm <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Jeremy</em> 👋
        </h1>
        <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32 }}>Product Engineer / Solo Builder · Writer</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
          {[
            { t: 'Who is Jeremy?', i: Icons.user },
            { t: 'See his work', i: Icons.grid },
            { t: 'Read the blog', i: Icons.book },
            { t: 'Work together', i: Icons.mail },
          ].map(c => (
            <div key={c.t} style={{
              padding: '14px 16px', border: '1px solid var(--border)', borderRadius: 10,
              background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{c.t}</span>
              <span style={{ color: 'var(--subtle)', width: 14, height: 14 }}>{c.i}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 28, padding: 18, background: 'var(--bg-alt)', border: '1px solid var(--border)',
          borderRadius: 14, textAlign: 'left',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>LATEST ARTIFACT</div>
          <h3 className="serif" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.22, margin: '0 0 8px' }}>The Architecture of Collective Intelligence</h3>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 10px' }}>
            Exploring the intersection of neural networks and human organizational structures.
          </p>
          <a style={{ fontSize: 12, color: 'var(--ink)', textDecoration: 'underline', fontWeight: 500 }}>Read Archive</a>
        </div>
      </div>
      <MobileChat />
      <MobileNav active="about" />
    </div>
  );
}

function MAbout() {
  return (
    <div className="mframe">
      <MobileTop />
      <div className="mbody">
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 10 }}>COGNITIVE ARCHITECT</div>
        <h1 className="serif" style={{ fontSize: 34, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 18px' }}>
          Designing systems that think alongside humans.
        </h1>
        <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.68, margin: '0 0 24px' }}>
          Jeremy Nguyen is a systems engineer turned digital curator. His work explores the delicate boundary between computational efficiency and the messy, beautiful reality of human cognition.
        </p>
        <div style={{ height: 180, borderRadius: 12, background: 'linear-gradient(160deg,#d08a65,#5a3024)', marginBottom: 24, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 35%, rgba(255,240,220,0.25) 0 18%, transparent 22%)' }} />
        </div>
        <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, marginBottom: 28 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--subtle)', fontWeight: 600, marginBottom: 8 }}>THE PHILOSOPHY</div>
          <p className="serif" style={{ fontStyle: 'italic', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            For the past decade, I've focused on building "Cognitive Artifacts" — tools that expand the user's capacity for thought.
          </p>
        </div>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 12 }}>TECHNICAL DOMAINS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
          {['Neural Architectures','Interface Semantics','Distributed Ledger Tech','Editorial Design Systems','Prompt Engineering','Graph Theory','Cognitive Ergonomics'].map(t => (
            <span key={t} style={{ padding: '6px 11px', border: '1px solid var(--border-2)', borderRadius: 999, fontSize: 11.5, color: 'var(--ink-2)' }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 12 }}>CAREER TRAJECTORY</div>
        {[
          { yr: '2024 — PRESENT', t: 'Product Engineer & Solo Builder', o: 'Building AI-native products end-to-end. Fullstack engineering turned product.' },
          { yr: '2021 — 2024', t: 'Senior Software Engineer', o: 'Shipped production systems across frontend, backend, and infrastructure.' },
          { yr: '2019 — 2021', t: 'Software Engineer', o: 'Built real-time data systems and API platforms for early-stage products.' },
          { yr: '2017 — 2019', t: 'Junior Developer', o: 'Built tooling and web infrastructure for ML inference systems.' },
        ].map((r, i) => (
          <div key={i} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
            <div style={{ fontSize: 10, color: 'var(--subtle)', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>{r.yr}</div>
            <div className="serif" style={{ fontSize: 15.5, fontWeight: 500, fontStyle: 'italic', marginBottom: 3 }}>{r.t}</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55 }}>{r.o}</div>
          </div>
        ))}
      </div>
      <MobileChat placeholder="Ask about Jeremy's methodology…" />
      <MobileNav active="about" />
    </div>
  );
}

function MProjects() {
  const ps = [
    { t: 'Cognitive Nexus v2.0', cat: ['Neural Systems','Core Engine'], d: 'An experimental orchestration layer for multi-agent LLM systems, focusing on low-latency memory retrieval.', img: true },
    { t: 'Silicon Whispers', cat: ['Hardware','Logic'], d: 'Analog signal noise in early 8-bit processors translated into generative musical patterns.', img: true },
    { t: 'Semantic Diff', cat: ['Dev Tools'], d: 'A command-line utility for comparing the logical structure of two codebases.' },
    { t: 'Ghost Protocol', cat: ['Security','Cryptography'], d: 'Encrypted messaging bridge utilizing steganography hidden within raw vector graphics metadata.' },
    { t: 'Fluid Interface', cat: ['UX Research'], d: 'Research paper and prototype on non-rectilinear UI containers and their impact on spatial navigation.' },
  ];
  return (
    <div className="mframe">
      <MobileTop />
      <div className="mbody">
        <div style={{ fontSize: 10, color: 'var(--subtle)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 10 }}>PORTFOLIO · ARCHIVE 2026</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 14px' }}>Selected Artifacts</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 26px' }}>
          A curated repository of technical experiments, cognitive architectures, and digital systems at the intersection of AI and human engineering.
        </p>

        {ps.map((p, i) => (
          <div key={p.t} style={{ marginBottom: 20, background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 12, padding: p.img ? 0 : 16, overflow: 'hidden' }}>
            {p.img && (
              <div style={{ height: 140, background: i === 0 ? 'radial-gradient(circle at 50% 50%,#c27a5c 0%,#2c1e17 70%)' : 'linear-gradient(135deg,#4a3d33,#0f0b09)', position: 'relative' }}>
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
                  {i === 0 && <g stroke="#f4d4b5" strokeWidth="0.4" fill="none">{Array.from({length:30}).map((_,j)=><line key={j} x1="50%" y1="50%" x2={`${50+45*Math.cos(j*0.22)}%`} y2={`${50+40*Math.sin(j*0.22)}%`}/>)}</g>}
                  {i === 1 && <g fill="#d4a876" opacity="0.6">{Array.from({length:5}).map((_,j)=><rect key={j} x={20+j*40} y={30+j*10} width="30" height="80" opacity={0.3+j*0.1}/>)}</g>}
                </svg>
              </div>
            )}
            <div style={{ padding: p.img ? 16 : 0 }}>
              <div style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
                {p.cat.map(c => <span key={c} className="tag" style={{ fontSize: 9 }}>{c}</span>)}
              </div>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.2, margin: '0 0 8px' }}>{p.t}</h2>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 10px' }}>{p.d}</p>
              {p.img && <a style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em' }}>EXPLORE TECHNICAL SPECS →</a>}
            </div>
          </div>
        ))}
      </div>
      <MobileChat placeholder="Query the archive…" />
      <MobileNav active="projects" />
    </div>
  );
}

function MBlog() {
  const posts = [
    { d: 'OCT 24, 2026', cat: 'SYSTEM DESIGN', t: 'The Geometry of LLM Context Windows', ex: 'Exploring the spatial metaphors we use to understand attention mechanisms and why the "infinite" window is a design fallacy.' },
    { d: 'SEPT 12, 2026', cat: 'PHILOSOPHY', t: 'Latent Spaces as Digital Archives', ex: 'Why we should treat AI weights not as code, but as a living curatorship of human knowledge and cultural artifacts.' },
    { d: 'AUG 05, 2026', cat: 'TUTORIAL', t: 'Building for the 100ms Human', ex: 'Optimizing interface reactivity in the age of asynchronous API calls. A guide to perceived performance.' },
  ];
  return (
    <div className="mframe">
      <MobileTop />
      <div className="mbody">
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 10 }}>THE ARCHIVE</div>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 28px' }}>
          Thoughts on <em style={{ fontStyle: 'italic' }}>Cognitive Architecture</em> and the Machine Era.
        </h1>

        {posts.map((p, i) => (
          <article key={p.t} style={{ marginBottom: 26 }}>
            <div style={{
              height: 150, borderRadius: 10, marginBottom: 14,
              background: i === 0 ? 'radial-gradient(circle at 40% 50%,#8a6a54 0%,#2c211d 70%)' :
                         i === 1 ? 'linear-gradient(160deg,#4a3d33,#1c1612)' :
                         'linear-gradient(135deg,#6b4a38,#2c1e17)',
              position: 'relative', overflow: 'hidden',
            }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
                {i === 0 && <g stroke="#f4d4b5" strokeWidth="0.4" fill="none">{Array.from({length:30}).map((_,j)=><line key={j} x1="50%" y1="50%" x2={`${50+45*Math.cos(j*0.22)}%`} y2={`${50+40*Math.sin(j*0.22)}%`}/>)}</g>}
                {i === 1 && <g fill="#d4a876">{Array.from({length:7}).map((_,j)=><rect key={j} x={20+j*36} y={60-j*5} width="24" height="70" opacity={0.25+j*0.08}/>)}</g>}
                {i === 2 && <g fill="none" stroke="#f4d4b5" strokeWidth="0.6"><path d="M10 130 L60 50 L110 100 L160 30 L220 110 L280 60"/><path d="M10 100 L60 30 L110 70 L160 20 L220 80"/></g>}
              </svg>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: 'var(--subtle)', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>{p.d}</span>
              <span style={{ width: 3, height: 3, background: 'var(--subtle)', borderRadius: 2 }} />
              <span className="tag accent" style={{ fontSize: 9 }}>{p.cat}</span>
            </div>
            <h2 className="serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.2, margin: '0 0 8px' }}>{p.t}</h2>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{p.ex}</p>
          </article>
        ))}
      </div>
      <MobileChat placeholder="Search the archive…" />
      <MobileNav active="blog" />
    </div>
  );
}

function MBlogPost() {
  return (
    <div className="mframe">
      <MobileTop />
      <div className="mbody">
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>← Back to archive</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
          <span className="tag accent" style={{ fontSize: 9 }}>SYSTEM DESIGN</span>
          <span style={{ fontSize: 10, color: 'var(--subtle)', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>OCT 24 · 12 MIN</span>
        </div>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 16px' }}>The Geometry of LLM Context Windows</h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 20px' }}>
          Exploring spatial metaphors we use to understand attention, and why the 'infinite' window is a design fallacy.
        </p>
        <div style={{ height: 180, borderRadius: 12, marginBottom: 22, background: 'radial-gradient(circle at 50% 50%,#8a6a54,#2c211d 75%)', position: 'relative' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
            <g stroke="#f4d4b5" strokeWidth="0.5" fill="none">
              {Array.from({length:30}).map((_,j)=><line key={j} x1="50%" y1="50%" x2={`${50+45*Math.cos(j*0.22)}%`} y2={`${50+40*Math.sin(j*0.22)}%`}/>)}
            </g>
          </svg>
        </div>
        <div className="serif" style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--ink-2)' }}>
          <p style={{ margin: '0 0 18px' }}>
            <span style={{ fontSize: 44, float: 'left', lineHeight: 0.9, marginRight: 8, marginTop: 6, fontWeight: 500, color: 'var(--accent)' }}>W</span>
            hen we talk about a model's context, we reach for the metaphor of a window. But the window is the wrong geometry. Attention is not a pane; it is a field.
          </p>
          <blockquote style={{ borderLeft: '3px solid var(--accent)', padding: '4px 0 4px 16px', margin: '22px 0', fontStyle: 'italic', fontSize: 17 }}>
            "Memory without curation is just noise that hasn't been forgotten yet."
          </blockquote>
          <p style={{ margin: '0 0 18px' }}>
            What we want instead is a mental topography — a shape to the context that encodes not just what has been said, but where it sits in the reader's intent.
          </p>
        </div>
      </div>
      <MobileChat placeholder="Ask about this essay…" />
      <MobileNav active="blog" />
    </div>
  );
}

function MContact() {
  return (
    <div className="mframe">
      <MobileTop />
      <div className="mbody">
        <h1 className="serif" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 10px' }}>Start a Conversation</h1>
        <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 28px' }}>
          Have a vision for a new initiative or need architectural guidance? Let's map it out.
        </p>

        {[
          { m: "Hello. I'm Jeremy. To get started,", em: "what's your name?", ph: 'Type your name…' },
          { m: "What's the best email to reach you?", ph: 'email@example.com', faded: 0.5 },
          { m: "Finally, what would you like to talk about?", ph: 'I have an idea for…', faded: 0.3 },
        ].map((msg, i) => (
          <div key={i} style={{ marginBottom: 22, opacity: msg.faded ?? 1 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#c27a5c,#7a4532)', flexShrink: 0, marginTop: 2 }} />
              <div style={{
                background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '14px 14px 14px 4px',
                padding: '10px 14px', fontSize: 13, lineHeight: 1.5,
              }}>
                {msg.m} {msg.em && <a style={{ color: 'var(--accent)', fontWeight: 500 }}>{msg.em}</a>}
              </div>
            </div>
            <input placeholder={msg.ph} style={{
              marginLeft: 38, width: 'calc(100% - 38px)', padding: '8px 0 8px 10px', border: 'none',
              borderBottom: '1px solid var(--border-2)', background: 'transparent',
              fontFamily: 'Source Serif 4, Georgia, serif', fontStyle: 'italic',
              fontSize: 15, color: 'var(--ink)', outline: 'none',
            }} />
          </div>
        ))}

        <button className="btn btn-primary" style={{ marginLeft: 38, padding: '10px 22px', fontSize: 13 }}>
          Send {Icons.arrowRight}
        </button>
      </div>
      <MobileChat placeholder="Ask about Jeremy's work…" />
      <MobileNav active="contact" />
    </div>
  );
}

Object.assign(window, { MHome, MAbout, MProjects, MBlog, MBlogPost, MContact });
