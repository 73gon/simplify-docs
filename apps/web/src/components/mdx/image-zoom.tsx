import { useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

/** Image with click-to-zoom lightbox (Q47). */
export function ImageZoom({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <figure className="my-5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border"
        >
          <img src={src} alt={alt} className="w-full" loading="lazy" />
        </button>
        {caption ? (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {caption}
          </figcaption>
        ) : null}
      </figure>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          )}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full rounded-lg"
          />
        </div>
      ) : null}
    </>
  )
}
