import { LinkedinIcon, MailIcon } from './icons'
import { useSiteContent } from '../context/useSiteContent'

function Footer() {
  const { content } = useSiteContent()
  const { contact, profile } = content

  return (
    <footer className="border-t border-slate-800 bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:flex-row lg:px-8">
        <p>
          © 2026 {profile.name}
          <span className="text-slate-400"> • {profile.title}</span>
        </p>

        <div className="flex items-center gap-4">
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-cyan-300">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${contact.email}`} aria-label="Email" className="transition hover:text-cyan-300">
            <MailIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
