import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Services from '../components/Services.jsx'
import Process from '../components/Process.jsx'
import Compare from '../components/Compare.jsx'
import Showcase from '../components/Showcase.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import Chatbot from '../components/Chatbot.jsx'
import LoadingScreen from '../components/LoadingScreen.jsx'
import { getSite } from '../services/content.service.js'
import logo from '../assets/Captura de pantalla 2026-09-17 132657.png'
import styles from './Home.module.css'

function Footer() {
  const [site, setSite] = useState(null)

  useEffect(() => {
    let active = true

    getSite()
      .then((data) => {
        if (active) setSite(data)
      })
      .catch(() => {
        if (active) setSite(null)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          <img className={styles.logo} src={logo} alt="WebFlux" />
          <span className={styles.wordmark}>
            {site ? site.brand : 'WebFlux'}
          </span>
        </a>
        <p className={styles.tagline}>
          {site ? site.tagline : 'Diseño web front-end + automatización con N8N'}
        </p>
        <p className={styles.meta}>
          © {new Date().getFullYear()} {site ? site.brand : 'WebFlux'} ·{' '}
          {site ? site.copyrightContact : 'contacto@webflux.dev'} · Sitio:{' '}
          {site ? site.websiteLabel : 'próximamente'}
        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  const [boot, setBoot] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setBoot(false), 2100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen active={boot} />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Compare />
        <Showcase />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </>
  )
}