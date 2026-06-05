import { useEffect, useRef, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { useLocale } from "@/i18n/context"

/**
 * Autoplaying, muted, looping screencast. No controls — the user cannot pause,
 * seek or change volume. The video pauses automatically when it scrolls out of
 * view and resumes when it comes back, reducing unnecessary computation.
 *
 * Place files in `public/videos/<product>/` and reference them by absolute path,
 * e.g. `/videos/simptrack/sortieren.mp4`.
 */
export function Showcase({
  src,
  caption,
  poster,
  className,
}: {
  src: string
  caption?: string
  poster?: string
  className?: string
}) {
  const locale = useLocale()
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  // Pause when out of viewport, resume when back in view.
  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay may be blocked — that's fine */
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [failed])

  return (
    <figure className={cn("not-prose my-6", className)}>
      <div className="aspect-video overflow-hidden rounded-xl border border-border bg-black">
        {failed ? (
          <div className="flex aspect-video flex-col items-center justify-center gap-2 bg-muted/40 text-center text-sm text-muted-foreground">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-8 opacity-60"
              aria-hidden
            >
              <rect
                x="2"
                y="5"
                width="20"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
            </svg>
            <span>
              {locale === "en"
                ? "Showcase coming soon"
                : "Showcase folgt in Kürze"}
            </span>
            <code className="text-[0.7rem] opacity-70">{src}</code>
          </div>
        ) : (
          <video
            ref={ref}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="size-full object-cover"
            style={{ display: "block" }}
          />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
