import { motion } from 'framer-motion'
import { ArrowRightIcon, DownloadIcon, SparklesIcon } from './icons'
import { useSiteContent } from '../context/useSiteContent'

function Hero() {
  const { content } = useSiteContent()
  const { profile, hero } = content

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.13),_transparent_35%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-24 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium tracking-[0.2em] text-cyan-200 uppercase">
            <SparklesIcon size={12} />
            {profile.availability}
          </div>

          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-sm font-medium tracking-[0.32em] text-slate-300 uppercase"
            >
              Hi, I’m {profile.name}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="max-w-3xl text-4xl font-semibold tracking-[-0.07em] text-white sm:text-5xl lg:text-7xl"
            >
              {profile.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
            >
              {profile.intro}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {hero.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm shadow-slate-950/30"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              {hero.projectButtonLabel}
              <ArrowRightIcon size={16} />
            </a>
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-cyan-300"
            >
              <DownloadIcon size={16} />
              {hero.resumeButtonLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex items-center gap-3 text-sm text-slate-300"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            {hero.connectLabel}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="rounded-[2rem] border border-slate-700/80 bg-slate-900/70 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-sm">
            <div className="rounded-[1.5rem] border border-slate-700 bg-[linear-gradient(135deg,#020817,#0f172a_40%,#111827)] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] tracking-[0.2em] text-slate-300 uppercase">
                  QA Suite
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">{hero.qualityLabel}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{hero.qualityTitle}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{hero.automationLabel}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{hero.automationValue}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{hero.frameworkLabel}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{hero.frameworkValue}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{hero.coverageLabel}</p>
                  <div className="mt-4 space-y-3">
                    {hero.coverage.map((item) => (
                      <div key={item.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-300">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
