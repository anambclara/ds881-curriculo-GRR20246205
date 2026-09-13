import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ContactFooter } from './ContactFooter'

afterEach(cleanup)

describe('ContactFooter', () => {
  it('links email and LinkedIn without exposing the phone number', () => {
    render(<ContactFooter />)
    const heading = screen.getByRole('heading', { name: /obrigado por ter lido até aqui/i })
    const about = screen.getByText(/Pedro de Toledo/i)

    expect(heading).toBeInTheDocument()
    expect(about).toBeInTheDocument()
    expect(about.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByText(/segue meus links para contato/i)).toBeInTheDocument()
    expect(screen.queryByText(/vamos conversar/i)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /enviar e-mail/i })).toHaveAttribute(
      'href',
      'mailto:anaclaramartinsbatista2006@gmail.com',
    )
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ana-clara-batista-4627a3327/',
    )
    expect(screen.getByRole('link', { name: /repositório do portfólio/i })).toHaveAttribute(
      'href',
      'https://github.com/anambclara/ds881-curriculo-GRR20246205',
    )
    const portrait = screen.getByRole('img', { name: /ana clara/i })
    expect(portrait).toHaveAttribute('src', '/images/ana/ana-contact.svg')
    expect(portrait).toHaveAttribute('loading', 'lazy')
    expect(portrait).toHaveAttribute('decoding', 'async')
    expect(portrait).toHaveAttribute('width', '699')
    expect(portrait).toHaveAttribute('height', '698')
    expect(screen.queryByText(/99688/)).not.toBeInTheDocument()
  })
})
