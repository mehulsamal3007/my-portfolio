import { useEffect, useState, type ReactNode } from 'react'
import { siteContent, type SiteContent } from '../data/portfolio'
import { isAdminDemoMode, loadDemoContent, saveDemoContent, supabase } from '../lib/supabase'
import { siteContentContext } from './site-content-context'

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadDemoContent(siteContent))
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
        setContent(data.content as SiteContent)
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