import type { ProductMeta } from "@/content/types"

const meta: ProductMeta = {
  id: "simptrack",
  name: "SimpTrack",
  category: "widgets",
  version: "1.0",
  status: "stable",
  languages: ["de", "en"],
  audiences: ["user", "config"],
  order: 1,
  description: {
    de: "Dashboard-Widget zur Überwachung und Verwaltung von Rechnungs- und Workflowprozessen in JobRouter.",
    en: "Dashboard widget for monitoring and managing invoice and workflow processes in JobRouter.",
  },
}

export default meta
