import { useEffect, useState } from 'react'
import { getContact } from '../services/content.service.js'
import styles from './ContactCTA.module.css'

const EMPTY_FORM = {
  nombre: '',
  email: '',
  negocio: '',
  mensaje: '',
}

export default function ContactCTA() {
  const [contact, setContact] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let active = true

    getContact()
      .then((data) => {
        if (active) setContact(data)
      })
      .catch(() => {
        if (active) setContact(null)
      })

    return () => {
      active = false
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const lines = [
      'Hola WebFlux, vengo desde tu web y quiero una cotización.',
      `Nombre: ${form.nombre}`,
      `Email: ${form.email}`,
      form.negocio ? `Negocio: ${form.negocio}` : '',
      `Mensaje: ${form.mensaje}`,
    ].filter(Boolean)

    const url = `${contact.whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener')

    setSent(true)
    setForm(EMPTY_FORM)
  }

  return (
    <section id="contacto" className={`section ${styles.section}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            {contact ? contact.eyebrow : 'Contacto'}
          </span>
          <h2 className={styles.title}>
            {contact ? contact.title : '¿Listo para tu próxima web?'}
          </h2>
          <p className={styles.subtitle}>
            {contact
              ? contact.subtitle
              : 'Cuéntanos sobre tu proyecto y te respondemos con una cotización.'}
          </p>

          {contact && (
            <dl className={styles.contact}>
              <div className={styles.contactItem}>
                <dt>Correo</dt>
                <dd>
                  <a className={styles.link} href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className={styles.contactItem}>
                <dt>Sitio</dt>
                <dd>{contact.website}</dd>
              </div>
              <div className={styles.contactItem}>
                <dt>WhatsApp</dt>
                <dd>
                  <a
                    className={styles.link}
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contact.whatsapp}
                  </a>
                </dd>
              </div>
            </dl>
          )}

          {contact && (
            <a
              className={styles.waCta}
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              {contact.whatsappCta}
            </a>
          )}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="nombre">
                Nombre
              </label>
              <input
                className={styles.input}
                id="nombre"
                name="nombre"
                type="text"
                required
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="negocio">
              Negocio
            </label>
            <input
              className={styles.input}
              id="negocio"
              name="negocio"
              type="text"
              value={form.negocio}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              id="mensaje"
              name="mensaje"
              rows="4"
              required
              value={form.mensaje}
              onChange={handleChange}
            />
          </div>

          <button
            className={`btn btn--primary ${styles.submit}`}
            type="submit"
          >
            {contact ? contact.submitLabel : 'Pedir una cotización'}
          </button>

          {sent && (
            <p className={styles.success} role="status">
              Se abrió WhatsApp con tu mensaje listo para enviar. Si no se
              abrió, escríbenos directo al {contact.whatsapp}.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}