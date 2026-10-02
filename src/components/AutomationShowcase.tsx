import { motion } from 'framer-motion'
import { useSiteContent } from '../context/useSiteContent'

function AutomationShowcase() {
  const { content } = useSiteContent()
  const { automationSection } = content

  return (
    <section id="automation" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">{automationSection.eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {automationSection.heading}
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-cyan-500/0 via-cyan-400/40 to-cyan-500/0 xl:block" />

        <div className="grid gap-5 xl:grid-cols-7">
          {automationSection.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative z-10 rounded-[1.6rem] border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/25"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                {index + 1}
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AutomationShowcase
