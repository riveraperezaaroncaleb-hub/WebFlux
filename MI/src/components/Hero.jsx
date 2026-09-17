import { useEffect, useState } from 'react'
import { getHero } from '../services/content.service.js'
import styles from './Hero.module.css'

function Check() {
  return (
    <svg viewBox="0 0 24 24" className={styles.check} aria-hidden="true">
      <path d="M4 12.5l5.2 5.2L20 6.5" fill="none" />
    </svg>
  )
}

function Title({ title, emphasis }) {
  if (emphasis && title.includes(emphasis)) {
    const before = title.slice(0, title.indexOf(emphasis))
    const after = title.slice(title.indexOf(emphasis) + emphasis.length)
    return (
      <>
        {before}
        <em>{emphasis}</em>
        {after}
      </>
    )
  }
  return title
}

export default function Hero() {
  const [hero, setHero] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    getHero()
      .then((data) => {
        if (active) setHero(data)
      })
      .catch(() => {
        if (active) setError(true)
      })

    return () => {
      active = false
    }
  }, [])

  if (error) {
    return (
      <section id="top" className={styles.hero}>
        <p className="container">No se pudo cargar el contenido.</p>
      </section>
    )
  }

  if (!hero) return null

  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="section-heading__eyebrow">{hero.eyebrow}</p>
          <h1 className={styles.title}>
            <Title title={hero.title} emphasis={hero.emphasis} />
          </h1>
          <p className={styles.lede}>{hero.lede}</p>
          <div className={styles.actions}>
            <a href={hero.primaryCta.href} className="btn btn--primary">
              {hero.primaryCta.label}
            </a>
            {hero.secondaryCta && (
              <a href={hero.secondaryCta.href} className="btn btn--ghost">
                {hero.secondaryCta.label}
              </a>
            )}
          </div>
          <ul className={styles.points}>
            {hero.points.map((point) => (
              <li key={point}>
                <Check />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <span className={styles.windowDot} />
              <span className={styles.windowDot} />
              <span className={styles.windowDot} />
            </div>
            <div className={styles.windowBody}>
              <div className={styles.windowKicker}>Clínica Mendoza · Odontología</div>
              <div className={styles.windowTitle}>Pedir un turno</div>
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.lineShort} />
              <div className={styles.fakeCta}>Enviar</div>
            </div>
          </div>

          <div className={styles.chip}>
            <span className={styles.chipTag} aria-hidden="true">
              N8N
            </span>
            Formulario → WhatsApp
          </div>
          <div className={`${styles.chip} ${styles.chipAlt}`}>
            <span className={styles.chipTag} aria-hidden="true">
              N8N
            </span>
            Lead → Google Sheets
          </div>
        </div>
      </div>
    </section>
  )
}