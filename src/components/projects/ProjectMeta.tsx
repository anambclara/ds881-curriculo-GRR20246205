import type { Project } from '../../types/project'

interface ProjectMetaProps {
  project: Project
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <aside className="project-meta" aria-label="Metadados do projeto">
      <div className="project-meta__group">
        <h4>Categorias</h4>
        <ul className="project-meta__tags" aria-label="Categorias">
          {project.categories.map((category) => <li key={category}>{category}</li>)}
        </ul>
      </div>

      {project.tools.length > 0 && (
        <div className="project-meta__group">
          <h4>Ferramentas</h4>
          <ul className="project-meta__tags" aria-label="Ferramentas">
            {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      )}

    </aside>
  )
}
