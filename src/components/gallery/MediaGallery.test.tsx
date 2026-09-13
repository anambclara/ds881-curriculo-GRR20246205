import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import type { ProjectMedia } from '../../types/project'
import { MediaGallery } from './MediaGallery'

afterEach(cleanup)

const artwork: ProjectMedia = {
  id: 'typing-game-artwork',
  kind: 'artwork',
  alt: 'Ilustração do jogo de digitação.',
  caption: 'Primeira imagem.',
}

const image: ProjectMedia = {
  id: 'project-screen',
  kind: 'image',
  src: '/project-screen.png',
  alt: 'Tela principal do projeto.',
  caption: 'Tela principal.',
  width: 1265,
  height: 712,
}

describe('MediaGallery', () => {
  it('keeps a one-item gallery static without navigation controls', () => {
    render(<MediaGallery items={[artwork]} visual="typing" />)
    expect(screen.getByRole('figure')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /imagem anterior/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /próxima imagem/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/1 \/ 1/)).not.toBeInTheDocument()
  })

  it('updates the live counter when moving through multiple items', async () => {
    const user = userEvent.setup()
    const items = [
      artwork,
      { ...artwork, id: 'typing-game-artwork-2', caption: 'Segunda imagem.' },
    ]
    render(<MediaGallery items={items} visual="typing" />)
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /próxima imagem/i }))
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
  })

  it('moves through a static fallback from the named keyboard surface', () => {
    const items = [
      artwork,
      { ...artwork, id: 'typing-game-artwork-2', caption: 'Segunda imagem.' },
      { ...artwork, id: 'typing-game-artwork-3', caption: 'Terceira imagem.' },
    ]
    render(<MediaGallery items={items} visual="typing" />)

    const surface = screen.getByRole('group', { name: /imagens do projeto/i })
    surface.focus()
    expect(fireEvent.keyDown(surface, { key: 'ArrowRight' })).toBe(false)
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
    expect(fireEvent.keyDown(surface, { key: 'ArrowLeft' })).toBe(false)
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('opens the original project image in an accessible lightbox', async () => {
    const user = userEvent.setup()
    render(<MediaGallery items={[image]} visual="typing" />)

    await user.click(screen.getByRole('button', { name: 'Ampliar Tela principal do projeto.' }))

    const dialog = screen.getByRole('dialog', { name: 'Imagem ampliada: Tela principal do projeto.' })
    const enlargedImage = within(dialog).getByRole('img', { name: 'Tela principal do projeto.' })
    expect(enlargedImage).toHaveAttribute('src', '/project-screen.png')
    expect(enlargedImage).toHaveAttribute('width', '1265')
    expect(enlargedImage).toHaveAttribute('height', '712')

    await user.click(within(dialog).getByRole('button', { name: 'Fechar imagem ampliada' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the lightbox with Escape and restores focus to the image button', async () => {
    const user = userEvent.setup()
    render(<MediaGallery items={[image]} visual="typing" />)
    const trigger = screen.getByRole('button', { name: 'Ampliar Tela principal do projeto.' })

    await user.click(trigger)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
