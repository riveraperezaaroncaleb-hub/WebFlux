import { useEffect, useState } from 'react'
import logo from '../assets/Captura de pantalla 2026-09-17 132657.png'
import styles from './LoadingScreen.module.css'

const DOTS = [
  { size: 12, left: 8, duration: 8, delay: 0 },
  { size: 8, left: 22, duration: 10, delay: 1.2 },
  { size: 14, left: 38, duration: 7, delay: 0.6 },
  { size: 7, left: 55, duration: 9, delay: 2 },
  { size: 11, left: 70, duration: 6.5, delay: 0.3 },
  { size: 9, left: 84, duration: 8.5, delay: 1.6 },
  { size: 13, left: 92, duration: 7.5, delay: 0.9 },
]

export default function LoadingScreen({ active }) {
  const [rendered, setRendered] = useState(active)

  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => setRendered(false), 550)
      return () => clearTimeout(timer)
    }
  }, [active])

  if (!rendered) return null

  return (
    <div
      className={`${styles.overlay}${active ? '' : ` ${styles.fade}`}`}
      role="status"
      aria-label="Cargando WebFlux"
    >
      <span className={`${styles.blob} ${styles.blobA}`} aria-hidden="true" />
      <span className={`${styles.blob} ${styles.blobB}`} aria-hidden="true" />

      <div className={styles.dots} aria-hidden="true">
        {DOTS.map((dot, index) => (
          <span
            key={index}
            className={styles.dot}
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.left}%`,
              ['--dur']: `${dot.duration}s`,
              ['--delay']: `${dot.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.center}>
        <span className={styles.ring} aria-hidden="true" />
        <img className={styles.logo} src={logo} alt="WebFlux" />
        <span className={styles.bar}>
          <span className={styles.barFill} />
        </span>
      </div>
    </div>
  )
}