import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { ProjectMedia } from '../../types/project'
import { ProjectArtwork } from '../projects/ProjectArtwork'
import { ProjectImage } from './ProjectImage'
import './gallery.css'

interface MediaGalleryProps {
  items: ProjectMedia[]
  visual: 'typing' | 'banking' | 'ecomp'
}

export function MediaGallery({ items, visual }: MediaGalleryProps) {
  if (items.length <= 1 || (typeof window !== 'undefined' && (
    typeof window.matchMedia !== 'function' ||
    typeof window.ResizeObserver !== 'function' ||
    typeof window.IntersectionObserver !== 'function'
  ))) {
    return <StaticMediaGallery items={items} visual={visual} />
  }

  return <EmblaMediaGallery items={items} visual={visual} />
}

function EmblaMediaGallery({ items, visual }: MediaGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', skipSnaps: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const reduceMotion = useReducedMotion() ?? false

  const selectSlide = useCallback((api: typeof emblaApi) => {
    if (api) setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', selectSlide)
    return () => { emblaApi.off('select', selectSlide) }
  }, [emblaApi, selectSlide])

  if (items.length === 0) return null

  const scrollPrev = () => emblaApi?.scrollPrev(reduceMotion)
  const scrollNext = () => emblaApi?.scrollNext(reduceMotion)
  const goToSlide = (index: number) => emblaApi?.scrollTo(index, reduceMotion)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollPrev()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollNext()
    }
  }

  return (
    <section className="media-gallery" aria-label="Galeria do projeto">
      <div
        className="media-gallery__viewport"
        ref={emblaRef}
        role="group"
        aria-label="Imagens do projeto"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="media-gallery__container">
          {items.map((item) => (
            <figure className="media-gallery__slide" key={item.id} aria-describedby={item.kind === 'artwork' ? `media-description-${item.id}` : undefined}>
              {item.kind === 'image' && item.src ? (
                <ProjectImage item={item} />
              ) : (
                <ProjectArtwork visual={visual} />
              )}
              {item.kind === 'artwork' && <span id={`media-description-${item.id}`} className="media-gallery__sr-description">{item.alt}</span>}
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="media-gallery__controls">
        <button type="button" onClick={scrollPrev} disabled={!emblaApi?.canScrollPrev()} aria-label="Imagem anterior">
          <ChevronLeft aria-hidden="true" />
        </button>
        <p aria-live="polite">{selectedIndex + 1} / {items.length}</p>
        <button type="button" onClick={scrollNext} disabled={!emblaApi?.canScrollNext()} aria-label="Próxima imagem">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      {items.length > 2 && (
        <GalleryThumbnails items={items} visual={visual} selectedIndex={selectedIndex} onSelect={goToSlide} />
      )}
    </section>
  )
}

function StaticMediaGallery({ items, visual }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  if (items.length === 0) return null
  const selectedItem = items[selectedIndex]
  const selectRelative = (offset: number) => {
    setSelectedIndex((index) => Math.max(0, Math.min(items.length - 1, index + offset)))
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectRelative(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectRelative(1)
    }
  }
  return (
    <section className="media-gallery" aria-label="Galeria do projeto">
      <div
        className="media-gallery__viewport"
        role="group"
        aria-label="Imagens do projeto"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <figure className="media-gallery__slide" aria-describedby={selectedItem.kind === 'artwork' ? `media-description-${selectedItem.id}` : undefined}>
          {selectedItem.kind === 'image' && selectedItem.src ? (
            <ProjectImage item={selectedItem} />
          ) : <ProjectArtwork visual={visual} />}
          {selectedItem.kind === 'artwork' && <span id={`media-description-${selectedItem.id}`} className="media-gallery__sr-description">{selectedItem.alt}</span>}
          <figcaption>{selectedItem.caption}</figcaption>
        </figure>
      </div>
      {items.length > 1 && <div className="media-gallery__controls">
          <button type="button" onClick={() => selectRelative(-1)} disabled={selectedIndex === 0} aria-label="Imagem anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <p aria-live="polite">{selectedIndex + 1} / {items.length}</p>
          <button type="button" onClick={() => selectRelative(1)} disabled={selectedIndex === items.length - 1} aria-label="Próxima imagem">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>}
      {items.length > 2 && <GalleryThumbnails items={items} visual={visual} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />}
    </section>
  )
}

interface GalleryThumbnailsProps extends MediaGalleryProps {
  selectedIndex: number
  onSelect: (index: number) => void
}

function GalleryThumbnails({ items, visual, selectedIndex, onSelect }: GalleryThumbnailsProps) {
  return (
    <div className="media-gallery__thumbnails" aria-label="Miniaturas">
      {items.map((item, index) => (
        <button
          type="button"
          className={index === selectedIndex ? 'is-selected' : undefined}
          aria-label={`Ir para imagem ${index + 1}`}
          aria-current={index === selectedIndex ? 'true' : undefined}
          key={item.id}
          onClick={() => onSelect(index)}
        >
          {item.kind === 'image' && item.src ? (
            <img
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
            />
          ) : <ProjectArtwork visual={visual} compact />}
        </button>
      ))}
    </div>
  )
}
