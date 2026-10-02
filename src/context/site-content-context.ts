import { createContext } from 'react'
import type { SiteContent } from '../data/portfolio'

export type SiteContentContextValue = {
  content: SiteContent
  isLoading: boolean
  isConfigured: boolean
  isDemo: boolean
  updatedAt: string | null
  saveContent: (nextContent: SiteContent) => Promise<void>
}

export const siteContentContext = createContext<SiteContentContextValue | null>(null)