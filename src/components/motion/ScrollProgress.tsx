import { domAnimation, LazyMotion, m, useReducedMotion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <LazyMotion features={domAnimation} strict>
      {reduceMotion ? <StaticProgress /> : <DynamicProgress />}
    </LazyMotion>
  )
}

function StaticProgress() {
  return <div className="reading-progress" data-testid="reading-progress" aria-hidden="true" />
}

function DynamicProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <m.div
      className="reading-progress"
      data-testid="reading-progress"
      aria-hidden="true"
      style={{ scaleX }}
    />
  )
}
