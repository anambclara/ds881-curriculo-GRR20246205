import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { AboutNote } from './AboutNote'

afterEach(cleanup)

describe('AboutNote', () => {
  it('summarizes Ana’s study and multidisciplinary practice', () => {
    render(<AboutNote />)
    expect(screen.getByRole('heading', { name: /sobre mim/i })).toBeInTheDocument()
    const copy = screen.getByTestId('about-note-copy').textContent ?? ''
    expect(copy.split(/\s+/).filter(Boolean).length).toBeLessThanOrEqual(90)
    expect(copy).toMatch(/UFPR/i)
    expect(copy).toMatch(/Ecomp/i)
    expect(copy).toMatch(/design/i)
    expect(copy).toMatch(/comunicação/i)
  })
})
