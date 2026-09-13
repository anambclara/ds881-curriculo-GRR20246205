import { ImagePlus } from 'lucide-react'

interface ProjectPhotoPlaceholderProps {
  projectTitle: string
}

export function ProjectPhotoPlaceholder({ projectTitle }: ProjectPhotoPlaceholderProps) {
  return (
    <figure
      className="project-photo-placeholder"
      aria-label={`Espaço reservado para foto de ${projectTitle}`}
    >
      <div className="project-photo-placeholder__frame" aria-hidden="true">
        <ImagePlus />
        <span>Foto do projeto</span>
      </div>
      <figcaption>Imagem em breve.</figcaption>
    </figure>
  )
}
