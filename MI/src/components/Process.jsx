import { useEffect, useState } from 'react'
import { getProcess } from '../services/content.service.js'
import styles from './Process.module.css'

export default function Process() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    getProcess()
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
      <section id="proceso" className="section">
        <p className="container">No se pudo cargar el proceso.</p>
      </section>
    )
  }

  if (!data) return null

  return (
    <section id="proceso" className="section">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">{data.eyebrow}</span>
          <h2 className="section-heading__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section-heading__subtitle">{data.subtitle}</p>
          )}
        </div>

        <ol className={styles.steps}>
          {data.steps.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}