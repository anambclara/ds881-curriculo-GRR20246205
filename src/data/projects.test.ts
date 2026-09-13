import { describe, expect, it } from 'vitest'
import { projects } from './projects'

describe('portfolio projects', () => {
  it('contains technical and multidisciplinary cases with learnings', () => {
    expect(projects).toHaveLength(6)
    expect(projects.some((project) => project.categories.includes('Desenvolvimento'))).toBe(true)
    expect(projects.some((project) => project.categories.includes('Comunicação'))).toBe(true)
    expect(projects.map((project) => project.slug)).toEqual([
      'jogo-de-digitacao',
      'sistema-bancario',
      'e-commerce-devmarket',
      'semana-pesquisa-gerentes',
      'comite-diversidade',
      'imersao-empresa-junior',
    ])

    for (const project of projects) {
      expect(project.summary.length).toBeGreaterThan(40)
      expect(project.details.length).toBeGreaterThan(250)
      expect(project.categories.length).toBeGreaterThan(0)
      expect(project.learningTags.length).toBeGreaterThan(0)

      expect(project).not.toHaveProperty('role')
      expect(project).not.toHaveProperty('period')
      expect(project).not.toHaveProperty('context')
      expect(project).not.toHaveProperty('challenge')
      expect(project).not.toHaveProperty('process')
      expect(project).not.toHaveProperty('decisions')
      expect(project).not.toHaveProperty('solution')
      expect(project).not.toHaveProperty('outcomes')
      expect(project).not.toHaveProperty('difficultyTags')
    }
  })

  it('does not require source-code links or programming tools', () => {
    const multidisciplinary = projects.find((project) => project.slug === 'comite-diversidade')
    expect(multidisciplinary?.categories).toEqual(
      expect.arrayContaining(['Liderança', 'Diversidade']),
    )
    expect(multidisciplinary?.tools).toEqual([])
    expect(multidisciplinary?.media).toEqual([])
    expect(multidisciplinary?.links).toEqual([])
  })
})
