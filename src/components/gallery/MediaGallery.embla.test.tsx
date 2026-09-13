import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ProjectMedia } from '../../types/project'

const { api, emblaRef } = vi.hoisted(() => ({
  emblaRef: vi.fn(),
  api: {
    canScrollNext: vi.fn(() => true),
    canScrollPrev: vi.fn(() => false),
    off: vi.fn(),
    on: vi.fn(),
    scrollNext: vi.fn(),
    scrollPrev: vi.fn(),
    scrollTo: vi.fn(),
    selectedScrollSnap: vi.fn(() => 0),
  },
}))

vi.mock('embla-carousel-react', () => ({ default: () => [emblaRef, api] }))
vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return { ...actual, useReducedMotion: () => true }
})

import { MediaGallery } from './MediaGallery'

const artwork: ProjectMedia = {
  id: 'typing-game-artwork',
  kind: 'artwork',
  alt: 'Ilustração do jogo de digitação.',
  caption: 'Primeira imagem.',
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('MediaGallery with Embla', () => {
  it('lazy-loads project images that live below the hero', () => {
    Object.defineProperties(window, {
      matchMedia: {
        configurable: true,
        value: vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
      },
      ResizeObserver: { configurable: true, value: class { observe() {} unobserve() {} disconnect() {} } },
      IntersectionObserver: { configurable: true, value: class { observe() {} unobserve() {} disconnect() {} } },
    })

    const items = [
      {
        id: 'screen-1',
        kind: 'image' as const,
        src: '/screen-1.webp',
        alt: 'Primeira tela',
        caption: 'Primeira tela.',
        width: 1200,
        height: 800,
      },
      {
        id: 'screen-2',
        kind: 'image' as const,
        src: '/screen-2.webp',
        alt: 'Segunda tela',
        caption: 'Segunda tela.',
        width: 1200,
        height: 800,
      },
    ]

    render(<MediaGallery items={items} visual="typing" />)

    expect(screen.getByAltText('Primeira tela')).toHaveAttribute('loading', 'lazy')
    expect(screen.getByAltText('Segunda tela')).toHaveAttribute('loading', 'lazy')
  })

  it('uses immediate navigation for reduced-motion buttons, thumbnails, and arrow keys', async () => {
    const user = userEvent.setup()
    const items = [
      artwork,
      { ...artwork, id: 'typing-game-artwork-2', caption: 'Segunda imagem.' },
      { ...artwork, id: 'typing-game-artwork-3', caption: 'Terceira imagem.' },
    ]

    Object.defineProperties(window, {
      matchMedia: {
        configurable: true,
        value: vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
      },
      ResizeObserver: { configurable: true, value: class { observe() {} unobserve() {} disconnect() {} } },
      IntersectionObserver: { configurable: true, value: class { observe() {} unobserve() {} disconnect() {} } },
    })

    render(<MediaGallery items={items} visual="typing" />)
    await user.click(screen.getByRole('button', { name: /próxima imagem/i }))
    expect(api.scrollNext).toHaveBeenCalledWith(true)

    await user.click(screen.getByRole('button', { name: /ir para imagem 3/i }))
    expect(api.scrollTo).toHaveBeenCalledWith(2, true)

    const surface = screen.getByRole('group', { name: /imagens do projeto/i })
    expect(fireEvent.keyDown(surface, { key: 'ArrowRight' })).toBe(false)
    expect(api.scrollNext).toHaveBeenLastCalledWith(true)
  })
})
