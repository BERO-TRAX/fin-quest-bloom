import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import finquestLogo from '@/assets/finquest-logo.png'

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        filter: visible ? 'blur(0px)' : 'blur(4px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Animated background orbs ── */
function AnimatedOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: 'hsl(var(--brand-green))', animation: 'orb-float-1 12s ease-in-out infinite' }}
      />
      <div
        className="absolute right-[20%] top-[30%] h-[250px] w-[250px] rounded-full opacity-[0.08] blur-[100px]"
        style={{ background: 'hsl(var(--primary))', animation: 'orb-float-2 15s ease-in-out infinite' }}
      />
      <div
        className="absolute left-[50%] bottom-[15%] h-[200px] w-[200px] rounded-full opacity-[0.07] blur-[80px]"
        style={{ background: 'hsl(var(--brand-green))', animation: 'orb-float-3 18s ease-in-out infinite' }}
      />
      <div
        className="absolute right-[35%] top-[60%] h-[120px] w-[120px] rounded-full opacity-[0.05] blur-[60px]"
        style={{ background: 'hsl(var(--brand-green))', animation: 'orb-float-1 20s ease-in-out infinite reverse' }}
      />
    </div>
  )
}

/* ── Logo component ── */
function LogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={finquestLogo} alt="FinQuest logo" className="h-10 w-10 object-contain drop-shadow-[0_0_8px_hsl(var(--brand-green)/0.4)]" />
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight">FinQuest</div>
        <div className="text-[11px] text-muted-foreground">FinTech x EdTech RPG</div>
      </div>
    </div>
  )
}

/* ── Section title ── */
function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow ? <div className="text-xs font-semibold text-brand-green">{eyebrow}</div> : null}
        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-pretty text-muted-foreground">{description}</p> : null}
      </div>
    </Reveal>
  )
}

/* ── Icons ── */
function Icon({ name }: { name: 'spark' | 'brain' | 'shield' | 'map' | 'coin' | 'users' }) {
  const cls = "text-brand-green"
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" as const, "aria-hidden": true as const, className: cls }
  const s = { stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  if (name === 'spark') return <svg {...props}><path d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z" {...s}/><path d="M20 13l.8 2.8L23 17l-2.2.8L20 21l-.8-3.2L17 17l2.2-1.2L20 13Z" {...s}/><path d="M4 12l.9 2.4L7 15l-2.1.6L4 18l-.9-2.4L1 15l2.1-.6L4 12Z" {...s}/></svg>
  if (name === 'brain') return <svg {...props}><path d="M9 4a3 3 0 0 0-3 3v1a2 2 0 0 0 0 4v1a3 3 0 0 0 3 3" {...s}/><path d="M15 4a3 3 0 0 1 3 3v1a2 2 0 0 1 0 4v1a3 3 0 0 1-3 3" {...s}/><path d="M9 4c0 1.2.7 2 3 2s3-.8 3-2" {...s}/><path d="M9 12h6" {...s}/></svg>
  if (name === 'map') return <svg {...props}><path d="M10 6 4 9v12l6-3 4 3 6-3V6l-6 3-4-3Z" {...s}/><path d="M10 6v12" {...s}/><path d="M14 9v12" {...s}/></svg>
  if (name === 'coin') return <svg {...props}><path d="M12 3c5 0 9 2 9 4s-4 4-9 4-9-2-9-4 4-4 9-4Z" {...s}/><path d="M21 7v10c0 2-4 4-9 4s-9-2-9-4V7" {...s}/><path d="M7.5 12.5c1.2 1 2.8 1.5 4.5 1.5s3.3-.5 4.5-1.5" {...s}/></svg>
  if (name === 'users') return <svg {...props}><path d="M16 20v-2c0-1.1-1-2-2.2-2H10.2C9 16 8 16.9 8 18v2" {...s}/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" {...s}/><path d="M20 20v-2c0-1-1-1.8-2.1-2" {...s}/><path d="M17.5 4.7a4 4 0 0 1 0 7.1" {...s}/></svg>
  return <svg {...props}><path d="M12 2 20 6v7c0 5-3.5 9-8 9s-8-4-8-9V6l8-4Z" {...s}/><path d="M9.5 12.3 11.3 14l3.5-4" {...s}/></svg>
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-brand-green/20 bg-brand-green/5 px-4 py-3">
      <div className="text-xl font-semibold tracking-tight text-brand-green">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay = 0 }: { icon?: ReactNode; title: string; description: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft backdrop-blur-sm transition-[box-shadow,transform] duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1">
        {icon ? <div className="h-10 w-10 rounded-2xl bg-brand-green/10 ring-1 ring-brand-green/20 flex items-center justify-center">{icon}</div> : null}
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Reveal>
  )
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-3xl border border-border bg-secondary/40 overflow-hidden backdrop-blur-sm transition-colors duration-200 hover:bg-secondary/60">
      <button type="button" className="w-full p-5 text-left" onClick={onToggle} aria-expanded={open}>
        <div className="flex items-start justify-between gap-4">
          <div className="text-[15px] font-semibold tracking-tight">{q}</div>
          <div className="mt-0.5 text-brand-green transition-transform duration-200" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</div>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>
      </div>
    </div>
  )
}

/* ── Main Page ── */
export default function Index() {
  const nav = useMemo(() => [
    { label: 'How It Works', href: '#how-it-works', isRoute: false },
    { label: 'Modules', href: '#modules', isRoute: false },
    { label: 'UX & Trust', href: '#trust', isRoute: false },
    { label: 'FAQ', href: '#faq', isRoute: false },
    { label: 'About Us', href: '/about', isRoute: true },
  ], [])

  const [introReady, setIntroReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setIntroReady(true), 200)
    return () => clearTimeout(t)
  }, [])

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [mobileOpen, setMobileOpen] = useState(false)

  const features = useMemo(() => [
    { icon: <Icon name="brain" />, title: 'Psychology, Not Points', description: 'Gamification driven by self-determination: autonomy, competence, and relatedness — with feedback at the right moment.' },
    { icon: <Icon name="spark" />, title: 'Instant Reward', description: 'Progress is visible immediately: visual cues for your actions and learning that kicks in when you need it.' },
    { icon: <Icon name="map" />, title: 'Scaffolding Complexity', description: 'We break financial concepts into small, achievable goals that build toward "financial freedom."' },
    { icon: <Icon name="users" />, title: 'Goal-Based Community', description: 'Guilds and cooperative missions that motivate without creating toxic comparison.' },
    { icon: <Icon name="coin" />, title: 'Simulation With Purpose', description: 'We demonstrate the impact of decisions (like interest, debt, and cash flow) through interactive scenarios.' },
    { icon: <Icon name="shield" />, title: 'Trust & Security', description: 'Designed with transparency: clear messaging, accessibility, and UX that respects the seriousness of finance.' },
  ], [])

  const steps = useMemo(() => [
    { title: 'Onboarding & Digital Twin', description: 'A short assessment determines your starting level and adjusts simulation difficulty.' },
    { title: 'Command Center', description: 'Daily quests + a Health Bar tracking progress toward your financial well-being.' },
    { title: 'Simulation Arena', description: 'Virtual time, drag-and-drop budgeting, and life decisions with realistic consequences.' },
    { title: 'Academy: Just-in-Time', description: 'When the game challenges you, it instantly shows a lesson that solves the specific problem.' },
    { title: 'Social Hub', description: 'Guilds that train habits together — with challenges oriented toward sustainable progress.' },
  ], [])

  const modules = useMemo(() => [
    { key: 'survival', title: '1. Survival Basics', mechanic: '30-Day Detox', desc: 'Income/expenses, needs vs. wants, and emergency fund.' },
    { key: 'debt', title: '2. Debt Slayer', mechanic: 'Avalanche vs. Snowball', desc: 'Types of debt, interest rates, and exit strategies.' },
    { key: 'budget', title: '3. Budgeting & Planning', mechanic: 'Build Your Budget', desc: '50/30/20 rule, cash flow forecasting, and scenarios.' },
    { key: 'invest', title: '4. Investing 101', mechanic: 'Training Portfolio', desc: 'Risk, return, and compound interest without real market risk.' },
    { key: 'guard', title: '5. Protection & Security', mechanic: 'Scenario Quests', desc: 'Scam detection, insurance, and cyber hygiene.' },
    { key: 'wealth', title: '6. Financial Freedom', mechanic: 'Fast Track Mode', desc: 'Passive income, FIRE, tax planning, and real estate.' },
  ], [])

  const faq = useMemo(() => [
    { q: 'Are points and leaderboards the core?', a: 'No. Points are just visual indicators of progress. The core is motivation (autonomy/competence/relatedness) and learning that guides you to make better decisions.' },
    { q: 'Is this a gambling game?', a: 'The simulations are educational: outcomes follow the logic of your decisions (risk/return/resources), not RNG that punishes or randomly rewards.' },
    { q: 'How much time do I need?', a: 'Designed for micro-lessons and sessions of about 5–10 minutes. Every session ends with concrete progress and a clear next step.' },
    { q: 'Is it accessible and respectful?', a: 'Yes. Trust means clear messaging, accessible interfaces, and UX without dark patterns. We aim for a serious yet engaging design.' },
    { q: 'What do I actually get after training?', a: 'Not just knowledge, but habits: better budgeting, sustainable decisions, and progress toward financial goals — measurable through a Financial Wellness Score.' },
  ], [])

  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0)

  return (
    <div className="min-h-screen text-foreground bg-noise">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
        Skip to content
      </a>

      {/* ── NAVBAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500"
        style={{ paddingTop: scrolled ? '8px' : '16px' }}
      >
        <nav
          className="flex items-center gap-1 rounded-full border border-border/60 px-2 py-1.5 backdrop-blur-xl transition-all duration-500"
          style={{
            background: scrolled
              ? 'hsla(228, 24%, 8%, 0.75)'
              : 'hsla(228, 24%, 8%, 0.45)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.06)'
              : '0 4px 20px rgba(0,0,0,0.2), inset 0 0.5px 0 rgba(255,255,255,0.04)',
          }}
          aria-label="Navigation"
        >
          <Link to="/" className="flex items-center gap-2 rounded-full px-3 py-1.5 nav-liquid-link" aria-label="FinQuest">
            <img src={finquestLogo} alt="FinQuest" className="relative z-10 h-8 w-8 object-contain drop-shadow-[0_0_6px_hsl(var(--brand-green)/0.3)]" />
            <span className="relative z-10 text-sm font-semibold tracking-tight hidden sm:inline text-foreground">FinQuest</span>
          </Link>

          <div className="hidden md:flex items-center">
            {nav.map((item) => (
              item.isRoute ? (
                <Link key={item.href} to={item.href} className="nav-liquid-link">
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ) : (
                <a key={item.href} href={item.href} className="nav-liquid-link">
                  <span className="relative z-10">{item.label}</span>
                </a>
              )
            ))}
          </div>

          <button
            type="button"
            className="md:hidden nav-liquid-link"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
          >
            <span className="relative z-10">{mobileOpen ? '✕' : '☰'}</span>
          </button>
        </nav>

        {mobileOpen && (
          <div
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border/60 backdrop-blur-xl p-2"
            style={{
              background: 'hsla(228, 24%, 8%, 0.9)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              animation: 'hero-badge-pop 0.3s cubic-bezier(0.16,1,0.3,1) both',
            }}
          >
            {nav.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-brand-green/10 hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-brand-green/10 hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
        )}
      </header>

      <main id="content">
        {/* ══════════ PERSISTENT HERO ══════════ */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <AnimatedOrbs />

          {/* Radial glow behind hero */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, hsl(var(--brand-green)), transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            {/* Logo */}
            <div
              style={{
                opacity: introReady ? 1 : 0,
                transform: introReady ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                filter: introReady ? 'blur(0px)' : 'blur(8px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0ms',
              }}
            >
              <img
                src={finquestLogo}
                alt=""
                className="mx-auto h-24 w-24 object-contain drop-shadow-[0_0_40px_hsl(var(--brand-green)/0.4)]"
              />
            </div>

            {/* Headline */}
            <h1
              className="mt-8 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
              style={{
                lineHeight: '1.05',
                opacity: introReady ? 1 : 0,
                transform: introReady ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.92)',
                filter: introReady ? 'blur(0px)' : 'blur(12px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
              }}
            >
              Financial literacy<br />
              <span className="text-brand-green">as an epic quest.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mt-6 max-w-lg text-base text-muted-foreground sm:text-lg"
              style={{
                opacity: introReady ? 1 : 0,
                transform: introReady ? 'translateY(0)' : 'translateY(24px)',
                filter: introReady ? 'blur(0px)' : 'blur(6px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 500ms',
              }}
            >
              Learn. Play. Build lasting financial habits.
            </p>

            {/* CTA */}
            <div
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              style={{
                opacity: introReady ? 1 : 0,
                transform: introReady ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 700ms',
              }}
            >
              <Link to="/about" className="inline-flex items-center justify-center rounded-2xl bg-brand-green px-6 py-3 text-sm font-semibold text-background shadow-[0_4px_24px_hsl(var(--brand-green)/0.3)] hover:bg-brand-green/90 active:scale-[0.97] transition-all duration-200">
                Launch the App
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-2xl border border-brand-green/30 bg-brand-green/5 px-6 py-3 text-sm font-semibold text-foreground/90 hover:bg-brand-green/10 transition-all duration-200 active:scale-[0.97]">
                See How It Works
              </a>
            </div>

            {/* Line */}
            <div
              className="mx-auto mt-8 h-px w-32 bg-brand-green/40"
              style={{
                transform: introReady ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 900ms',
              }}
            />

            {/* Scroll hint */}
            <div className="mt-12" style={{ opacity: introReady ? 1 : 0, transition: 'opacity 1s ease 1.2s' }}>
              <a href="#about" className="inline-flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-brand-green/80 transition-colors">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-60" style={{ animation: 'scroll-hint 2s ease-in-out infinite' }}>
                  <path d="M8 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ══════════ ABOUT ══════════ */}
        <section id="about" className="relative overflow-hidden">
          <AnimatedOrbs />
          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-20 sm:pb-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Reveal delay={0}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-2 text-xs font-semibold text-brand-green">
                    <span className="inline-block h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                    Strategic analysis of gamification for financial education
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl" style={{ lineHeight: '1.1' }}>
                    Where RPG simulation meets <span className="text-brand-green">real-world finance.</span>
                  </h2>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    FinQuest combines RPG simulation (inspired by Cashflow) with psychology-driven gamification:
                    autonomy, competence, and relatedness. The goal isn't "a game for points" — it's lasting financial habits.
                  </p>
                </Reveal>

                <Reveal delay={400}>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <StatPill value="5–10 min" label="micro-lesson sessions" />
                    <StatPill value="Just-in-Time" label="learning on demand" />
                    <StatPill value="No RNG" label="logic-based scenarios" />
                  </div>
                </Reveal>
              </div>

              {/* Command Center Mock */}
              <Reveal delay={200}>
                <div className="relative">
                  <div className="rounded-3xl border border-border bg-secondary/40 p-5 shadow-soft backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground">Command Center</div>
                        <div className="mt-1 text-lg font-semibold">North Star: "Buy a Home"</div>
                      </div>
                      <div className="rounded-2xl bg-brand-green/10 px-3 py-2 text-xs font-semibold text-brand-green ring-1 ring-brand-green/20">
                        Financial Readiness: 72%
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="rounded-2xl border border-border bg-background/30 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold">Daily Quest #1</div>
                            <div className="text-xs text-muted-foreground">Identify the interest in "compound interest"</div>
                          </div>
                          <div className="rounded-xl bg-brand-green/15 px-3 py-2 text-xs font-semibold text-brand-green ring-1 ring-brand-green/20">
                            Done
                          </div>
                        </div>
                        <div className="mt-3 h-2 w-full rounded-full bg-secondary overflow-hidden">
                          <div className="h-2 w-[70%] rounded-full bg-brand-green transition-all duration-1000" />
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-background/30 p-4">
                          <div className="text-xs font-semibold text-muted-foreground">Next Mission</div>
                          <div className="mt-1 text-sm font-semibold">Choose "Avalanche"</div>
                          <div className="mt-2 text-xs text-muted-foreground">for faster debt clearance</div>
                        </div>
                        <div className="rounded-2xl border border-border bg-background/30 p-4">
                          <div className="text-xs font-semibold text-muted-foreground">Tip</div>
                          <div className="mt-1 text-sm font-semibold">Just-in-Time Lesson</div>
                          <div className="mt-2 text-xs text-muted-foreground">where risk matters most</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-brand-green/5 p-4 ring-1 ring-brand-green/10">
                      <div className="text-xs font-semibold text-muted-foreground">Why This Works</div>
                      <div className="mt-1 text-sm text-foreground/80">
                        When progress is visible instantly, competence grows, autonomy remains your choice, and
                        the community keeps you motivated.
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:pb-20">
          <SectionTitle
            eyebrow="FinQuest in 60 Seconds"
            title="A learning system that builds habits"
            description={'Not just "read and memorize" — practice decisions in a simulation, see the consequences, and get a lesson in the moment.'}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} delay={i * 80} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <SectionTitle
              eyebrow="Core Loop"
              title="How a mission unfolds"
              description="Example flow: from onboarding to simulation, academy, and social support."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-5">
              {steps.map((s, idx) => (
                <Reveal key={s.title} delay={idx * 100}>
                  <div className="h-full lg:col-span-1 rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft backdrop-blur-sm transition-[box-shadow] duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-bold tracking-wide text-brand-green ring-1 ring-brand-green/20 bg-brand-green/10 px-3 py-1 rounded-full">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="mt-4 text-lg font-semibold tracking-tight">{s.title}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{s.description}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section id="modules" className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pb-20">
          <SectionTitle
            eyebrow="Academy Modules"
            title="Curriculum as a knowledge map"
            description={'Six "worlds" from basics to financial freedom. Each module is tied to a specific simulation mechanic.'}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {modules.map((m, i) => (
              <Reveal key={m.key} delay={i * 80}>
                <div className="rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft backdrop-blur-sm transition-[box-shadow,transform] duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-foreground/90">{m.title}</div>
                      <div className="mt-2 text-xs font-semibold text-brand-green ring-1 ring-brand-green/20 bg-brand-green/10 inline-flex rounded-full px-3 py-1">
                        Mechanic: {m.mechanic}
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-brand-green/10 ring-1 ring-brand-green/20 flex items-center justify-center text-brand-green font-bold text-xs">
                      {m.key === 'survival' ? 'SF' : m.key === 'debt' ? 'DS' : m.key === 'budget' ? 'AR' : m.key === 'invest' ? 'IV' : m.key === 'guard' ? 'GD' : 'WT'}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section id="trust">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <SectionTitle
              eyebrow="UX & Trust"
              title="Playing seriously"
              description="Financial topics demand transparency and respect. That's why the gamification is subtle: it encourages without manipulating."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <Reveal delay={0}>
                <div className="h-full rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft backdrop-blur-sm">
                  <h3 className="text-lg font-semibold tracking-tight">Trust Architecture</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Instead of dark patterns, FinQuest uses clear messaging, unobtrusive security indicators, and progressive disclosure of details.
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-border bg-background/30 p-4">
                      <div className="text-sm font-semibold">Progressive Disclosure</div>
                      <div className="mt-1 text-sm text-muted-foreground">Dashboard overview + details in 1–2 clicks.</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/30 p-4">
                      <div className="text-sm font-semibold">Accessibility</div>
                      <div className="mt-1 text-sm text-muted-foreground">Sufficient contrast, clear focus states, and comfortable navigation.</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="h-full rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft backdrop-blur-sm">
                  <h3 className="text-lg font-semibold tracking-tight">Ethical Gamification</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Confetti and visual rewards are the "frame" for progress, but behavior is directed toward sustainable decisions.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-background/30 p-4">
                      <div className="text-xs font-semibold text-muted-foreground">Reward</div>
                      <div className="mt-1 text-sm font-semibold text-brand-green">for the right move</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/30 p-4">
                      <div className="text-xs font-semibold text-muted-foreground">Lesson</div>
                      <div className="mt-1 text-sm font-semibold text-brand-green">at the right moment</div>
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl bg-brand-green/5 p-4 ring-1 ring-brand-green/10">
                    <div className="text-xs font-semibold text-muted-foreground">Call to Action</div>
                    <div className="mt-1 text-sm text-foreground/80">
                      Want to see a prototype? Click "Explore Demo Vision" and browse the modules below.
                    </div>
                    <a href="#modules" className="mt-3 inline-flex items-center justify-center rounded-2xl bg-brand-green/10 px-4 py-2 text-sm font-semibold text-brand-green hover:bg-brand-green/20 active:scale-[0.97] transition-all">
                      Go to Modules
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pb-20">
          <SectionTitle
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers about the approach, simulations, and what you gain after training."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faq.map((item, idx) => (
              <Reveal key={item.q} delay={idx * 60}>
                <FAQItem
                  q={item.q}
                  a={item.a}
                  open={openFaqIndex === idx}
                  onToggle={() => setOpenFaqIndex((cur) => (cur === idx ? -1 : idx))}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <div>
                  <div className="text-xs font-semibold text-brand-green">FinQuest • Early Vision</div>
                  <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                    Be the first to see the quest in action.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Leave your email to get prototype access and updates. (This form is a demo.)
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft backdrop-blur-sm">
                  <form
                    onSubmit={(e) => { e.preventDefault(); alert('Thank you! This is a demo form for the landing page.') }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-semibold text-foreground/90">
                      Email
                      <input
                        required
                        type="email"
                        placeholder="name@example.com"
                        className="mt-2 w-full rounded-2xl border border-border bg-background/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-green transition-colors"
                      />
                    </label>
                    <button type="submit" className="w-full rounded-2xl bg-brand-green px-5 py-3 text-sm font-semibold text-background hover:bg-brand-green/90 active:scale-[0.97] transition-all duration-200">
                      Sign Me Up for Prototype
                    </button>
                    <div className="text-xs text-muted-foreground">
                      By clicking "Sign Me Up," you acknowledge this is a demonstration landing page.
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <LogoMark />
              <div className="mt-3 text-sm text-muted-foreground">
                Financial literacy turned into practice through RPG-inspired gamification.
              </div>
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <a className="hover:text-brand-green transition-colors" href="#how-it-works">How It Works</a>
              <a className="hover:text-brand-green transition-colors" href="#modules">Modules</a>
              <a className="hover:text-brand-green transition-colors" href="#faq">FAQ</a>
              <Link className="hover:text-brand-green transition-colors" to="/about">About Us</Link>
              <a className="hover:text-brand-green transition-colors" href="mailto:hello@finquest.app">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} FinQuest. Demo landing page.
          </div>
        </div>
      </footer>
    </div>
  )
}
