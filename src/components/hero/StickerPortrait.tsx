interface StickerPortraitProps {
  src: string
  alt: string
  className?: string
  rotation?: number
  width: number
  height: number
  priority?: boolean
}

export function StickerPortrait({
  src,
  alt,
  className,
  rotation = 0,
  width,
  height,
  priority = false,
}: StickerPortraitProps) {
  return (
    <figure
      className={`sticker-portrait ${className ?? ''}`.trim()}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <img
        className="sticker-portrait__image"
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : undefined}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
      />
    </figure>
  )
}
