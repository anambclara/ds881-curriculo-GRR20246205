import { render, screen, cleanup, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { CursorLabel } from './CursorLabel'
import { PageActivity } from './PageActivity'
import { Reveal } from './Reveal'
import { ScrollProgress } from './ScrollProgress'

afterEach(() => {
  cleanup()
  document.documentElement.classList.remove('page-is-hidden')
})

describe('motion components', () => {
  it('renders a static progress bar and reveal content', () => {
    render(
      <>
        <ScrollProgress />
        <Reveal delay={0.1} className="test-reveal">Conteúdo</Reveal>
      </>,
    )
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(screen.getByTestId('reading-progress')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Conteúdo')).toHaveClass('test-reveal')
  })

  it('pauses page activity and restores the html class on visibility changes', async () => {
    render(<PageActivity />)
    expect(document.documentElement).not.toHaveClass('page-is-hidden')
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
    await waitFor(() => expect(document.documentElement).toHaveClass('page-is-hidden'))
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
    await waitFor(() => expect(document.documentElement).not.toHaveClass('page-is-hidden'))
  })

  it('renders a cursor label target without hiding the native cursor', () => {
    render(<CursorLabel />)
    expect(screen.getByText('ABRIR')).toHaveAttribute('aria-hidden', 'true')
    expect(document.querySelector('.cursor-label')).toHaveStyle({ cursor: 'auto' })
  })
})
