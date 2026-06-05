/** Responsive video embed (Q47). Accepts an embeddable URL (YouTube/Vimeo/MP4). */
export function Video({ src, title }: { src: string; title?: string }) {
  const isFile = /\.(mp4|webm|ogg)$/i.test(src)
  return (
    <div className="my-5 aspect-video overflow-hidden rounded-lg border border-border bg-black">
      {isFile ? (
        <video src={src} controls className="size-full" />
      ) : (
        <iframe
          src={src}
          title={title ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="size-full"
        />
      )}
    </div>
  )
}
