import { motion } from 'framer-motion'
import { useSiteContent } from '../context/useSiteContent'

function VideoIntroduction() {
  const { content } = useSiteContent()
  const { videoIntroduction } = content

  if (!videoIntroduction.enabled || !videoIntroduction.videoUrl) return null

  return (
    <section id="video-introduction" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="grid items-center gap-8 border-y border-slate-800 py-10 sm:py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
      >
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">Video introduction</p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{videoIntroduction.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{videoIntroduction.caption}</p>
        </div>

        <video
          className="aspect-video w-full rounded-xl border border-slate-700 bg-black shadow-xl shadow-slate-950/30"
          src={videoIntroduction.videoUrl}
          controls
          playsInline
          preload="metadata"
          aria-label={videoIntroduction.title}
        />
      </motion.div>
    </section>
  )
}

export default VideoIntroduction