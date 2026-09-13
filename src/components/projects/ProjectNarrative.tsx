import type { Project } from '../../types/project'

interface ProjectNarrativeProps {
  project: Project
}

export function ProjectNarrative({ project }: ProjectNarrativeProps) {
  return (
    <div className="project-narrative">
      <section
        className="project-narrative__section"
        aria-labelledby={`${project.slug}-details-title`}
      >
        <h4 id={`${project.slug}-details-title`}>Sobre o projeto</h4>
        <p>{project.details}</p>
      </section>

      <section className="project-narrative__section" aria-labelledby={`${project.slug}-learning-title`}>
        <h4 id={`${project.slug}-learning-title`}>O que aprendi</h4>
        <ul className="project-narrative__learning">
          {project.learningTags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </section>
    </div>
  )
}
