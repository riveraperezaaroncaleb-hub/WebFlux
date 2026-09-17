import { useEffect, useState } from 'react'
import { getServices } from '../services/content.service.js'
import styles from './Services.module.css'

export default function Services() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    getServices()
      .then((payload) => {
        if (active) setData(payload)
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
      <section id="servicios" className="section section--alt">
        <p className="container">No se pudieron cargar los servicios.</p>
      </section>
    )
  }

  if (!data) return null

  return (
    <section id="servicios" className="section section--alt">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">{data.eyebrow}</span>
          <h2 className="section-heading__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section-heading__subtitle">{data.subtitle}</p>
          )}
        </div>

        <ol className={styles.list}>
          {data.items.map((service, index) => (
            <li
              key={service.id}
              className={`${styles.row}${
                service.highlight ? ` ${styles.rowHighlight}` : ''
              }`}
            >
              <span className={styles.index}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.content}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.desc}>{service.description}</p>
              </div>
              {service.highlight && (
                <span className={styles.tag}>Núcleo del negocio</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}