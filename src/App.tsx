import About from './components/About'
import AutomationShowcase from './components/AutomationShowcase'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import IntroductionAvatar from './components/IntroductionAvatar'
import VideoIntroduction from './components/VideoIntroduction'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import TechMarquee from './components/TechMarquee'
import TestTerminal from './components/TestTerminal'
import { SiteContentProvider } from './context/SiteContentContext'
import Admin from './components/Admin'

function App() {
  return (
    <SiteContentProvider>
      <AppContent />
    </SiteContentProvider>
  )
}

function AppContent() {
  if (window.location.pathname === '/admin') {
    return <Admin />
  }

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <main>
        <Hero />
        <VideoIntroduction />
        <About />
        <Skills />
        <Experience />
        <AutomationShowcase />
        <Projects />
        <TestTerminal />
        <TechMarquee />
        <Contact />
      </main>

      <Footer />
      <IntroductionAvatar />
    </div>
  )
}

export default App
