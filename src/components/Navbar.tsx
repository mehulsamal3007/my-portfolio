import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseIcon, MenuIcon } from './icons'
import { useSiteContent } from '../context/useSiteContent'

function Navbar() {
  const { content } = useSiteContent()
  const { navItems } = content
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => Boolean(element))

    if (sections.length === 0) {
      return
    }

    const updateActiveSection = () => {
      let current = 'home'
      let smallestDistance = Number.POSITIVE_INFINITY

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const distance = Math.abs(rect.top - 140)

        if (rect.top <= 180 && rect.bottom >= 180) {
          if (distance < smallestDistance) {
            smallestDistance = distance
            current = section.id
          }
        }
      }

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [navItems])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 shadow-lg shadow-slate-950/30 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3" 
          aria-label="Go to home section"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.18)]">
            M
          </div>
          <span className="text-sm font-medium tracking-[0.22em] text-slate-200 uppercase">{content.profile.name}</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1)

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(sectionId)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  activeSection === sectionId
                    ? 'text-cyan-300'
                    : 'text-slate-300 hover:text-slate-100'
                }`}
              >
                {item.label}
                {activeSection === sectionId && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-cyan-400/80" />
                )}
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-300 md:hidden"
        >
          {isOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const sectionId = item.href.slice(1)

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      scrollToSection(sectionId)
                    }}
                    className={`rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                      activeSection === sectionId
                        ? 'bg-cyan-500/10 text-cyan-300'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
