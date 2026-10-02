import { motion } from 'framer-motion'
import { useSiteContent } from '../context/useSiteContent'

function Experience() {
  const { content } = useSiteContent()
  const { experienceSection } = content

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">{experienceSection.eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {experienceSection.heading}
        </h2>
      </motion.div>

      <div className="relative ml-2 border-l border-slate-800 pl-6 sm:pl-8">
        {experienceSection.items.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.role}`}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative pb-10 last:pb-0"
          >
            <span className="absolute -left-[2.14rem] top-4 h-3 w-3 rounded-full border-4 border-slate-950 bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,0.18)]" />
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/75 p-6 shadow-lg shadow-slate-950/20">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{item.role}</p>
                  <p className="text-sm text-cyan-300">{item.company}</p>
                </div>
                <span className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase">
                  {item.period}
                </span>
              </div>

              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Experience
