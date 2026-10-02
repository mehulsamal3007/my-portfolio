import { useSiteContent } from '../context/useSiteContent'

function TechMarquee() {
  const { content } = useSiteContent()
  const repeatedItems = [...content.techMarquee, ...content.techMarquee]

  return (
    <section aria-label="Technology stack marquee" className="overflow-hidden border-y border-slate-800 bg-slate-950/40 py-5">
      <div className="marquee-track flex min-w-max gap-6 px-4 text-sm font-medium uppercase tracking-[0.22em] text-slate-300">
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-6 whitespace-nowrap rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2"
          >
            <span>{item}</span>
            <span className="text-cyan-300">●</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechMarquee
