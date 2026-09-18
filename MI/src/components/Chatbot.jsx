import { useEffect, useRef, useState } from 'react'
import { getAnswer, SUGGESTIONS } from '../data/knowledge.js'
import styles from './Chatbot.module.css'

function ChatGlyph() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4.3 3.4a.5.5 0 0 1-.8-.4V16.3A1 1 0 0 1 3.5 16V6a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
      <circle cx="16" cy="11" r="1" fill="currentColor" />
    </svg>
  )
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SendGlyph() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        d="M4 12l16-8-5 16-3.5-7.5L4 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const WELCOME =
  '¡Hola! Soy el asistente de WebFlux. Puedo responder sobre precios, tiempos, N8N, mantenimiento, proceso y más. Elige una pregunta de abajo o escríbela con tus palabras.'

const DEFAULT_SIZE = { w: 400, h: 620 }
const MIN_SIZE = { w: 300, h: 380 }

function loadSize() {
  try {
    const raw = localStorage.getItem('webflux-chat-size')
    if (!raw) return DEFAULT_SIZE

    const { w, h } = JSON.parse(raw)
    const vw = window.innerWidth
    const vh = window.innerHeight

    return {
      w: Math.max(MIN_SIZE.w, Math.min(w, vw - 32)),
      h: Math.max(MIN_SIZE.h, Math.min(h, vh - 140)),
    }
  } catch {
    return DEFAULT_SIZE
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: WELCOME }])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [size, setSize] = useState(loadSize)
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  const pushMessage = (message) => setMessages((prev) => [...prev, message])

  const startResize = (event) => {
    event.preventDefault()

    const start = { x: event.clientX, y: event.clientY, w: size.w, h: size.h }

    document.body.style.cursor = 'nwse-resize'
    document.body.style.userSelect = 'none'

    const onMove = (moveEvent) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const next = {
        w: start.w + (moveEvent.clientX - start.x),
        h: start.h + (moveEvent.clientY - start.y),
      }
      next.w = Math.max(MIN_SIZE.w, Math.min(next.w, vw - 32))
      next.h = Math.max(MIN_SIZE.h, Math.min(next.h, vh - 140))
      setSize(next)
    }

    const onUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      try {
        localStorage.setItem('webflux-chat-size', JSON.stringify(size))
      } catch {
        /* noop */
      }
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const resetSize = () => {
    setSize(DEFAULT_SIZE)
    try {
      localStorage.removeItem('webflux-chat-size')
    } catch {
      /* noop */
    }
  }

  const send = (value) => {
    const text = (typeof value === 'string' ? value : input).trim()
    if (!text) return

    setInput('')
    pushMessage({ from: 'user', text })

    window.setTimeout(() => {
      window.setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text: getAnswer(text) }])
      }, 420)
    }, 420)

    setTyping(true)
  }

  useEffect(() => {
    if (!typing) return

    const timers = [
      window.setTimeout(() => setTyping(false), 900),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [typing])

  return (
    <>
      <div
        className={`${styles.panel}${open ? ` ${styles.panelOpen}` : ''}`}
        style={{ ['--cw']: `${size.w}px`, ['--ch']: `${size.h}px` }}
        role="dialog"
        aria-label="Asistente de WebFlux"
      >
        <div className={styles.header}>
          <div>
            <span className={styles.headerTitle}>WebFlux</span>
            <span className={styles.headerSub}>Asistente · responde al instante</span>
          </div>
        </div>

        <div ref={bodyRef} className={styles.body}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.msg} ${
                message.from === 'user' ? styles.msgUser : styles.msgBot
              }`}
            >
              {message.text}
            </div>
          ))}

          {typing && (
            <div className={`${styles.msg} ${styles.msgBot} ${styles.typingMsg}`}>
              <span className={styles.typing}>
                <span />
                <span />
                <span />
              </span>
            </div>
          )}
        </div>

        <div className={styles.chips}>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className={styles.chip}
              onClick={() => send(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form
          className={styles.row}
          onSubmit={(event) => {
            event.preventDefault()
            send(input)
          }}
        >
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escribe tu pregunta…"
            aria-label="Escribe tu pregunta"
          />
          <button className={styles.send} type="submit" aria-label="Enviar pregunta">
            <SendGlyph />
          </button>
        </form>

        <span
          className={styles.resizer}
          role="separator"
          aria-label="Ajustar tamaño del chat"
          title="Arrastra para ajustar · doble clic para reiniciar"
          onPointerDown={startResize}
          onDoubleClick={resetSize}
        />
      </div>

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente'}
      >
        {open ? <CloseGlyph /> : <ChatGlyph />}
        <span className={styles.launcherLabel}>Chat</span>
      </button>
    </>
  )
}