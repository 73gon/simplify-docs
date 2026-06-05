import { AppLink } from "@/components/app-link"
import { Callout } from "@/components/mdx/callout"
import { ImageZoom } from "@/components/mdx/image-zoom"
import { Mermaid } from "@/components/mdx/mermaid"
import { ParamTable } from "@/components/mdx/param-table"
import { Pre } from "@/components/mdx/pre"
import { Showcase } from "@/components/mdx/showcase"
import { Step, Steps } from "@/components/mdx/steps"
import { Tab, Tabs } from "@/components/mdx/tabs"
import { Video } from "@/components/mdx/video"

function MdxLink({ href = "", ...props }: React.ComponentProps<"a">) {
  const isInternal = href.startsWith("/")
  if (isInternal) {
    return <AppLink to={href} {...props} />
  }
  const isAnchor = href.startsWith("#")
  return (
    <a
      href={href}
      {...(isAnchor ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  )
}

/** The single typed MDX component map passed to every rendered document (Q98). */
export const mdxComponents = {
  a: MdxLink,
  pre: Pre,
  Callout,
  Steps,
  Step,
  Tabs,
  Tab,
  ParamTable,
  Mermaid,
  ImageZoom,
  Video,
  Showcase,
} as const
