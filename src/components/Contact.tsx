import { motion } from 'framer-motion'
import { LinkedinIcon, MailIcon, PhoneIcon } from './icons'
import { useSiteContent } from '../context/useSiteContent'

function Contact() {
  const { content } = useSiteContent()
  const { contact } = content

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-slate-950/25 sm:p-10"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.28em] text-cyan-300 uppercase">{contact.eyebrow}</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {contact.heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
          {contact.body}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <MailIcon size={16} />
            {contact.emailButtonLabel}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <LinkedinIcon size={16} />
            {contact.linkedinButtonLabel}
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <PhoneIcon size={16} />
            {contact.phoneButtonLabel}
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
