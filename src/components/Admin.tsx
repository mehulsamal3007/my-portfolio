import { useEffect, useState, type ReactNode } from 'react'
import { siteContent, type SiteContent } from '../data/portfolio'
import { useSiteContent } from '../context/useSiteContent'
import {
  demoCredentials,
  isAdminDemoMode,
  isDemoSignedIn,
  signInToDemo,
  signOutOfDemo,
  supabase,
} from '../lib/supabase'

type ContentPath = (string | number)[]
function updateAtPath(current: unknown, path: ContentPath, nextValue: unknown): SiteContent {
  if (path.length === 0) return nextValue as SiteContent

  const [key, ...remaining] = path

  if (Array.isArray(current)) {
    const updated = [...current]
    const index = Number(key)
    updated[index] = updateAtPath(updated[index], remaining, nextValue)
    return updated as unknown as SiteContent
  }

  if (typeof current === 'object' && current !== null) {
    const updated = { ...current } as Record<string, unknown>
    updated[String(key)] = updateAtPath(updated[String(key)], remaining, nextValue)
    return updated as SiteContent
  }

  return nextValue as SiteContent
}

function emptyLike(value: unknown): unknown {
  if (typeof value === 'string') return ''
  if (typeof value === 'number') return 0
  if (Array.isArray(value)) return []
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, emptyLike(item)]))
  }
  return ''
}

function FieldEditor({
  label,
  value,
  path,
  onChange,
}: {
  label: string
  value: unknown
  path: ContentPath
  onChange: (path: ContentPath, value: unknown) => void
}) {
  const controlClass = 'mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400'
  const readableLabel = label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (letter) => letter.toUpperCase())

  if (typeof value === 'string' || typeof value === 'number') {
    const isLongText = typeof value === 'string' && (value.length > 90 || value.includes('\n'))
    return (
      <label className="block text-sm font-medium text-slate-300">
        {readableLabel}
        {isLongText ? (
          <textarea
            className={`${controlClass} min-h-28 resize-y leading-6`}
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
          />
        ) : (
          <input
            className={controlClass}
            type={typeof value === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(event) => onChange(path, typeof value === 'number' ? Number(event.target.value) : event.target.value)}
          />
        )}
      </label>
    )
  }

  if (Array.isArray(value)) {
    const isStringList = value.every((item) => typeof item === 'string')

    return (
      <fieldset className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-100">{readableLabel}</legend>
        {value.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              {isStringList ? (
                <input
                  className={controlClass}
                  aria-label={`${readableLabel} item ${index + 1}`}
                  value={String(item)}
                  onChange={(event) => onChange([...path, index], event.target.value)}
                />
              ) : (
                <FieldEditor label={`${readableLabel} ${index + 1}`} value={item} path={[...path, index]} onChange={onChange} />
              )}
            </div>
            <button
              type="button"
              onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
              className="mt-2 rounded-md px-2 py-2 text-xs text-rose-300 transition hover:bg-rose-400/10"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange(path, [...value, emptyLike(value[0] ?? '')])}
          className="rounded-md border border-slate-700 px-3 py-2 text-xs font-medium text-cyan-200 transition hover:border-cyan-400/60"
        >
          Add item
        </button>
      </fieldset>
    )
  }

  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value)
    const isTopObject = path.length === 1

    return (
      <fieldset className={isTopObject ? 'space-y-4' : 'grid gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4 sm:grid-cols-2'}>
        {!isTopObject && <legend className="px-1 text-sm font-semibold text-slate-100">{readableLabel}</legend>}
        {entries.map(([key, item]) => (
          <FieldEditor key={key} label={key} value={item} path={[...path, key]} onChange={onChange} />
        ))}
      </fieldset>
    )
  }

  return null
}

function Admin() {
  const { content, isLoading, isConfigured, isDemo, updatedAt, saveContent } = useSiteContent()
  const [isAuthenticated, setIsAuthenticated] = useState(() => isDemo && isDemoSignedIn())
  const [activeSection, setActiveSection] = useState<keyof SiteContent>('profile')
  const [draft, setDraft] = useState<SiteContent | null>(null)
  const [email, setEmail] = useState(isDemo ? demoCredentials.email : '')
  const [password, setPassword] = useState(isDemo ? demoCredentials.password : '')
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isAdminDemoMode) return

    const client = supabase
    if (!client) return

    void client.auth.getSession().then(({ data }) => setIsAuthenticated(Boolean(data.session?.user)))
    const { data } = client.auth.onAuthStateChange((_event, currentSession) => {
      setIsAuthenticated(Boolean(currentSession?.user))
    })

    return () => data.subscription.unsubscribe()
  }, [])

  if (!isConfigured || (!supabase && !isDemo)) {
    return <AdminMessage title="Admin setup required" body="Add your Supabase project URL and anon key to the local environment, or enable the development-only admin demo as described in README.md." />
  }

  const client = supabase

  const sectionKeys = Object.keys(siteContent) as (keyof SiteContent)[]
  const sectionTitle = (key: string) => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (letter) => letter.toUpperCase())

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('')

    if (isDemo) {
      if (signInToDemo(email, password)) {
        setIsAuthenticated(true)
      } else {
        setStatus('Use the local demo credentials shown below.')
      }
      return
    }

    if (!client) {
      setStatus('Supabase is not configured.')
      return
    }

    const { error } = await client.auth.signInWithPassword({ email, password })
    if (error) setStatus(error.message)
  }

  const signOut = () => {
    if (isDemo) {
      signOutOfDemo()
      setIsAuthenticated(false)
      return
    }

    if (client) void client.auth.signOut()
  }

  const publish = async () => {
    setIsSaving(true)
    setStatus('')
    try {
      await saveContent(draft ?? content)
      setStatus(isDemo ? 'Saved in this browser only. These changes are not published to visitors.' : 'Published. Visitors will see these updates when they load the site.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not publish changes.')
    } finally {
      setIsSaving(false)
    }
  }

  const panel = (children: ReactNode) => (
    <div className="min-h-screen text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3 text-sm font-semibold tracking-wide text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-500/10 text-cyan-200">MS</span>
            Portfolio Studio
          </a>
          <a href="/" className="text-sm text-slate-300 transition hover:text-cyan-200">View website</a>
        </div>
      </header>
      {children}
    </div>
  )

  if (!isAuthenticated) {
    return panel(
      <main className="mx-auto flex min-h-[calc(100vh-66px)] max-w-7xl items-center justify-center px-5 py-12">
        <form onSubmit={signIn} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-7 shadow-2xl shadow-cyan-950/15 sm:p-9">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Private access</p>
          <h1 className="text-2xl font-semibold text-white">Admin sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">{isDemo ? 'Development demo only. Changes stay in this browser and are not secure or publicly published.' : 'Sign in with the admin account configured for this portfolio.'}</p>
          {isDemo && <p className="mt-4 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-xs text-cyan-100">Demo: {demoCredentials.email} / {demoCredentials.password}</p>}
          <label className="mt-7 block text-sm text-slate-300">Email
            <input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-cyan-400" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="mt-4 block text-sm text-slate-300">Password
            <input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-cyan-400" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {status && <p role="alert" className="mt-4 text-sm text-rose-300">{status}</p>}
          <button className="mt-6 w-full rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Sign in</button>
        </form>
      </main>,
    )
  }

  return panel(
    <main className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:py-10">
      <aside>
        <div className="mb-5 flex items-center justify-between lg:block">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Content editor</p>
            <h1 className="mt-2 text-xl font-semibold text-white">Homepage</h1>
          </div>
          <button type="button" onClick={signOut} className="rounded-md border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-500">Sign out</button>
        </div>
        <nav aria-label="Content sections" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {sectionKeys.map((key) => (
            <button key={key} type="button" onClick={() => setActiveSection(key)} className={`shrink-0 rounded-lg px-3 py-2.5 text-left text-sm transition ${activeSection === key ? 'bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
              {sectionTitle(key)}
            </button>
          ))}
        </nav>
      </aside>

      <section className="min-w-0">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-slate-400">{isDemo ? 'Local demo mode · changes stay in this browser' : 'Edit content shown on the public portfolio'}</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">{sectionTitle(activeSection)}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setDraft(content)} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500">Reset draft</button>
            <button type="button" disabled={isSaving || isLoading} onClick={() => void publish()} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60">{isSaving ? 'Publishing…' : 'Publish changes'}</button>
          </div>
        </div>
        {isLoading && <p className="mb-4 text-sm text-slate-400">Loading published content…</p>}
        <FieldEditor label={String(activeSection)} value={(draft ?? content)[activeSection]} path={[String(activeSection)]} onChange={(path, value) => setDraft((current) => updateAtPath(current ?? content, path, value))} />
        <div aria-live="polite" className="mt-6 min-h-6 text-sm text-cyan-200">{status || (updatedAt ? `Last published ${new Date(updatedAt).toLocaleString()}` : '')}</div>
      </section>
    </main>,
  )
}

function AdminMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-screen px-5 py-20 text-slate-100">
      <main className="mx-auto max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
        <a href="/" className="mt-6 inline-flex text-sm text-cyan-300 hover:text-cyan-200">Back to portfolio</a>
      </main>
    </div>
  )
}

export default Admin