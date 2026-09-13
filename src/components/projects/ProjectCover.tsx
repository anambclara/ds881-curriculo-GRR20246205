import type { Project } from '../../types/project'
import { ProjectImage } from '../gallery/ProjectImage'
import { ProjectArtwork } from './ProjectArtwork'

interface ProjectCoverProps {
  project: Project
  compact?: boolean
  loading?: 'eager' | 'lazy'
}

export function ProjectCover({ project, compact = false, loading = 'lazy' }: ProjectCoverProps) {
  const image = project.cover?.kind === 'image' && project.cover.src
    ? project.cover
    : project.media.find((item) => item.kind === 'image' && item.src)

  if (!image?.src) return <ProjectArtwork visual={project.visual} compact={compact} />

  return <ProjectImage item={image} className="project-cover__image-trigger" loading={loading} />
}
