import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('App', () => {
  it('renders one page title and accessible navigation', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('link', { name: /pular para os projetos/i })).toHaveAttribute(
      'href',
      '#projetos',
    )
    expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()
    expect(document.querySelector('.about-reveal')).not.toBeInTheDocument()
    expect(document.querySelector('.contact-reveal')).toBeInTheDocument()
  })

  it('moves focus to projects when the skip link is activated', async () => {
    const user = userEvent.setup()
    render(<App />)
    const skipLink = screen.getByRole('link', { name: /pular para os projetos/i })
    const projects = screen.getByRole('region', { name: /projetos/i })

    skipLink.focus()
    await user.keyboard('{Enter}')

    expect(projects).toHaveFocus()
  })
})
