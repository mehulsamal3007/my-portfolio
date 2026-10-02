import { useEffect, useState, type ReactNode } from 'react'
import { siteContent, type SiteContent } from '../data/portfolio'
import { isAdminDemoMode, loadDemoContent, saveDemoContent, supabase } from '../lib/supabase'
import { siteContentContext } from './site-content-context'

function mergeWithDefaults(defaultValue: unknown, savedValue: unknown): unknown {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? savedValue : defaultValue
  }

  if (typeof defaultValue === 'object' && defaultValue !== null) {
    const defaults = defaultValue as Record<string, unknown>
    const saved = typeof savedValue === 'object' && savedValue !== null
      ? savedValue as Record<string, unknown>
      : {}

    return Object.fromEntries(
      [...new Set([...Object.keys(defaults), ...Object.keys(saved)])].map((key) => [
        key,
        key in defaults ? mergeWithDefaults(defaults[key], saved[key]) : saved[key],
      ]),
    )
  }

  return savedValue === undefined ? defaultValue : savedValue
}

function mergeSiteContent(savedValue: unknown): SiteContent {
  return mergeWithDefaults(siteContent, savedValue) as SiteContent
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => mergeSiteContent(loadDemoContent(siteContent)))
  const [isLoading, setIsLoading] = useState(Boolean(supabase))
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  useEffect(() => {
    const client = supabase
    if (!client || isAdminDemoMode) return

    let isActive = true

    const loadContent = async () => {
      const { data, error } = await client
        .from('portfolio_content')
        .select('content, updated_at')
        .eq('id', 'home')
        .maybeSingle()

      if (!isActive) return

      if (error) {
        console.error('Unable to load portfolio content:', error.message)
      } else if (data) {
        setContent(mergeSiteContent(data.content))
        setUpdatedAt(data.updated_at)
      }

      setIsLoading(false)
    }

    void loadContent()

    return () => {
      isActive = false
    }
  }, [])

  const saveContent = async (nextContent: SiteContent) => {
    if (isAdminDemoMode) {
      saveDemoContent(nextContent)
      setContent(nextContent)
      setUpdatedAt(new Date().toISOString())
      return
    }

    if (!supabase) throw new Error('Supabase is not configured.')

    const { data, error } = await supabase
      .from('portfolio_content')
      .upsert({ id: 'home', content: nextContent })
      .select('updated_at')
      .single()

    if (error) throw error

    setContent(nextContent)
    setUpdatedAt(data.updated_at)
  }

  return (
    <siteContentContext.Provider
      value={{ content, isLoading, isConfigured: Boolean(supabase) || isAdminDemoMode, isDemo: isAdminDemoMode, updatedAt, saveContent }}
    >
      {children}
    </siteContentContext.Provider>
  )
}