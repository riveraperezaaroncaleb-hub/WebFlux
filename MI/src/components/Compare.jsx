import { useEffect, useState } from 'react'
import { getCompare } from '../services/content.service.js'
import styles from './Compare.module.css'

function Mark({ value }) {
  if (value === 'yes') {
    return (
      <svg viewBox="0 0 24 24" className={styles.yes} aria-hidden="true">
        <path d="M4 12.5l5.2 5.2L20 6.5" fill="none" />
      </svg>
    )
  }

  if (value === 'partial') {
    return (
      <svg viewBox="0 0 24 24" className={styles.partial} aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 0 18Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={styles.no} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" fill="none" />
    </svg>
  )
}

export default function Compare() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    getCompare()
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
      <section id="comparativa" className="section section--alt">
        <p className="container">No se pudo cargar la comparativa.</p>
      </section>
    )
  }

  if (!data) return null

  return (
    <section id="comparativa" className="section section--alt">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">{data.eyebrow}</span>
          <h2 className="section-heading__title">{data.title}</h2>
          {data.subtitle && (
            <p className="section-heading__subtitle">{data.subtitle}</p>
          )}
        </div>

        <div className={styles.wrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.labelCol}></th>
                <th scope="col" className={styles.webfluxCol}>
                  {data.webfluxLabel}
                </th>
                <th scope="col" className={styles.genericCol}>
                  {data.genericLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.label} className={styles.row}>
                  <th scope="row" className={styles.label}>
                    {row.label}
                  </th>
                  <td className={styles.cell}>
                    <Mark value={row.webflux} />
                  </td>
                  <td className={styles.cell}>
                    <Mark value={row.generic} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}