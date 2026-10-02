import { useContext } from 'react'
import { siteContentContext } from './site-content-context'

export function useSiteContent() {
  const context = useContext(siteContentContext)

  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider.')
  }

  return context
}