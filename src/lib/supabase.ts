import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isAdminDemoMode =
  import.meta.env.DEV && import.meta.env.VITE_ADMIN_DEMO === 'true'

const DEMO_CONTENT_KEY = 'portfolio-admin-demo-content'
const DEMO_SESSION_KEY = 'portfolio-admin-demo-session'
export const demoCredentials = {
  email: 'demo@example.com',
  password: 'demo-password',
}

export function loadDemoContent<T>(fallback: T): T {
  if (!isAdminDemoMode) return fallback

  try {
    const saved = localStorage.getItem(DEMO_CONTENT_KEY)
    return saved ? (JSON.parse(saved) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveDemoContent(content: unknown) {
  localStorage.setItem(DEMO_CONTENT_KEY, JSON.stringify(content))
}

export function isDemoSignedIn() {
  return localStorage.getItem(DEMO_SESSION_KEY) === 'true'
}

export function signInToDemo(email: string, password: string) {
  const accepted = email === demoCredentials.email && password === demoCredentials.password
  if (accepted) localStorage.setItem(DEMO_SESSION_KEY, 'true')
  return accepted
}

export function signOutOfDemo() {
  localStorage.removeItem(DEMO_SESSION_KEY)
}