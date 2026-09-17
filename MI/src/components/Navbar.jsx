import { useEffect, useState } from 'react'
import { getSite } from '../services/content.service.js'
import ThemeToggle from './ThemeToggle.jsx'
import logo from '../assets/Captura de pantalla 2026-09-17 132657.png'
import styles from './Navbar.module.css'

const DOTS = [
  { size: 14, left: 8, duration: 8, delay: 0 },
  { size: 9, left: 20, duration: 10, delay: 1.2 },
  { size: 16, left: 32, duration: 7, delay: 0.6 },
  { size: 8, left: 45, duration: 9, delay: 2 },
  { size: 12, left: 58, duration: 6.5, delay: 0.3 },
  { size: 10, left: 70, duration: 8.5, delay: 1.6 },
  { size: 15, left: 82, duration: 7.5, delay: 0.9 },
  { size: 8, left: 92, duration: 9.5, delay: 2.4 },
]

export default function Navbar() {
  const [site, setSite] = useState(null)
  const [open, setOpen] = useState(false)

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

  const closeMenu = () => setOpen(false)

  const links = site?.navLinks ?? []
  const cta = site?.navCta ?? { label: 'Pedir una cotización', href: '#contacto' }

  return (
    <header className={styles.header}>
      <div className={styles.dots} aria-hidden="true">
        {DOTS.map((dot, index) => (
          <span
            key={index}
            className={styles.dot}
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.left}%`,
              ['--dur' ]: `${dot.duration}s`,
              ['--delay']: `${dot.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={closeMenu}>
          <img className={styles.logo} src={logo} alt="WebFlux" />
        </a>

        <nav
          className={`${styles.nav}${open ? ` ${styles.navOpen}` : ''}`}
          aria-label="Navegación principal"
        >
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={cta.href} className={styles.cta} onClick={closeMenu}>
            {cta.label}
          </a>
        </nav>

        <div className={styles.controls}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-label="Abrir menú"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
          </button>
        </div>
      </div>
    </header>
  )
}