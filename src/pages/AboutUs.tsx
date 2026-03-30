import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import octolioLogo from '@/assets/octolio-logo.png'
import { BookOpen, Gamepad2, TrendingUp, Target, Users, Lightbulb, Shield, Coins } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/LanguageToggle'

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

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
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

function AnimatedOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full opacity-[0.12] blur-[120px]" style={{ background: 'hsl(var(--brand-green))', animation: 'orb-float-1 12s ease-in-out infinite' }} />
      <div className="absolute right-[20%] top-[30%] h-[250px] w-[250px] rounded-full opacity-[0.08] blur-[100px]" style={{ background: 'hsl(var(--primary))', animation: 'orb-float-2 15s ease-in-out infinite' }} />
    </div>
  )
}

function FloatingPills() {
  const pills = [
    { icon: <Gamepad2 size={14} />, label: 'Gamification', x: '8%', y: '15%', delay: 0 },
    { icon: <BookOpen size={14} />, label: 'Financial Literacy', x: '72%', y: '10%', delay: 200 },
    { icon: <TrendingUp size={14} />, label: 'Smart Investing', x: '85%', y: '55%', delay: 400 },
    { icon: <Target size={14} />, label: 'Goal Tracking', x: '5%', y: '65%', delay: 600 },
    { icon: <Shield size={14} />, label: 'Trust & Safety', x: '60%', y: '80%', delay: 300 },
    { icon: <Lightbulb size={14} />, label: 'Learn by Doing', x: '25%', y: '85%', delay: 500 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pills.map((pill) => (
        <div
          key={pill.label}
          className="absolute flex items-center gap-2 rounded-full border border-border/40 bg-secondary/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md"
          style={{
            left: pill.x,
            top: pill.y,
            animation: `pill-float 6s ease-in-out ${pill.delay}ms infinite alternate`,
          }}
        >
          <span className="text-brand-green">{pill.icon}</span>
          {pill.label}
        </div>
      ))}
    </div>
  )
}

function StatCard({ icon, value, label, delay = 0 }: { icon: ReactNode; value: string; label: string; delay?: number }) {
  const { ref, visible } = useReveal()
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))

  useEffect(() => {
    if (!visible) return
    let start = 0
    const end = numericValue
    const duration = 1500
    const step = Math.max(1, Math.floor(end / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [visible, numericValue])

  const displayValue = value.replace(/[0-9]+/, String(count))

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center gap-3 rounded-3xl border border-border/30 bg-secondary/30 p-6 backdrop-blur-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="absolute top-4 h-16 w-16 rounded-full opacity-20 blur-[32px]" style={{ background: 'hsl(var(--brand-green))' }} />
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-green/10 text-brand-green">
        {icon}
      </div>
      <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{displayValue}</div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
    </div>
  )
}

export default function AboutUs() {
  const { t } = useLanguage()

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const teamMembers = [
    { name: 'Beren Husein', role: t('team.bh.role'), initials: 'BH', bio: t('team.bh.bio') },
    { name: 'Kaloyan Neshev', role: t('team.kn.role'), initials: 'KN', bio: t('team.kn.bio') },
    { name: 'Niya Nietresta', role: t('team.nn.role'), initials: 'NN', bio: t('team.nn.bio') },
    { name: 'Nevelina Stoyanova', role: t('team.ns.role'), initials: 'NS', bio: t('team.ns.bio') },
    { name: 'Stilyan Krastev', role: t('team.sk.role'), initials: 'SK', bio: t('team.sk.bio') },
    { name: 'Mihail Sinigerov', role: t('team.ms.role'), initials: 'MS', bio: t('team.ms.bio') },
  ]

  return (
    <div className="min-h-screen text-foreground bg-noise">
      {/* ── NAVBAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500"
        style={{ paddingTop: scrolled ? '8px' : '16px' }}
      >
        <nav
          className="flex items-center gap-1 rounded-full border border-border/60 px-2 py-1.5 backdrop-blur-xl transition-all duration-500"
          style={{
            background: scrolled ? 'hsla(228, 24%, 8%, 0.75)' : 'hsla(228, 24%, 8%, 0.45)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.06)'
              : '0 4px 20px rgba(0,0,0,0.2), inset 0 0.5px 0 rgba(255,255,255,0.04)',
          }}
          aria-label="Navigation"
        >
          <Link to="/" className="flex items-center gap-2 rounded-full px-3 py-1.5 nav-liquid-link" aria-label="Octolio">
            <img src={octolioLogo} alt="Octolio" className="relative z-10 h-8 w-8 object-contain drop-shadow-[0_0_6px_hsl(var(--brand-green)/0.3)]" />
            <span className="relative z-10 text-sm font-semibold tracking-tight hidden sm:inline text-foreground">Octolio</span>
          </Link>
          <Link to="/" className="nav-liquid-link"><span className="relative z-10">{t('nav.home')}</span></Link>
          <Link to="/about" className="nav-liquid-link"><span className="relative z-10">{t('nav.aboutUs')}</span></Link>
          <LanguageToggle />
        </nav>
      </header>

      <main className="pt-32">
        {/* ══════════ HERO ══════════ */}
        <section className="relative overflow-hidden pb-16">
          <AnimatedOrbs />
          <FloatingPills />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-2 text-xs font-semibold text-brand-green">
                <span className="inline-block h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                {t('aboutPage.badge')}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl" style={{ lineHeight: '1.08' }}>
                {t('aboutPage.title1')}<br />
                <span className="text-brand-green">{t('aboutPage.title2')}</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t('aboutPage.subtitle')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════ STATS BAR ══════════ */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={<Users size={22} />} value="5" label={t('aboutPage.teamMembers')} delay={0} />
              <StatCard icon={<Coins size={22} />} value="6" label={t('aboutPage.learningModules')} delay={100} />
              <StatCard icon={<Target size={22} />} value="1" label={t('aboutPage.sharedMission')} delay={200} />
            </div>
          </div>
        </section>

        {/* ══════════ ORIGIN STORY ══════════ */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
            <Reveal>
              <div className="text-xs font-semibold text-brand-green">{t('aboutPage.howStarted')}</div>
              <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {t('aboutPage.originTitle')}
              </h2>
            </Reveal>

            <div className="mt-10 space-y-8">
              <Reveal delay={100}>
                <div className="rounded-3xl border border-border bg-secondary/40 p-6 sm:p-8 shadow-soft backdrop-blur-sm">
                  <h3 className="text-lg font-semibold tracking-tight">{t('aboutPage.problemTitle')}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('aboutPage.problemDesc')}</p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="rounded-3xl border border-border bg-secondary/40 p-6 sm:p-8 shadow-soft backdrop-blur-sm">
                  <h3 className="text-lg font-semibold tracking-tight">{t('aboutPage.sparkTitle')}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('aboutPage.sparkDesc')}</p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="rounded-3xl border border-border bg-secondary/40 p-6 sm:p-8 shadow-soft backdrop-blur-sm">
                  <h3 className="text-lg font-semibold tracking-tight">{t('aboutPage.missionTitle')}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('aboutPage.missionDesc')}</p>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="rounded-3xl border border-border bg-secondary/40 p-6 sm:p-8 shadow-soft backdrop-blur-sm">
                  <h3 className="text-lg font-semibold tracking-tight">{t('aboutPage.nowTitle')}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('aboutPage.nowDesc')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════ FEATURE PILLS (scrolling marquee) ══════════ */}
        <section className="overflow-hidden py-8">
          <div className="relative">
            <div className="flex gap-3 animate-marquee">
              {[
                { icon: <Gamepad2 size={14} />, label: 'RPG Mechanics' },
                { icon: <BookOpen size={14} />, label: 'Micro-Lessons' },
                { icon: <TrendingUp size={14} />, label: 'Simulation Engine' },
                { icon: <Target size={14} />, label: 'Goal Tracking' },
                { icon: <Users size={14} />, label: 'Guild System' },
                { icon: <Shield size={14} />, label: 'Trust-First UX' },
                { icon: <Lightbulb size={14} />, label: 'Just-in-Time Learning' },
                { icon: <Coins size={14} />, label: 'Virtual Portfolio' },
                { icon: <Gamepad2 size={14} />, label: 'RPG Mechanics' },
                { icon: <BookOpen size={14} />, label: 'Micro-Lessons' },
                { icon: <TrendingUp size={14} />, label: 'Simulation Engine' },
                { icon: <Target size={14} />, label: 'Goal Tracking' },
                { icon: <Users size={14} />, label: 'Guild System' },
                { icon: <Shield size={14} />, label: 'Trust-First UX' },
                { icon: <Lightbulb size={14} />, label: 'Just-in-Time Learning' },
                { icon: <Coins size={14} />, label: 'Virtual Portfolio' },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-border/40 bg-secondary/60 px-4 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur-md"
                >
                  <span className="text-brand-green">{pill.icon}</span>
                  {pill.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ TEAM ══════════ */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="text-xs font-semibold text-brand-green">{t('aboutPage.teamEyebrow')}</div>
                <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  {t('aboutPage.teamTitle')}
                </h2>
                <p className="mt-4 text-pretty text-muted-foreground">
                  {t('aboutPage.teamDesc')}
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, i) => (
                <Reveal key={member.name} delay={i * 80}>
                  <div className="h-full rounded-3xl border border-border bg-secondary/40 p-6 shadow-soft backdrop-blur-sm transition-[box-shadow,transform] duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 ring-1 ring-brand-green/20 text-brand-green font-bold text-lg">
                        {member.initials}
                      </div>
                      <div>
                        <div className="text-base font-semibold tracking-tight">{member.name}</div>
                        <div className="mt-0.5 text-xs font-semibold text-brand-green">{member.role}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section>
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {t('aboutPage.ctaTitle')}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t('aboutPage.ctaDesc')}
              </p>
              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-green px-8 py-3.5 text-sm font-semibold text-background shadow-[0_4px_24px_hsl(var(--brand-green)/0.3)] hover:bg-brand-green/90 active:scale-[0.97] transition-all duration-200"
                >
                  {t('aboutPage.backHome')}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <img src={octolioLogo} alt="Octolio logo" className="h-10 w-10 object-contain drop-shadow-[0_0_8px_hsl(var(--brand-green)/0.4)]" />
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-tight">Octolio</div>
                  <div className="text-[11px] text-muted-foreground">FinTech x EdTech RPG</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {t('footer.desc')}
              </div>
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-brand-green transition-colors" to="/">{t('nav.home')}</Link>
              <Link className="hover:text-brand-green transition-colors" to="/about">{t('nav.aboutUs')}</Link>
              <a className="hover:text-brand-green transition-colors" href="mailto:hello@octolio.app">{t('footer.contact')}</a>
            </div>
          </div>
          <div className="mt-8 text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Octolio. {t('footer.copy')}
          </div>
        </div>
      </footer>
    </div>
  )
}
