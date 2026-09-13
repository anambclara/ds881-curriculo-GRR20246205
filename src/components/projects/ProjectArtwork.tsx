import { BankingArtwork } from './artworks/BankingArtwork'
import { EcompArtwork } from './artworks/EcompArtwork'
import { TypingArtwork } from './artworks/TypingArtwork'

export type ProjectVisual = 'typing' | 'banking' | 'ecomp'

interface ProjectArtworkProps {
  visual: ProjectVisual
  compact?: boolean
}

export function ProjectArtwork({ visual, compact = false }: ProjectArtworkProps) {
  return (
    <div
      className={`project-artwork project-artwork--${visual}${compact ? ' project-artwork--compact' : ''}`}
      aria-hidden="true"
    >
      {visual === 'typing' && <TypingArtwork compact={compact} />}
      {visual === 'banking' && <BankingArtwork compact={compact} />}
      {visual === 'ecomp' && <EcompArtwork compact={compact} />}
    </div>
  )
}
