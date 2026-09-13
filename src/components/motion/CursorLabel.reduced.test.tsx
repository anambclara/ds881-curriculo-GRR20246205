import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return { ...actual, useReducedMotion: () => true }
})

import { CursorLabel } from './CursorLabel'

describe('CursorLabel with reduced motion', () => {
  it('does not mount a spring-tracked cursor label', () => {
    render(<CursorLabel />)
    expect(screen.queryByText('ABRIR')).not.toBeInTheDocument()
  })
})
