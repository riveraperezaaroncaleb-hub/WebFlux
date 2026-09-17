const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

export async function sendContactForm(data) {
  if (!WEBHOOK_URL) {
    throw new Error('Falta la variable de entorno VITE_N8N_WEBHOOK_URL')
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('No se pudo enviar el formulario')
  return response.json()
}