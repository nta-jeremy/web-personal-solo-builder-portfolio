// Shared UI building blocks for Jeremy site canvas
// Global: Sidebar, ChatBar, MobileTop, MobileNav, MobileChat, Icons, StreamText

const Icons = {
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/></svg>,
  compass: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M12 12l-2.5 4.5L14 14l-2-2z" fill="currentColor" stroke="none"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M4 17a3 3 0 0 1 3-3h12"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2L5 6l-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5z"/></svg>,
  help: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4M12 17.5v.1"/></svg>,
  sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>,
  moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg>,
  arrowUp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a4 4 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.5.2 2.6.1 2.8a4 4 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>,
  external: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17L17 7M9 7h8v8"/></svg>,
};

function Sidebar({ active = 'about' }) {
  const items = [
    { id: 'about', label: 'About', icon: Icons.user },
    { id: 'projects', label: 'Projects', icon: Icons.compass },
    { id: 'blog', label: 'Blog', icon: Icons.book },
    { id: 'contact', label: 'Contact', icon: Icons.mail },
  ];
  return (
    <aside className="sidebar">
      <div className="side-head">
        <div className="avatar" />
        <div>
          <div className="side-name">Jeremy Nguyen</div>
          <div className="side-title">Product Engineer / Solo Builder</div>
        </div>
      </div>
      <nav className="side-nav">
        {items.map(i => (
          <div key={i.id} className={'side-item' + (active === i.id ? ' active' : '')}>
            {i.icon}<span>{i.label}</span>
          </div>
        ))}
      </nav>
      <div className="side-foot">
        <div className="side-mini">{Icons.globe}<span>EN · VI</span></div>
        <div className="side-mini">{Icons.gear}<span>Settings</span></div>
        <div className="side-mini">{Icons.help}<span>Support</span></div>
      </div>
    </aside>
  );
}

function ChatBar({ placeholder = "Ask anything about my work…" }) {
  return (
    <div className="chatbar">
      <div className="chatbar-icon">{Icons.sparkle}</div>
      <input className="chatbar-input" placeholder={placeholder} />
      <div className="chatbar-meta">Privacy</div>
      <button className="chatbar-send">{Icons.arrowUp}</button>
    </div>
  );
}

function MobileTop({ title = 'Jeremy' }) {
  return (
    <div className="mtop">
      <div style={{ color: 'var(--ink)' }}>{Icons.menu}</div>
      <div className="mtop-title">{title}</div>
      <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}>
        <span style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>文A</span>
      </div>
    </div>
  );
}

function MobileChat({ placeholder = "Ask about Jeremy's work…" }) {
  return (
    <div className="mchatbar">
      <div style={{ color: 'var(--subtle)', display: 'flex' }}>{Icons.search}</div>
      <input className="mchatbar-input" placeholder={placeholder} />
      <button className="mchatbar-send">{Icons.arrowUp}</button>
    </div>
  );
}

function MobileNav({ active = 'about' }) {
  const items = [
    { id: 'about', label: 'About', icon: Icons.user },
    { id: 'projects', label: 'Projects', icon: Icons.grid },
    { id: 'blog', label: 'Blog', icon: Icons.book },
    { id: 'contact', label: 'Contact', icon: Icons.mail },
  ];
  return (
    <div className="mnav">
      {items.map(i => (
        <div key={i.id} className={'mnav-item' + (active === i.id ? ' active' : '')}>
          {i.icon}<span>{i.label}</span>
        </div>
      ))}
    </div>
  );
}

// Streaming text — word by word via CSS animation delay
function StreamText({ text, delay = 0, speed = 40 }) {
  const words = text.split(' ');
  return (
    <span className="stream">
      {words.map((w, i) => (
        <span key={i} style={{ animationDelay: `${delay + i * speed}ms` }}>
          {w}{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

Object.assign(window, { Icons, Sidebar, ChatBar, MobileTop, MobileChat, MobileNav, StreamText });
