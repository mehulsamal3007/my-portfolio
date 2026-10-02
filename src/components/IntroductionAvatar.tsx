import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseIcon, SparklesIcon } from './icons'
import { useSiteContent } from '../context/useSiteContent'

const dismissedKey = 'portfolio-introduction-dismissed'

function markIntroductionDismissed() {
  try {
    sessionStorage.setItem(dismissedKey, 'true')
  } catch {
    return
  }
}

function speakIntroduction(
  greeting: string,
  introduction: string,
  onStart: () => void,
  onEnd: () => void,
  onBlocked: () => void,
) {
  if (!('speechSynthesis' in window)) {
    onBlocked()
    return () => {}
  }

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(`${greeting}. ${introduction}`)
  utterance.lang = 'en-IN'
  utterance.rate = 0.96
  utterance.pitch = 1
  utterance.onstart = onStart
  utterance.onend = onEnd
  utterance.onerror = (event) => {
    onEnd()
    if (event.error !== 'canceled' && event.error !== 'interrupted') onBlocked()
  }
  window.speechSynthesis.speak(utterance)

  return () => {
    window.speechSynthesis.cancel()
    onEnd()
  }
}

function IntroductionAvatar() {
  const { content, isLoading } = useSiteContent()
  const { profile, welcomePopup } = content
  const [isOpen, setIsOpen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechNeedsTap, setSpeechNeedsTap] = useState(false)

  useEffect(() => {
    if (isLoading || !welcomePopup.enabled) return

    const hasDismissed = (() => {
      try {
        return sessionStorage.getItem(dismissedKey) === 'true'
      } catch {
        return false
      }
    })()

    if (hasDismissed) return

    const timeout = window.setTimeout(() => setIsOpen(true), 500)
    return () => window.clearTimeout(timeout)
  }, [isLoading, welcomePopup.enabled])

  useEffect(() => {
    if (!isOpen || !welcomePopup.enabled) return

    return speakIntroduction(
      welcomePopup.greeting,
      welcomePopup.introduction,
      () => {
        setIsSpeaking(true)
        setSpeechNeedsTap(false)
      },
      () => {
        setIsSpeaking(false)
        setIsOpen(false)
        markIntroductionDismissed()
      },
      () => setSpeechNeedsTap(true),
    )
  }, [isOpen, welcomePopup.enabled, welcomePopup.greeting, welcomePopup.introduction])

  if (!welcomePopup.enabled) return null

  const dismiss = () => {
    setIsOpen(false)
    try {
      sessionStorage.setItem(dismissedKey, 'true')
    } catch {
      return
    }
  }

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  const replayIntroduction = () => {
    setSpeechNeedsTap(false)
    speakIntroduction(
      welcomePopup.greeting,
      welcomePopup.introduction,
      () => {
        setIsSpeaking(true)
        setSpeechNeedsTap(false)
      },
      () => {
        setIsSpeaking(false)
        setIsOpen(false)
        markIntroductionDismissed()
      },
      () => setSpeechNeedsTap(true),
    )
  }

  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-3"
      style={{ right: '1rem', bottom: '1.25rem', width: 'min(19rem, calc(100vw - 2rem))' }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            aria-label={`Speaking introduction from ${profile.name}`}
            aria-describedby="spoken-introduction"
            aria-live="polite"
            className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 p-3">
              <motion.div
                animate={isSpeaking ? { y: [0, -2, 0] } : { y: 0 }}
                transition={isSpeaking ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                className={`relative aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-xl border bg-slate-800 sm:w-16 ${isSpeaking ? 'border-cyan-300/80 shadow-lg shadow-cyan-500/20' : 'border-slate-700'}`}
              >
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover object-[center_28%]" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#122b3a,#17202f_55%,#262b34)] font-serif text-3xl text-white/85">
                    {initials}
                  </div>
                )}
                {isSpeaking && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-1 rounded-lg border border-cyan-200/70"
                    animate={{ opacity: [0.75, 0.15, 0.75] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </motion.div>

              <div className="min-w-0 flex-1 self-center">
                <div className="flex items-start justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300 sm:text-xs">
                    <SparklesIcon size={12} />
                    Introduction
                  </p>
                  <button type="button" aria-label="Close introduction" onClick={dismiss} className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white">
                    <CloseIcon size={15} />
                  </button>
                </div>
                <h2 className="mt-1 text-sm font-semibold leading-5 text-white">{welcomePopup.greeting}</h2>
                <p className="mt-1 truncate text-xs text-slate-400">{profile.title}</p>
                <p id="spoken-introduction" className="sr-only">{welcomePopup.introduction}</p>
                <p className="sr-only" aria-live="polite">
                </p>
                <div className="mt-2 flex h-4 items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${isSpeaking ? 'bg-emerald-300' : speechNeedsTap ? 'bg-amber-300' : 'bg-slate-500'}`} />
                  {speechNeedsTap ? (
                    <button type="button" onClick={replayIntroduction} className="text-xs font-medium text-cyan-200 underline decoration-cyan-400/50 underline-offset-4 hover:text-white">Tap to hear</button>
                  ) : (
                    <span className="text-xs text-slate-400">{isSpeaking ? 'Speaking' : 'Introduction'}</span>
                  )}
                  <div className="ml-auto flex h-3 items-center gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((bar) => (
                      <motion.span
                        key={bar}
                        className="w-0.5 origin-center rounded-full bg-cyan-300"
                        animate={isSpeaking ? { scaleY: [0.35, 1, 0.45] } : { scaleY: 0.35 }}
                        transition={isSpeaking ? { duration: 0.55, delay: bar * 0.08, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.15 }}
                        style={{ height: 10 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={isOpen ? 'Close introduction avatar' : `Play introduction from ${profile.name}`}
        aria-expanded={isOpen}
        onClick={() => isOpen ? dismiss() : setIsOpen(true)}
        className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 bg-slate-900 text-sm font-semibold text-cyan-100 shadow-xl shadow-cyan-950/40 ring-4 ring-slate-950/50 transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${isSpeaking ? 'border-cyan-200/90' : 'border-cyan-200/70'}`}
      >
        {profile.photoUrl ? (
          <img src={profile.photoUrl} alt="" className="h-full w-full object-cover object-[center_28%]" />
        ) : (
          initials
        )}
        {!isOpen && <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />}
      </button>
    </div>
  )
}

export default IntroductionAvatar