import { useEffect, useState } from 'react'
import { domAnimation, LazyMotion, m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export function CursorLabel() {
  const reduceMotion = useReducedMotion() ?? false
  if (reduceMotion) return null

  return <CursorLabelTracker />
}

function CursorLabelTracker() {
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.25 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.25 })

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      x.set(event.clientX + 18)
      y.set(event.clientY + 18)
      const target = event.target
      const element = target instanceof Element ? target : null
      setActive(Boolean(element?.closest('[data-cursor="project"]')))
    }
    const onPointerLeave = () => setActive(false)

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [x, y])

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={`cursor-label${active ? ' cursor-label--active' : ''}`}
        aria-hidden="true"
        style={{ x: springX, y: springY }}
      >
        ABRIR
      </m.div>
    </LazyMotion>
  )
}
