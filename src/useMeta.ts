import { useEffect } from 'react'

const DEFAULT_TITLE = "AD Concept — Architecture d'intérieur Valbonne"
const DEFAULT_DESC  = "Christine Thémélidis — Architecte & maître d'œuvre à Valbonne depuis 2006. Rénovation, réhabilitation et construction dans les Alpes-Maritimes."

export function useMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
    return () => {
      document.title = DEFAULT_TITLE
      if (meta) meta.setAttribute('content', DEFAULT_DESC)
    }
  }, [title, description])
}
