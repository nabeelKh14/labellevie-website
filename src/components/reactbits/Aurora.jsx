// Vendored from reactbits.dev (Aurora background) — copy-paste component style,
// not the npm 'react-bits' package (which is an unrelated RN lib).
import { useEffect, useRef } from 'react'

const Aurora = ({ colorStops = ['#2E4036', '#CC5833', '#1A1A1A'], amplitude = 1.2, blend = 0.5 }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const blobs = Array.from(el.querySelectorAll('.aurora-blob'))
    const animate = () => {
      const t = performance.now() / 1000
      blobs.forEach((b, i) => {
        const dx = Math.sin(t * 0.3 + i) * 30 * amplitude
        const dy = Math.cos(t * 0.4 + i * 1.3) * 30 * amplitude
        const sc = 1 + Math.sin(t * 0.5 + i) * 0.15
        b.style.transform = `translate(${dx}px, ${dy}px) scale(${sc})`
      })
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [amplitude])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        filter: `blur(60px)`,
        opacity: blend,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    >
      {colorStops.map((c, i) => (
        <div
          key={i}
          className="aurora-blob"
          style={{
            position: 'absolute',
            top: `${10 + i * 25}%`,
            left: `${i * 30}%`,
            width: '45%',
            height: '45%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${c} 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  )
}

export default Aurora
