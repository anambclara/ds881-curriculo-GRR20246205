import { motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ProjectMedia } from '../../types/project'

interface ProjectImageProps {
  item: ProjectMedia
  className?: string
  loading?: 'eager' | 'lazy'
}

export function ProjectImage({ item, className, loading = 'lazy' }: ProjectImageProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const captionId = useId()
  const reduceMotion = useReducedMotion() ?? false

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [close, open])

  if (item.kind !== 'image' || !item.src) return null

  return (
    <>
      <button
        ref={triggerRef}
        className={`project-image-trigger${className ? ` ${className}` : ''}`}
        type="button"
        aria-label={`Ampliar ${item.alt}`}
        onClick={() => setOpen(true)}
      >
        <img
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading={loading}
          decoding="async"
          draggable={false}
        />
      </button>

      {open && createPortal(
        <motion.div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${item.alt}`}
          aria-describedby={captionId}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) close()
          }}
        >
          <motion.figure
            className="project-lightbox__figure"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              decoding="async"
              draggable={false}
            />
            <figcaption id={captionId}>
              <span>{item.caption}</span>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Fechar imagem ampliada"
                onClick={close}
              >
                <X aria-hidden="true" />
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>,
        document.body,
      )}
    </>
  )
}
