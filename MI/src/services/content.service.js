const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function getResource(resource) {
  const response = await fetch(`${API_URL}/${resource}`)
  if (!response.ok) throw new Error(`No se pudieron cargar ${resource}`)
  return response.json()
}

export const getHero = () => getResource('hero')
export const getServices = () => getResource('services')
export const getProcess = () => getResource('process')
export const getCompare = () => getResource('compare')
export const getContact = () => getResource('contact')
export const getSite = () => getResource('site')