import type { PropsWithChildren } from 'react'
import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react'

export interface RevealProps extends PropsWithChildren {
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const canObserve = typeof IntersectionObserver !== 'undefined'

  return (
    <LazyMotion features={domAnimation} strict>
      {canObserve ? (
        <m.div
          className={className}
          initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: -0.35 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </m.div>
      ) : (
        <div className={className}>{children}</div>
      )}
    </LazyMotion>
  )
}
