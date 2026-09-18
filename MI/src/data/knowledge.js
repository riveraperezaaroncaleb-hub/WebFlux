import content from './content.js'

const contact = content.contact

const RAW_ENTRIES = [
  {
    id: 'precio',
    keywords: ['precio', 'costo', 'cuanto cuesta', 'cuanto vale', 'tarifa', 'presupuesto', 'cotizacion', 'cobra', 'valor'],
    answer: `El precio depende del alcance de tu proyecto, porque cada web se diseña a medida: una landing de una página, un sitio completo o una web app con panel.\n\nSí te puedo dar dos certezas: primero, tendrás una cotización sin costo y sin compromiso; y segundo, sabrás el número exacto antes de empezar. Escríbenos por WhatsApp con tu idea y te respondemos con un estimado en minutos.`,
  },
  {
    id: 'tiempo',
    keywords: ['tiempo', 'cuanto tarda', 'cuanto dura', 'semanas', 'plazo', 'fecha', 'entrega', 'rapido', 'rapida', 'lanzamiento'],
    answer: `En general, una landing o sitio informativo toma entre 1 y 3 semanas, y una web app o sitio con paneles un poco más.\n\nEl proceso dura lo que tu negocio necesite: no inventamos etapas ni alargamos plazos. En la primera conversación te doy un calendario claro, con fecha de lanzamiento definida.`,
  },
  {
    id: 'n8n',
    keywords: ['n8n', 'automatizacion', 'automatiza', 'workflow', 'whatsapp automatico', 'leads', 'bot', 'flujo', 'flujos', 'notificacion'],
    answer: `N8N es una herramienta de automatización que conecta servicios entre sí sin código. Es el "plus" de WebFlux.\n\nEjemplos reales: cuando alguien llena el formulario de tu web, el mensaje llega solo a tu correo, a una hoja de cálculo o directo a tu WhatsApp, sin que tengas que copiar y pegar nada.\n\nAutomatizamos formularios, notificaciones e integraciones con Google Sheets, Gmail, WhatsApp y más. Tú eliges qué se automatiza.`,
  },
  {
    id: 'tecnologia',
    keywords: ['react', 'vite', 'tecnologia', 'codigo', 'framework', 'literal', 'desarrollada', 'programa', 'herramientas'],
    answer: `Trabajamos con React + Vite: es una de las combinaciones más rápidas y modernas para webs front-end.\n\nEso se traduce en: carga casi instantánea, buen desempeño en Google, facilidad para crecer el sitio después y código propio (no plantillas), que puedes seguir manteniendo con nosotros o con quien quieras.`,
  },
  {
    id: 'medida',
    keywords: ['plantilla', 'plantillas', 'generico', 'template', 'a medida', 'modelo', 'diseño hecho', 'estructura'],
    answer: `No usamos plantillas genéricas: cada diseño se crea a medida, pensado para tu marca, tu cliente y tus objetivos.\n\nUna plantilla sirve para empezar rápido, pero termina viéndose igual que cientos de sitios. Nuestro trabajo es que el tuyo se vea y trabaje distinto, y que el código sea tuyo.`,
  },
  {
    id: 'proceso',
    keywords: ['proceso', 'pasos', 'como trabajan', 'metodologia', 'descubrimiento', 'diseño', 'desarrollo', 'etapas', 'como funciona'],
    answer: `Trabajamos en cuatro actos:\n\n1. Descubrimiento: escuchamos tu negocio, tus clientes y tus objetivos.\n2. Diseño: definimos colores, tipografía y estructura a medida.\n3. Desarrollo: construimos con React + Vite, rápido y responsive.\n4. Lanzamiento: publicamos en producción y activamos las automatizaciones.\n\nSin etapas fantasma: tendrás claridad de qué pasa en cada momento.`,
  },
  {
    id: 'responsive',
    keywords: ['responsive', 'movil', 'telefono', 'celular', 'adaptable', 'dispositivo', 'tablet', 'pantalla'],
    answer: `Todas nuestras webs son 100% responsive: se ven y funcionan bien en celular, tablet y computadora.\n\nHoy la mayoría del tráfico viene del móvil, así que el diseño se planifica primero para pantallas chicas y se adapta hacia arriba. No es un lujo, es la base.`,
  },
  {
    id: 'mantenimiento',
    keywords: ['mantenimiento', 'soporte', 'soportan', 'actualizar', 'actualizaciones', 'cambios', 'seguimiento', 'garantia', 'post lanzamiento'],
    answer: `Sí. Ofrecemos soporte post-lanzamiento para que el sitio siga igual de bien que el primer día.\n\nEso incluye ajustes de contenido, cambios visuales menores y actualizaciones cuando lo necesites. Nuestro trabajo no termina cuando publicamos: termina cuando tu web trabaja para ti.`,
  },
  {
    id: 'contacto',
    keywords: ['contacto', 'contactar', 'correo', 'email', 'mail', 'whatsapp', 'telefono', 'hablar', 'comunicarme', 'escribir', 'agencia', 'ubicacion', 'donde estan'],
    answer: `Puedes escribirnos de dos formas:\n\n• WhatsApp: ${contact.whatsapp}\n• Correo: ${contact.email}\n\nEl WhatsApp es el camino más rápido: te respondemos con una cotización sin costo y sin compromiso.`,
  },
  {
    id: 'formularios',
    keywords: ['formulario', 'formularios', 'captar', 'contacto automatico', 'mensajes', 'recibir', 'hoja', 'sheets', 'google'],
    answer: `Automatizamos formularios para que ningún mensaje se pierda. Cuando alguien te escribe en la web, el dato viaja solo a donde tú decidas: tu correo, una hoja de cálculo o tu WhatsApp.\n\nEs la parte de N8N que hace que una web normal se convierta en una máquina de captar clientes mientras duermes.`,
  },
  {
    id: 'webapps',
    keywords: ['web app', 'app', 'panel', 'dashboard', 'carrito', 'catalogo', 'login', 'sesion', 'rutas privadas', 'sistema'],
    answer: `Sí, hacemos web apps a medida: sistemas con rutas públicas y privadas, paneles para tus clientes, catálogos, inventarios y más.\n\nSon proyectos más grandes que una landing, así que se cotizan por alcance. Cuéntanos qué necesitas y te decimos cuánto tiempo y presupuesto implica.`,
  },
  {
    id: 'hosting',
    keywords: ['dominio', 'hosting', 'alojamiento', 'publicar', 'subir', 'en linea', 'internet', 'desplegar', 'produccion'],
    answer: `Nos encargamos de la publicación en producción: dominio, hosting y puesta en línea quedan listos en el lanzamiento.\n\nEres dueño de tu dominio y de tu código, y te dejamos el control claro para que el sitio sea siempre tuyo.`,
  },
  {
    id: 'contratar',
    keywords: ['contratar', 'empezar', 'comenzar', 'iniciar', 'agendar', 'arrancar', 'dar inicio', 'reservar'],
    answer: `Empezar es simple:\n\n1. Escríbenos por WhatsApp o correo.\n2. Hablamos de tu proyecto: una llamada de diagnóstico sin costo.\n3. Recibes una cotización clara con tiempo y precio.\n4. Si te convence, arrancamos.\n\nPrimera conversación sin costo y sin compromiso. ${contact.whatsapp} — ${contact.email}`,
  },
]

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?!.,;:"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const ENTRIES = RAW_ENTRIES.map((entry) => ({
  ...entry,
  keywords: entry.keywords.map(normalize),
}))

export const SUGGESTIONS = [
  '¿Cuánto cuesta una web?',
  '¿Cuánto tarda el proyecto?',
  '¿Qué es N8N?',
  '¿Hacen mantenimiento?',
  '¿Cómo contrato?',
]

export function getAnswer(text) {
  const query = normalize(text)

  let best = null
  let bestScore = 0

  for (const entry of ENTRIES) {
    const score = entry.keywords.filter((keyword) => query.includes(keyword)).length
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  if (best) return best.answer

  return `No encontré una respuesta exacta para esa pregunta, pero puedo ayudarte mejor por aquí:\n\n• WhatsApp: ${contact.whatsapp}\n• Correo: ${contact.email}\n\nTambién puedes elegir una de las preguntas sugeridas de abajo.`
}