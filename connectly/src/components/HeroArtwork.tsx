import { useEffect, useRef, useState } from 'react'

/**
 * Animated, mouse-responsive glass orb artwork for the landing hero.
 * Built with CSS + SVG only (no 3D library) for performance and a small bundle.
 * Respects prefers-reduced-motion.
 */
export default function HeroArtwork() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / rect.width
        const dy = (e.clientY - cy) / rect.height
        setPos({ x: dx * 18, y: dy * 18 })
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="relative w-full max-w-[420px] aspect-square mx-auto" aria-hidden="true">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0071E3]/30 via-[#AF52DE]/20 to-[#5AC8FA]/10 blur-3xl" />

      {/* Orb shell */}
      <div
        className="absolute inset-6 rounded-full border border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/[0.03] backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,113,227,0.4)] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
        {/* Floating core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#0071E3] to-[#5AC8FA] shadow-[0_0_60px_rgba(0,113,227,0.6)] animate-pulse"
        />
        {/* Orbiting dots */}
        <span className="absolute left-1/2 top-4 -translate-x-1/2 w-2 h-2 rounded-full bg-[#34C759] shadow-[0_0_12px_#34C759]" style={{ animation: 'orbit 8s linear infinite' }} />
        <span className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#AF52DE] shadow-[0_0_12px_#AF52DE]" style={{ animation: 'orbit 12s linear infinite reverse' }} />
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
