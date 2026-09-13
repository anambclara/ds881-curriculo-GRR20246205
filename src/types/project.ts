export type ProjectCategory =
  | 'Desenvolvimento'
  | 'Design'
  | 'Comunicação'
  | 'Liderança'
  | 'Evento'
  | 'Pesquisa'
  | 'DevOps'
  | 'Organização'
  | 'Diversidade'
  | 'Planejamento'

export interface ProjectMedia {
  id: string
  kind: 'artwork' | 'image'
  src?: string
  alt: string
  caption: string
  width?: number
  height?: number
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  slug: string
  number: string
  title: string
  eyebrow: string
  categories: ProjectCategory[]
  summary: string
  details: string
  learningTags: string[]
  tools: string[]
  cover?: ProjectMedia
  media: ProjectMedia[]
  links: ProjectLink[]
  visual: 'typing' | 'banking' | 'ecomp'
}
