import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let t = 0

    // Use window dimensions as the source of truth — avoids 0-size on mobile mount
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    const COUNT = 80
    const MAX_DIST = 140
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const scatter = () => {
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 0.8,
        })
      }
    }

    const TICKERS = ['+2.4%', '-1.1%', '+5.7%', '$ETH', '$BTC', '+0.8%', '-3.2%', '+12%', '$SPY', '+1.9%', '-0.5%', '+8.3%']
    const tickerItems = Array.from({ length: 18 }, (_, i) => ({
      x: 0, y: 0,
      vy: -(Math.random() * 0.4 + 0.15),
      label: TICKERS[i % TICKERS.length],
      positive: TICKERS[i % TICKERS.length].startsWith('+'),
      alpha: Math.random() * 0.3 + 0.08,
      size: Math.random() * 5 + 9,
    }))
    const scatterTickers = () => {
      for (const tk of tickerItems) {
        tk.x = Math.random() * canvas.width
        tk.y = Math.random() * canvas.height
      }
    }

    const onResize = () => { resize(); scatter(); scatterTickers() }

    // Init — defer one frame so layout is ready
    requestAnimationFrame(() => {
      resize()
      scatter()
      scatterTickers()
    })

    const draw = () => {
      t += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const blobs = [
        { x: canvas.width * (0.2 + 0.15 * Math.sin(t * 0.7)), y: canvas.height * (0.3 + 0.1 * Math.cos(t * 0.5)), r: 380, color: [77, 200, 140] },
        { x: canvas.width * (0.75 + 0.1 * Math.cos(t * 0.6)), y: canvas.height * (0.25 + 0.12 * Math.sin(t * 0.8)), r: 320, color: [100, 120, 255] },
        { x: canvas.width * (0.5 + 0.2 * Math.sin(t * 0.4)), y: canvas.height * (0.7 + 0.1 * Math.cos(t * 0.9)), r: 280, color: [40, 180, 220] },
        { x: canvas.width * (0.15 + 0.1 * Math.cos(t * 1.1)), y: canvas.height * (0.7 + 0.08 * Math.sin(t)), r: 200, color: [180, 80, 255] },
      ]
      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        grad.addColorStop(0, `rgba(${b.color.join(',')},0.18)`)
        grad.addColorStop(0.5, `rgba(${b.color.join(',')},0.07)`)
        grad.addColorStop(1, `rgba(${b.color.join(',')},0)`)
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      for (const tk of tickerItems) {
        tk.y += tk.vy
        if (tk.y < -20) { tk.y = canvas.height + 10; tk.x = Math.random() * canvas.width }
        ctx.font = `${tk.size}px monospace`
        ctx.fillStyle = tk.positive
          ? `rgba(77,200,140,${tk.alpha})`
          : `rgba(255,100,100,${tk.alpha})`
        ctx.fillText(tk.label, tk.x, tk.y)
      }

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(77,200,140,0.6)'
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(77,200,140,${0.22 * (1 - dist / MAX_DIST)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      const scanY = canvas.height * ((t * 0.3) % 1)
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      scanGrad.addColorStop(0, 'rgba(77,200,140,0)')
      scanGrad.addColorStop(0.5, 'rgba(77,200,140,0.04)')
      scanGrad.addColorStop(1, 'rgba(77,200,140,0)')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 60, canvas.width, 120)

      animId = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
