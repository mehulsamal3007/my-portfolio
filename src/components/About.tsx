import { motion } from 'framer-motion'
import { useSiteContent } from '../context/useSiteContent'

function About() {
  const { content } = useSiteContent()
  const { about } = content

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">{about.eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {about.heading}
        </h2>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
        >
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 last:mb-0 text-base leading-8 text-slate-300">{paragraph}</p>
          ))}
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {about.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[1.5rem] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-lg shadow-slate-950/20"
            >
              <div className="text-3xl font-semibold tracking-[-0.06em] text-white">{stat.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
