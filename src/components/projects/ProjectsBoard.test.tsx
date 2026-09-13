import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { projects } from '../../data/projects'
import { ProjectsBoard } from './ProjectsBoard'

afterEach(cleanup)

describe('ProjectsBoard', () => {
  it('shows every complete project directly in the page', () => {
    render(<ProjectsBoard />)

    expect(screen.getAllByRole('article')).toHaveLength(6)

    for (const project of projects) {
      const caseStudy = screen.getByRole('article', { name: project.title })

      expect(within(caseStudy).getByRole('heading', { name: project.title })).toBeInTheDocument()
      expect(within(caseStudy).getByText(project.summary)).toBeInTheDocument()
      expect(within(caseStudy).getByRole('heading', { name: 'Categorias' })).toBeInTheDocument()
      if (project.tools.length > 0) {
        expect(within(caseStudy).getByRole('heading', { name: 'Ferramentas' })).toBeInTheDocument()
      } else {
        expect(within(caseStudy).queryByRole('heading', { name: 'Ferramentas' })).not.toBeInTheDocument()
      }
      expect(within(caseStudy).getByRole('heading', { name: 'Sobre o projeto' })).toBeInTheDocument()
      expect(within(caseStudy).getByText(project.details)).toBeInTheDocument()
      expect(within(caseStudy).getByRole('heading', { name: 'O que aprendi' })).toBeInTheDocument()
    }

    expect(screen.queryByText('Meu papel')).not.toBeInTheDocument()
    expect(screen.queryByText('Período')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Desafios' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Contexto' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Desafio' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Processo' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Decisões' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Solução' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Resultados' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /abrir projeto/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('alternates only between text-left and text-right layouts', () => {
    render(<ProjectsBoard />)

    const caseStudies = screen.getAllByRole('article')
    expect(caseStudies[0]).toHaveAttribute('data-layout', 'text-left')
    expect(caseStudies[1]).toHaveAttribute('data-layout', 'text-right')
    expect(caseStudies[2]).toHaveAttribute('data-layout', 'text-left')
    expect(caseStudies[3]).toHaveAttribute('data-layout', 'text-right')
    expect(caseStudies[4]).toHaveAttribute('data-layout', 'text-left')
    expect(caseStudies[5]).toHaveAttribute('data-layout', 'text-right')
  })

  it('replaces project 03 and appends the three new projects', () => {
    render(<ProjectsBoard />)

    expect(screen.getByRole('heading', { name: 'e-commerce DevMarket' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Semana de pesquisa dos Gerentes' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Liderança do Comitê de Diversidade' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Organização da Imersão da Empresa Júnior' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Comunicação na Ecomp' })).not.toBeInTheDocument()
  })

  it('reserves a replaceable photo area for projects awaiting images', () => {
    render(<ProjectsBoard />)

    for (const title of [
      'Liderança do Comitê de Diversidade',
      'Organização da Imersão da Empresa Júnior',
    ]) {
      const caseStudy = screen.getByRole('article', { name: title })
      expect(
        within(caseStudy).getByRole('figure', { name: `Espaço reservado para foto de ${title}` }),
      ).toBeInTheDocument()
      expect(within(caseStudy).queryByRole('region', { name: 'Galeria do projeto' })).not.toBeInTheDocument()
    }

    for (const title of [
      'Semana de pesquisa dos Gerentes',
      'Liderança do Comitê de Diversidade',
      'Organização da Imersão da Empresa Júnior',
    ]) {
      const caseStudy = screen.getByRole('article', { name: title })
      expect(within(caseStudy).queryByRole('heading', { name: 'Ferramentas' })).not.toBeInTheDocument()
    }
  })

  it('shows the supplied DevMarket and research week images', () => {
    render(<ProjectsBoard />)

    const devMarket = screen.getByRole('article', { name: 'e-commerce DevMarket' })
    const researchWeek = screen.getByRole('article', { name: 'Semana de pesquisa dos Gerentes' })

    expect(
      within(devMarket).getByAltText('Página de produto do e-commerce DevMarket.'),
    ).toBeInTheDocument()
    expect(
      within(researchWeek).getByAltText('Ana Clara apresentando sua pesquisa sobre UI e UX.'),
    ).toBeInTheDocument()
    expect(within(devMarket).queryByText(/imagem em breve/i)).not.toBeInTheDocument()
    expect(within(researchWeek).queryByText(/imagem em breve/i)).not.toBeInTheDocument()
  })

  it('shows the supplied screenshots in their respective project galleries', () => {
    render(<ProjectsBoard />)

    const typingProject = screen.getByRole('article', { name: 'Jogo de digitação' })
    const bankingProject = screen.getByRole('article', { name: 'Sistema bancário' })

    expect(within(typingProject).getByAltText('Tela inicial do jogo de digitação, com botão Jogar sobre fundo rosa e lilás.')).toBeInTheDocument()
    expect(within(bankingProject).getByAltText('Tela de manutenção de clientes do sistema bancário desenvolvido em Java Swing.')).toBeInTheDocument()
    expect(within(typingProject).getAllByRole('figure')).toHaveLength(1)
    expect(within(bankingProject).getAllByRole('figure')).toHaveLength(1)
    expect(within(typingProject).queryByRole('button', { name: /próxima imagem/i })).not.toBeInTheDocument()
    expect(within(bankingProject).queryByRole('button', { name: /próxima imagem/i })).not.toBeInTheDocument()
  })

  it('preserves the natural proportions of project screenshots', () => {
    render(<ProjectsBoard />)

    expect(screen.getByAltText('Tela inicial do jogo de digitação, com botão Jogar sobre fundo rosa e lilás.')).toHaveStyle({
      aspectRatio: 'auto',
      height: 'auto',
    })
    expect(screen.getByAltText('Tela de manutenção de clientes do sistema bancário desenvolvido em Java Swing.')).toHaveStyle({
      aspectRatio: 'auto',
      height: 'auto',
    })
  })

  it('does not repeat an explicit cover inside the project gallery', () => {
    const cover = {
      id: 'shared-cover',
      kind: 'image' as const,
      src: '/cover.webp',
      alt: 'Capa exclusiva do projeto',
      caption: 'Capa do projeto.',
      width: 1600,
      height: 900,
    }
    const project = {
      ...projects[0],
      cover,
      media: [cover, {
        ...cover,
        id: 'detail',
        src: '/detail.webp',
        alt: 'Detalhe do projeto',
      }],
    }

    render(<ProjectsBoard projects={[project]} />)

    expect(screen.getAllByAltText('Capa exclusiva do projeto')).toHaveLength(1)
    expect(screen.getByAltText('Detalhe do projeto')).toBeInTheDocument()
  })
})
