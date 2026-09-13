import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroCollage } from './HeroCollage'
import { SkillsTicker } from './SkillsTicker'
import heroStyles from './hero.css?raw'

describe('HeroCollage', () => {
  it('introduces Ana and exposes the project call to action', () => {
    render(<HeroCollage />)
    expect(screen.getByRole('heading', { level: 1, name: /oi, eu sou a ana/i })).toBeInTheDocument()
    expect(screen.getByText(/desenvolvedora de software com um pezinho no design/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver projetos/i })).toHaveAttribute('href', '#projetos')
    expect(screen.getAllByRole('img', { name: /ana clara/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('keeps decorative collage layers out of the accessibility tree', () => {
    const { container } = render(<HeroCollage />)
    expect(container.querySelectorAll('[aria-hidden="true"]')).not.toHaveLength(0)
  })

  it('renders one image per portrait without draggable surfaces', () => {
    const { container } = render(<HeroCollage />)
    const portraits = container.querySelectorAll('.sticker-portrait')

    expect(portraits).toHaveLength(3)
    portraits.forEach((portrait) => {
      expect(portrait.querySelectorAll('img')).toHaveLength(1)
    })
    expect(container.querySelector('[data-drag-bounds]')).not.toBeInTheDocument()
    expect(container.querySelector('[draggable="true"]')).not.toBeInTheDocument()
  })

  it('uses a silhouette-following accent instead of a rectangular image border', () => {
    const { container } = render(<HeroCollage />)
    const portrait = container.querySelector('.sticker-portrait')
    const image = container.querySelector('.sticker-portrait__image')

    expect(getComputedStyle(portrait!).filter).toContain('drop-shadow')
    expect(getComputedStyle(image!).borderTopStyle).toBe('none')
  })

  it('provides a keyboard-reachable ticker pause target and reduced-motion contract', () => {
    const { container } = render(<SkillsTicker items={['JavaScript', 'Design']} />)
    const ticker = within(container).getByRole('region', { name: /repertório de habilidades/i })

    expect(ticker).toHaveAccessibleName(/focar pausa a animação/i)
    expect(ticker).toHaveAttribute('tabindex', '0')
    expect(ticker).toHaveAttribute('data-motion-pause-target', 'true')
    expect(heroStyles).toContain('@media (prefers-reduced-motion: reduce)')
    expect(heroStyles).toContain('flex: 1 1 100%')
    expect(heroStyles).toContain('width: 100%')
    expect(heroStyles).toContain('.skills-ticker:focus-visible .skills-ticker__track')
    expect(heroStyles).toContain('.skills-ticker:focus-within .skills-ticker__track')
  })

  it('gives the labeled collage stage an explicit group semantic', () => {
    const { container } = render(<HeroCollage />)
    expect(container.querySelector('.hero-collage__stage')).toHaveAttribute('role', 'group')
  })
})
