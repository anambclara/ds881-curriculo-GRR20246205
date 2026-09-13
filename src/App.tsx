import { ContactFooter } from './components/contact/ContactFooter'
import { AppShell } from './components/layout/AppShell'
import { HeroCollage } from './components/hero/HeroCollage'
import { ProjectsBoard } from './components/projects/ProjectsBoard'
import { Reveal } from './components/motion/Reveal'
import './components/sections.css'

export default function App() {
  return (
    <AppShell>
      <HeroCollage />
      <ProjectsBoard />
      <Reveal className="contact-reveal" delay={0.08}>
        <ContactFooter />
      </Reveal>
    </AppShell>
  )
}
