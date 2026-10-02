import { motion } from 'framer-motion'
import { useSiteContent } from '../context/useSiteContent'

function About() {
  const { content } = useSiteContent()
  const { about, profile } = content

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

      <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-slate-950/30">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover object-center" />
            ) : (
              <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#122b3a,#17202f_55%,#262b34)]" aria-label="Portrait placeholder">
                <span className="font-serif text-7xl font-medium text-white/80">{profile.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2)}</span>
              </div>
            )}
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-400">{profile.name}</figcaption>
        </motion.figure>

        <div>
          <div className="space-y-5 text-base leading-8 text-slate-300">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
      </div>
    </section>
  )
}

export default About
