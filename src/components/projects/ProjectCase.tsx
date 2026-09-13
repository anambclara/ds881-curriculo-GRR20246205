import type { Project, ProjectMedia } from '../../types/project'
import { MediaGallery } from '../gallery/MediaGallery'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMeta } from './ProjectMeta'
import { ProjectNarrative } from './ProjectNarrative'
import { ProjectPhotoPlaceholder } from './ProjectPhotoPlaceholder'

interface ProjectCaseProps {
  project: Project
  layout: 'text-left' | 'text-right'
}

function isSameMedia(item: ProjectMedia, cover: ProjectMedia) {
  return item.id === cover.id || Boolean(item.src && cover.src && item.src === cover.src)
}

export function ProjectCase({ project, layout }: ProjectCaseProps) {
  const titleId = `project-title-${project.slug}`
  const cover = project.cover
  const galleryItems = cover
    ? project.media.filter((item) => !isSameMedia(item, cover))
    : project.media
  const hasMedia = Boolean(cover || galleryItems.length > 0)

  return (
    <article
      className={`project-case project-case--${layout}${hasMedia ? '' : ' project-case--pending-photo'}`}
      id={`projeto-${project.slug}`}
      aria-labelledby={titleId}
      data-layout={layout}
    >
      <div className="project-case__copy">
        <header className="project-case__heading">
          <p className="project-case__eyebrow">
            <span>{project.number}</span> {project.eyebrow}
          </p>
          <h3 id={titleId}>{project.title}</h3>
          <p className="project-case__summary">{project.summary}</p>
        </header>

        <ProjectMeta project={project} />
        <ProjectNarrative project={project} />
        <ProjectLinks links={project.links} />
      </div>

      <div className="project-case__media">
        {hasMedia ? (
          <>
          {cover && (
            <figure className="project-case__cover">
              <ProjectCover project={project} loading="lazy" />
              <figcaption>{cover.caption}</figcaption>
            </figure>
          )}
          <MediaGallery items={galleryItems} visual={project.visual} />
          </>
        ) : (
          <ProjectPhotoPlaceholder projectTitle={project.title} />
        )}
      </div>
    </article>
  )
}
