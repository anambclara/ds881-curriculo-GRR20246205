import type { ProjectLink } from '../../types/project'

interface ProjectLinksProps {
  links: ProjectLink[]
}

function isExternalLink(href: string) {
  return /^(?:https?:)?\/\//i.test(href)
}

export function ProjectLinks({ links }: ProjectLinksProps) {
  if (links.length === 0) return null

  return (
    <nav className="project-links" aria-label="Links do projeto">
      {links.map((link) => {
        const external = isExternalLink(link.href)
        return (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </a>
        )
      })}
    </nav>
  )
}
