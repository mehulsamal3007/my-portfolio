import { motion } from 'framer-motion'
import { useSiteContent } from '../context/useSiteContent'

function Skills() {
  const { content } = useSiteContent()
  const { skillsSection } = content

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">{skillsSection.eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {skillsSection.heading}
        </h2>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillsSection.groups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: groupIndex * 0.08 }}
            className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.12)]"
          >
            <h3 className="mb-5 text-sm font-medium tracking-[0.22em] text-cyan-300 uppercase">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-sm text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
