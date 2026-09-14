import { cn } from '@/lib/utils'

// Precise geometry of the gothic arch's interior window within the frame
// asset, measured from the source PNG's alpha channel — see the frame's
// own aspect ratio below, which the card is locked to so the two line up.
const WINDOW = { left: 25.62, top: 24.35, width: 48.59, height: 67.4 }

export function FramedProduct({
  image,
  alt,
  className,
  imageClassName,
}: {
  image: string
  alt: string
  className?: string
  imageClassName?: string
}) {
  return (
    <div className={cn('relative aspect-[680/957]', className)}>
      <div
        className="absolute overflow-hidden bg-charcoal"
        style={{
          left: `${WINDOW.left}%`,
          top: `${WINDOW.top}%`,
          width: `${WINDOW.width}%`,
          height: `${WINDOW.height}%`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || '/placeholder.svg'}
          alt={alt}
          className={cn(
            'h-full w-full object-cover transition-transform duration-700 ease-out',
            imageClassName,
          )}
        />
      </div>
      <img
        src="/images/gothic-frame.png"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      />
    </div>
  )
}
