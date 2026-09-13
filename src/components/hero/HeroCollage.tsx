import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react'
import { profile, skills } from '../../data/profile'
import { ArrowLink } from '../ui/ArrowLink'
import { SkillsTicker } from './SkillsTicker'
import { StickerPortrait } from './StickerPortrait'
import './hero.css'

export function HeroCollage() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="hero-collage" id="inicio" aria-labelledby="hero-title">
        <div className="hero-collage__content">
          <p className="hero-collage__eyebrow">Portfólio · {profile.location}</p>
          <h1 id="hero-title">Oi, eu sou a Ana</h1>
          <p className="hero-collage__role">
            Desenvolvedora de software com um pezinho no design, sempre gostei muito de
            criar e transformar resultados visualmente.
          </p>
          <ArrowLink href="#projetos">Ver projetos</ArrowLink>
        </div>

        <div className="hero-collage__stage" role="group" aria-label="Retratos de Ana Clara">
          <m.div
            className="hero-collage__shape hero-collage__shape--sun"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: [0, 5, 0], scale: [1, 1.04, 1] }}
            transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <m.div
            className="hero-collage__shape hero-collage__shape--scribble"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↗
          </m.div>

          <div className="hero-collage__portrait hero-collage__portrait--main">
            <StickerPortrait
              src="/images/ana/ana-portrait.webp"
              alt="Ana Clara em um retrato descontraído"
              width={736}
              height={584}
              rotation={-3}
              priority
            />
          </div>
          <div className="hero-collage__portrait hero-collage__portrait--standing">
            <StickerPortrait
              src="/images/ana/ana-standing.webp"
              alt="Ana Clara em pé"
              width={448}
              height={712}
              rotation={4}
            />
          </div>
          <div className="hero-collage__portrait hero-collage__portrait--wink">
            <StickerPortrait
              src="/images/ana/ana-wink.webp"
              alt="Ana Clara piscando"
              width={480}
              height={327}
              rotation={-7}
            />
          </div>
        </div>

        <SkillsTicker items={skills} />
      </section>
    </LazyMotion>
  )
}
