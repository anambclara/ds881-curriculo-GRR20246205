import { projects as defaultProjects } from '../../data/projects'
import type { Project } from '../../types/project'
import { Reveal } from '../motion/Reveal'
import { ProjectCase } from './ProjectCase'
import './projects.css'

export interface ProjectsBoardProps {
  projects?: Project[]
}

export function ProjectsBoard({ projects = defaultProjects }: ProjectsBoardProps) {
  return (
    <section className="projects-board" id="projetos" aria-labelledby="projects-title" tabIndex={-1}>
      <div className="projects-board__intro">
        <p className="projects-board__note">Projetos</p>
        <h2 id="projects-title">Projetos</h2>
        <p className="projects-board__description">
          Aqui estão meus projetos, um pouquinho mais do que me representa e gostaria de
          mostrar. Horas de muito carinho e dedicação.
        </p>
      </div>
      <div className="projects-board__list">
        {projects.map((project, index) => (
          <Reveal className="project-case-reveal" delay={index === 0 ? 0 : 0.06} key={project.slug}>
            <ProjectCase
              project={project}
              layout={index % 2 === 0 ? 'text-left' : 'text-right'}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
