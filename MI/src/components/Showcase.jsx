import { useEffect, useState } from 'react'
import { getShowcase } from '../services/content.service.js'
import n8nEditor from '../assets/proof/n8n-workflow-editor.png'
import n8nExec from '../assets/proof/n8n-workflow-exec.png'
import frontendLanding from '../assets/proof/frontend-landing.png'
import frontendSections from '../assets/proof/frontend-sections.png'
import styles from './Showcase.module.css'

const IMAGES = {
  'n8n-editor': n8nEditor,
  'n8n-exec': n8nExec,
  landing: frontendLanding,
  sections: frontendSections,
}

export default function Showcase() {
  const [showcase, setShowcase] = useState(null)

  useEffect(() => {
    let active = true

    getShowcase()
      .then((data) => {
        if (active) setShowcase(data)
      })
      .catch(() => {
        if (active) setShowcase(null)
      })

    return () => {
      active = false
    }
  }, [])

  const items = showcase?.items ?? []

  return (
    <section id="trabajo" className={`section section--alt ${styles.section}`}>
      <div className="container">
        <header className="section-heading">
          <span className="section-heading__eyebrow">
            {showcase ? showcase.eyebrow : 'En acción'}
          </span>
          <h2 className="section-heading__title">
            {showcase ? showcase.title : 'No prometemos, mostramos'}
          </h2>
          <p className="section-heading__subtitle">
            {showcase
              ? showcase.subtitle
              : 'Capturas reales de nuestro trabajo, sin renders.'}
          </p>
        </header>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <figure key={item.id} className={styles.card}>
              <span className={styles.kicker} aria-hidden="true">
                <span className={styles.index}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.tag}>{item.tag}</span>
              </span>

              <div
                className={`${styles.shot} ${
                  item.kind === 'n8n' ? styles.shotN8n : styles.shotWeb
                }`}
              >
                {item.kind === 'web' && (
                  <span className={styles.chrome} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
                {item.kind === 'n8n' && (
                  <span className={styles.badge} aria-hidden="true">
                    n8n
                  </span>
                )}
                <img
                  className={styles.img}
                  src={IMAGES[item.image]}
                  alt={item.alt}
                  loading="lazy"
                />
              </div>

              <figcaption className={styles.caption}>
                <span className={styles.rule} aria-hidden="true" />
                <h3 className={styles.name}>{item.title}</h3>
                <p className={styles.desc}>{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}