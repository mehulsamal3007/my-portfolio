import { motion } from 'framer-motion'
import { ArrowUpRightIcon, GithubIcon } from './icons'
import { useSiteContent } from '../context/useSiteContent'

function Projects() {
  const { content } = useSiteContent()
  const { projectsSection } = content

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">{projectsSection.eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {projectsSection.heading}
        </h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projectsSection.items.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group rounded-[1.8rem] border border-slate-800 bg-slate-900/75 p-4 shadow-lg shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
          >
            <div className={`relative mb-5 overflow-hidden rounded-[1.3rem] border border-slate-700 bg-gradient-to-br ${project.accent} p-6`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%)]" />
              <div className="relative flex items-center justify-between text-xs font-medium uppercase tracking-[0.24em] text-slate-200">
                <span>Portfolio</span>
                <span>QA</span>
              </div>
              <div className="relative mt-12 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-2.5 w-24 rounded-full bg-white/60" />
                  <div className="h-2.5 w-32 rounded-full bg-white/30" />
                </div>
                <div className="rounded-full border border-white/20 bg-slate-950/30 p-2 text-cyan-200">
                  <ArrowUpRightIcon size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-4 px-1 pb-1">
              <div>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={project.githubUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <GithubIcon size={16} />
                  {projectsSection.githubButtonLabel}
                </a>
                <a
                  href={project.projectUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
                >
                  {projectsSection.projectButtonLabel}
                  <ArrowUpRightIcon size={16} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Projects
