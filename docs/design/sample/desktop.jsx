// Desktop page designs for Jeremy's site

// =========== HOME — Variation A (chips grid)
function HomeA() {
  const chips = [
    { label: 'Who is Jeremy?', icon: Icons.user },
    { label: 'See his work', icon: Icons.grid },
    { label: 'Read the blog', icon: Icons.book },
    { label: 'Work together', icon: Icons.mail },
  ];
  return (
    <div className="frame">
      <Sidebar active="about" />
      <div className="main">
        <div className="main-scroll" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
          <div style={{ textAlign: 'center', maxWidth: 560 }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%', margin: '0 auto 36px',
              background: 'linear-gradient(135deg,#c27a5c,#7a4532)',
              boxShadow: '0 0 0 4px var(--bg), 0 0 0 5px var(--border-2), 0 12px 40px rgba(184,92,60,0.18)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 35%, rgba(255,240,220,0.3) 0 22%, transparent 24%), radial-gradient(ellipse at 50% 80%, rgba(30,20,15,0.4) 0 40%, transparent 55%)' }} />
            </div>
            <h1 className="serif" style={{ fontSize: 54, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
              <StreamText text="Hello, I'm Jeremy" /> <span style={{ display: 'inline-block', animation: 'wave 1.4s ease-in-out 0.8s' }}>👋</span>
            </h1>
            <div style={{ color: 'var(--muted)', fontSize: 17, marginBottom: 44 }}>
              Product Engineer / Solo Builder · Writer
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 460, margin: '0 auto' }}>
              {chips.map(c => (
                <button key={c.label} className="chip" style={{ justifyContent: 'space-between', padding: '14px 18px', fontSize: 13.5 }}>
                  <span>{c.label}</span>
                  <span style={{ color: 'var(--subtle)', width: 14, height: 14 }}>{c.icon}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 80, fontSize: 11, color: 'var(--subtle)', letterSpacing: '0.1em' }}>
            © 2026 JEREMY NGUYEN · BUILT WITH INTENT
          </div>
        </div>
        <ChatBar placeholder="Ask anything about my work…" />
      </div>
    </div>
  );
}

// =========== HOME — Variation B (editorial with latest artifact)
function HomeB() {
  return (
    <div className="frame">
      <Sidebar active="about" />
      <div className="main">
        <div className="main-scroll" style={{ paddingTop: 72 }}>
          <div className="artifact">
            <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginRight: 8, verticalAlign: 'middle' }} />
              CURRENTLY ONLINE
            </div>
            <h1 className="serif" style={{ fontSize: 68, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 22px' }}>
              <StreamText text="Hi, I'm Jeremy." />
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 560, margin: '0 0 40px' }}>
              A Product Engineer and solo builder working on the seam between distributed systems and human cognition. I write, ship, and occasionally publish essays from my workshop.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { t: 'Read the essays', d: '28 pieces on systems & craft', i: Icons.book },
                { t: 'See the work', d: '12 shipped projects', i: Icons.compass },
                { t: 'About Jeremy', d: 'Bio, chronology, stack', i: Icons.user },
                { t: 'Start a conversation', d: 'Collaborations welcome', i: Icons.mail },
              ].map(c => (
                <div key={c.t} style={{
                  padding: '20px 22px', border: '1px solid var(--border)', borderRadius: 14,
                  background: 'var(--bg-alt)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, cursor: 'pointer',
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{c.t}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{c.d}</div>
                  </div>
                  <div style={{ color: 'var(--subtle)', width: 16, height: 16, flexShrink: 0 }}>{c.i}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 56, padding: 24, background: 'var(--bg-alt)', borderRadius: 16, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ fontSize: 10.5, letterSpacing: '0.16em', fontWeight: 600, color: 'var(--accent)' }}>LATEST ARTIFACT</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--subtle)' }}>OCT 18, 2026</span>
              </div>
              <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.2, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                The geometry of LLM context windows
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 14px', lineHeight: 1.6 }}>
                Exploring the spatial metaphors we use to understand attention mechanisms, and why the 'infinite' window is a design fallacy.
              </p>
              <a style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Read essay {Icons.arrowRight}
              </a>
            </div>
          </div>
        </div>
        <ChatBar />
      </div>
    </div>
  );
}

// =========== ABOUT
function AboutPage() {
  return (
    <div className="frame">
      <Sidebar active="about" />
      <div className="main">
        <div className="main-scroll">
          <div className="artifact">
            <div style={{ fontSize: 10.5, color: 'var(--accent)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 14 }}>COGNITIVE ARCHITECT</div>
            <h1 className="serif" style={{ fontSize: 52, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 28px' }}>
              Designing systems that think alongside humans.
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: 32, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--ink-2)' }}>
                <p style={{ margin: '0 0 16px' }}>
                  Jeremy Nguyen is a systems engineer turned digital curator. His work explores the delicate boundary between computational efficiency and the messy, beautiful reality of human cognition. Based at the intersection of engineering and editorial design.
                </p>
                <p style={{ margin: 0 }}>
                  For the past decade, I've focused on building "Cognitive Artifacts" — tools that don't just solve problems, but expand the user's capacity for thought. My approach treats code as a medium for curation.
                </p>
              </div>
              <div style={{
                width: 160, height: 200, borderRadius: 12,
                background: 'linear-gradient(160deg,#d08a65,#6b3a28)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(255,240,220,0.2) 0 25%, transparent 28%)' }} />
              </div>
            </div>

            <div style={{ marginTop: 48, padding: '24px 28px', borderLeft: '2px solid var(--accent)', background: 'var(--bg-alt)', borderRadius: '0 10px 10px 0' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--subtle)', fontWeight: 600, marginBottom: 8 }}>PHILOSOPHY</div>
              <p className="serif" style={{ fontStyle: 'italic', fontSize: 18, lineHeight: 1.5, margin: 0, color: 'var(--ink)' }}>
                "Every line of code is a stroke in a larger portrait of human progress."
              </p>
            </div>

            <div style={{ marginTop: 48 }}>
              <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent)', fontWeight: 600, marginBottom: 14 }}>TECHNICAL DOMAINS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Neural Architectures','Interface Semantics','Distributed Ledger Tech','Editorial Design Systems','Prompt Engineering','Graph Theory','Cognitive Ergonomics'].map(t => (
                  <span key={t} style={{ padding: '7px 14px', border: '1px solid var(--border-2)', borderRadius: 999, fontSize: 12.5, color: 'var(--ink-2)' }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 48 }}>
              <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent)', fontWeight: 600, marginBottom: 16 }}>CAREER TRAJECTORY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { yr: '2024 — PRESENT', t: 'Product Engineer & Solo Builder', o: 'Building AI-native products end-to-end. Fullstack engineering turned product.' },
                  { yr: '2021 — 2024', t: 'Senior Software Engineer', o: 'Shipped production systems across frontend, backend, and infrastructure.' },
                  { yr: '2019 — 2021', t: 'Software Engineer', o: 'Built real-time data systems and API platforms for early-stage products.' },
                  { yr: '2017 — 2019', t: 'Junior Developer', o: 'Built tooling and web infrastructure for ML inference systems.' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, padding: '18px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--subtle)', letterSpacing: '0.1em', paddingTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>{r.yr}</div>
                    <div>
                      <div className="serif" style={{ fontSize: 19, fontWeight: 500, fontStyle: 'italic', marginBottom: 4 }}>{r.t}</div>
                      <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6 }}>{r.o}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ChatBar placeholder="Ask about Jeremy's methodology…" />
      </div>
    </div>
  );
}

// =========== PROJECTS
function ProjectsPage() {
  const projects = [
    { t: 'Cognitive Nexus v2.0', cat: ['Neural Systems','Core Engine'], d: 'An experimental orchestration layer designed for multi-agent LLM systems, focusing on low-latency memory retrieval and state persistence across distributed nodes.', featured: true },
    { t: 'Silicon Whispers', cat: ['Hardware','Logic'], d: 'An exploration of analog signal noise in early 8-bit processors and its translation into generative musical patterns.' },
    { t: 'Semantic Diff', cat: ['Developer Tools','OSS'], d: 'A command-line utility for comparing the logical structure of two codebases rather than their literal bytes.' },
    { t: 'Ghost Protocol', cat: ['Security','Cryptography'], d: 'Encrypted messaging bridge utilizing steganography hidden within raw vector graphics metadata.' },
    { t: 'Fluid Interface', cat: ['UX Research','Prototypes'], d: 'Research paper and prototype on non-rectilinear UI containers and their impact on spatial navigation and recall.' },
  ];
  return (
    <div className="frame">
      <Sidebar active="projects" />
      <div className="main">
        <div className="main-scroll">
          <div className="artifact">
            <div style={{ fontSize: 10.5, color: 'var(--subtle)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 12 }}>PORTFOLIO · ARCHIVE 2026</div>
            <h1 className="serif" style={{ fontSize: 56, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '0 0 14px' }}>Selected Artifacts</h1>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 32px', maxWidth: 540 }}>
              A curated repository of technical experiments, cognitive architectures, and digital systems explored at the intersection of AI and human engineering.
            </p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
              {['All','Systems','AI','OSS','Writing','Prototype'].map((f, i) => (
                <span key={f} style={{
                  padding: '6px 14px', borderRadius: 999, fontSize: 12, letterSpacing: '0.04em',
                  border: '1px solid var(--border-2)',
                  background: i === 0 ? 'var(--ink)' : 'transparent',
                  color: i === 0 ? 'var(--bg)' : 'var(--muted)',
                }}>{f}</span>
              ))}
            </div>

            {projects.map((p, i) => (
              <div key={p.t} style={{
                padding: '28px 0',
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: p.featured ? '220px 1fr' : '1fr',
                gap: p.featured ? 28 : 0,
              }}>
                {p.featured && (
                  <div style={{
                    width: 220, height: 140, borderRadius: 10, overflow: 'hidden',
                    background: 'linear-gradient(135deg,#3a2620,#6b3a28 60%,#c27a5c)', position: 'relative',
                  }}>
                    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                      <defs><pattern id={`p${i}`} width="22" height="22" patternUnits="userSpaceOnUse">
                        <circle cx="11" cy="11" r="0.6" fill="#f4d4b5"/></pattern></defs>
                      <rect width="100%" height="100%" fill={`url(#p${i})`} />
                      <g stroke="#f4d4b5" strokeWidth="0.4" fill="none" opacity="0.5">
                        <path d="M20 20 L200 120 M20 120 L200 20 M100 20 L100 120 M20 70 L200 70"/>
                      </g>
                    </svg>
                  </div>
                )}
                <div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                    {p.cat.map(c => <span key={c} className="tag">{c}</span>)}
                  </div>
                  <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.01em', margin: '0 0 10px' }}>{p.t}</h2>
                  <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 12px' }}>{p.d}</p>
                  {p.featured && (
                    <a style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      EXPLORE TECHNICAL SPECS {Icons.arrowRight}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChatBar placeholder="Query the archive…" />
      </div>
    </div>
  );
}

// =========== BLOG LIST
function BlogPage() {
  const posts = [
    { d: 'OCT 24, 2026', cat: 'SYSTEM DESIGN', t: 'The Geometry of LLM Context Windows', ex: 'Exploring the spatial metaphors we use to understand attention mechanisms and why the "infinite" window is a design fallacy.', img: 1 },
    { d: 'SEPT 12, 2026', cat: 'PHILOSOPHY', t: 'Latent Spaces as Digital Archives', ex: 'Why we should treat AI weights not as code, but as a living curatorship of human knowledge and cultural artifacts.', img: 2 },
    { d: 'AUG 05, 2026', cat: 'TUTORIAL', t: 'Building for the 100ms Human', ex: 'Optimizing interface reactivity in the age of asynchronous API calls. A guide to perceived performance.', img: 3 },
    { d: 'JULY 18, 2026', cat: 'ESSAY', t: 'On Writing Less Code', ex: 'The paradox of seniority is that your main job becomes deleting what your juniors built. A defense of subtraction.', img: null },
  ];
  return (
    <div className="frame">
      <Sidebar active="blog" />
      <div className="main">
        <div className="main-scroll">
          <div className="artifact">
            <div style={{ fontSize: 10.5, color: 'var(--accent)', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 14 }}>THE ARCHIVE</div>
            <h1 className="serif" style={{ fontSize: 52, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 40px' }}>
              Thoughts on <em style={{ fontStyle: 'italic' }}>Cognitive Architecture</em> and the Machine Era.
            </h1>

            {posts.map((p, i) => (
              <article key={p.t} style={{
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: '1px solid var(--border)',
                padding: '24px 0',
                display: 'grid',
                gridTemplateColumns: p.img ? '1fr 180px' : '1fr',
                gap: 28, alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--subtle)', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>{p.d}</span>
                    <span style={{ width: 3, height: 3, background: 'var(--subtle)', borderRadius: 2 }} />
                    <span className="tag accent">{p.cat}</span>
                  </div>
                  <h2 className="serif" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.01em', margin: '0 0 10px' }}>{p.t}</h2>
                  <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65, margin: 0, maxWidth: 460 }}>{p.ex}</p>
                </div>
                {p.img && (
                  <div style={{
                    width: 180, height: 120, borderRadius: 8, overflow: 'hidden',
                    background: p.img === 1 ? 'radial-gradient(circle at 40% 50%,#8a6a54 0%,#2c211d 70%)' :
                               p.img === 2 ? 'linear-gradient(160deg,#4a3d33,#1c1612)' :
                               'linear-gradient(135deg,#6b4a38,#2c1e17)',
                    position: 'relative',
                  }}>
                    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
                      {p.img === 1 && (
                        <g stroke="#f4d4b5" strokeWidth="0.4" fill="none">
                          {Array.from({length: 20}).map((_, j) => (
                            <line key={j} x1="90" y1="60" x2={90 + 80*Math.cos(j*0.32)} y2={60 + 50*Math.sin(j*0.32)} />
                          ))}
                          <circle cx="90" cy="60" r="3" fill="#f4d4b5" stroke="none"/>
                        </g>
                      )}
                      {p.img === 2 && <g fill="#d4a876">{Array.from({length: 6}).map((_,j) => (<rect key={j} x={20+j*25} y={40-j*4} width="20" height="60" opacity={0.3+j*0.1}/>))}</g>}
                      {p.img === 3 && <g fill="none" stroke="#f4d4b5" strokeWidth="0.6"><path d="M10 100 L40 40 L70 80 L100 30 L140 90 L170 50"/><path d="M10 80 L40 30 L70 60 L100 20 L140 70"/></g>}
                    </svg>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
        <ChatBar placeholder="Search the archive…" />
      </div>
    </div>
  );
}

// =========== BLOG POST
function BlogPost() {
  return (
    <div className="frame">
      <Sidebar active="blog" />
      <div className="main">
        <div className="main-scroll">
          <div className="artifact" style={{ maxWidth: 660 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{Icons.arrowRight}<span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}></span></span>
              <a style={{ color: 'var(--muted)' }}>← Back to archive</a>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
              <span className="tag accent">SYSTEM DESIGN</span>
              <span style={{ fontSize: 11, color: 'var(--subtle)', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>OCT 24, 2026 · 12 MIN READ</span>
            </div>
            <h1 className="serif" style={{ fontSize: 52, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 22px' }}>
              The Geometry of LLM Context Windows
            </h1>
            <p style={{ fontSize: 19, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 36px', fontWeight: 400 }}>
              Exploring the spatial metaphors we use to understand attention, and why the 'infinite' window is a design fallacy more than a technical limit.
            </p>

            <div style={{
              height: 260, borderRadius: 14, marginBottom: 40, overflow: 'hidden',
              background: 'radial-gradient(circle at 50% 50%,#8a6a54 0%,#2c211d 75%)', position: 'relative',
            }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                <g stroke="#f4d4b5" strokeWidth="0.5" fill="none" opacity="0.6">
                  {Array.from({length: 40}).map((_, j) => {
                    const a = j * 0.18;
                    return <line key={j} x1="50%" y1="50%" x2={`${50 + 45*Math.cos(a)}%`} y2={`${50 + 40*Math.sin(a)}%`} />;
                  })}
                  <circle cx="50%" cy="50%" r="4" fill="#f4d4b5" stroke="none"/>
                </g>
              </svg>
            </div>

            <div className="serif" style={{ fontSize: 18, lineHeight: 1.72, color: 'var(--ink-2)' }}>
              <p style={{ margin: '0 0 22px' }}>
                <span style={{ fontSize: 56, float: 'left', lineHeight: 0.9, marginRight: 10, marginTop: 8, fontWeight: 500, color: 'var(--accent)' }}>W</span>
                hen we talk about a model's <em>context</em>, we tend to reach for the metaphor of a window — something framed, rectangular, a measure of how much of the world can be held at once. But the window is the wrong geometry. Attention is not a pane; it is a field.
              </p>
              <p style={{ margin: '0 0 22px' }}>
                The field is dense near the edges we've just touched and sparse in the middle distance. Doubling the window size does not double the clarity; it doubles the haze. A longer context without a sharper prior is not more memory — it is more fog.
              </p>
              <h2 className="serif" style={{ fontSize: 30, fontWeight: 500, margin: '40px 0 14px', letterSpacing: '-0.01em', color: 'var(--ink)' }}>Position is meaning</h2>
              <p style={{ margin: '0 0 22px' }}>
                The first token we feed a model is not the first thought — it is the first gesture. Everything downstream bends toward it. When we ignore this, we get models that behave like encyclopedias without tables of contents: technically complete, practically unusable.
              </p>
              <blockquote style={{
                borderLeft: '3px solid var(--accent)', padding: '4px 0 4px 20px', margin: '28px 0', fontStyle: 'italic',
                fontSize: 21, color: 'var(--ink)', lineHeight: 1.45,
              }}>
                "Memory without curation is just noise that hasn't been forgotten yet."
              </blockquote>
              <p style={{ margin: '0 0 22px' }}>
                What we want instead is a <em>mental topography</em> — a shape to the context that encodes not just what has been said, but where it sits in the reader's intent.
              </p>
            </div>

            <div style={{ marginTop: 60, padding: 24, background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 14, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#c27a5c,#7a4532)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>Written by Jeremy Nguyen</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Systems, essays, and occasional experiments. <span style={{ color: 'var(--accent)' }}>Subscribe →</span></div>
              </div>
            </div>
          </div>
        </div>
        <ChatBar placeholder="Ask about this essay…" />
      </div>
    </div>
  );
}

// =========== CONTACT
function ContactPage() {
  return (
    <div className="frame">
      <Sidebar active="contact" />
      <div className="main">
        <div className="main-scroll">
          <div className="artifact">
            <h1 className="serif" style={{ fontSize: 44, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 14px' }}>Start a Conversation</h1>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 40px', maxWidth: 440 }}>
              Have a vision for a new initiative or need architectural guidance on an AI project? Let's map it out.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
              {[
                { m: "Hello. I'm Jeremy. I'm excited to hear about what you're building. To get started,", em: "what's your name?", ph: 'Type your name…' },
                { m: "Nice to meet you. What's email address should I use to follow up with you?", ph: 'email@example.com', faded: 0.55 },
                { m: "Finally, what would you like to talk about? Feel free to be as detailed as you like about your initiative.", ph: 'I have an idea for…', faded: 0.35 },
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: msg.faded ?? 1 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#c27a5c,#7a4532)', flexShrink: 0, marginTop: 2 }} />
                    <div style={{
                      background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '16px 16px 16px 4px',
                      padding: '12px 18px', fontSize: 14.5, lineHeight: 1.55, maxWidth: 440,
                    }}>
                      {msg.m} {msg.em && <a style={{ color: 'var(--accent)', fontWeight: 500 }}>{msg.em}</a>}
                    </div>
                  </div>
                  <input placeholder={msg.ph} style={{
                    marginLeft: 44, padding: '10px 2px 10px 14px', border: 'none',
                    borderBottom: '1px solid var(--border-2)', background: 'transparent',
                    fontFamily: 'Source Serif 4, Georgia, serif', fontStyle: 'italic',
                    fontSize: 17, color: 'var(--ink)', outline: 'none',
                  }} />
                </div>
              ))}

              <div style={{ marginLeft: 44, marginTop: 10 }}>
                <button className="btn btn-primary" style={{ padding: '12px 26px', fontSize: 13.5 }}>
                  Send conversation {Icons.arrowRight}
                </button>
              </div>

              <div style={{
                position: 'absolute', top: 40, right: -40, width: 260, padding: '18px 20px',
                background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 14,
                boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
              }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>
                  <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', marginRight: 7, verticalAlign: 'middle' }} />CURRENT WORK
                </div>
                <div className="serif" style={{ fontSize: 17, fontStyle: 'italic', lineHeight: 1.3, margin: '0 0 8px' }}>Neural Architecture for LLM Orchestration</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55, margin: '0 0 14px' }}>A study on efficient prompt routing and vector memory optimization.</div>
                <a style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', fontWeight: 600 }}>VIEW PAPER →</a>
              </div>
            </div>
          </div>
        </div>
        <ChatBar placeholder="Ask anything about Jeremy's work…" />
      </div>
    </div>
  );
}

Object.assign(window, { HomeA, HomeB, AboutPage, ProjectsPage, BlogPage, BlogPost, ContactPage });
