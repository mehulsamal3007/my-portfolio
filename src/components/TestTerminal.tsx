import { useEffect, useState } from 'react'
import { useSiteContent } from '../context/useSiteContent'

function TestTerminal() {
  const { content } = useSiteContent()
  const { terminal } = content
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  useEffect(() => {
    let index = 0
    const interval = window.setInterval(() => {
      setVisibleLines((current) => {
        if (index >= terminal.lines.length) {
          window.clearInterval(interval)
          return current
        }

        index += 1
        return [...current, terminal.lines[index - 1]]
      })
    }, 250)

    return () => window.clearInterval(interval)
  }, [terminal.lines])

  return (
    <section id="terminal" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/30 sm:p-6">
        <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase">
            {terminal.title}
          </span>
        </div>

        <div className="rounded-[1.4rem] border border-slate-800 bg-[#020817] p-4 font-mono text-sm text-slate-200 sm:p-5">
          {visibleLines.map((line, index) => (
            <div key={`${line}-${index}`} className="flex items-center gap-2 py-1">
              <span className="text-cyan-300">{line.startsWith('$') ? '$' : ''}</span>
              <span
                className={
                  line.includes('✓')
                    ? 'text-emerald-300'
                    : line.includes('Passed') || line.includes('Tests')
                      ? 'text-cyan-300'
                      : line.includes('Failed')
                        ? 'text-rose-300'
                        : 'text-slate-200'
                }
              >
                {line.startsWith('$') ? line.replace('$', '') : line}
              </span>
            </div>
          ))}
          <div className="mt-2 inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default TestTerminal
