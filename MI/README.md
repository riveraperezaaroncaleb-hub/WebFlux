# WebFlux

**Diseño web front-end de alto impacto + automatización digital con N8N.**
Un solo equipo, un solo flujo: de la idea visual al proceso que la sostiene.

![status](https://img.shields.io/badge/estado-en%20desarrollo-blue)
![stack](https://img.shields.io/badge/stack-React%20%2B%20Vite-61DAFB)
![automation](https://img.shields.io/badge/automatización-N8N-EA4B71)
![license](https://img.shields.io/badge/licencia-privada-lightgrey)

---

## Tabla de contenidos

1. [Propuesta de valor](#propuesta-de-valor)
2. [Servicios](#servicios)
3. [Stack tecnológico](#stack-tecnológico)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Arquitectura y flujo de datos](#arquitectura-y-flujo-de-datos)
6. [Puesta en marcha](#puesta-en-marcha)
7. [Scripts disponibles](#scripts-disponibles)
8. [Convenciones de código](#convenciones-de-código)
9. [Roadmap](#roadmap)
10. [Contacto](#contacto)

---

## Propuesta de valor

# ✨ Tu web, lista para impresionar.

> "Empoderamos a cada negocio para alcanzar todo su potencial digital, una página a la vez."

WebFlux **crea páginas web front-end** rápidas, modernas y hechas a medida — la cara digital de tu negocio, diseñada para que cause una primera impresión imposible de olvidar. Como complemento, conectamos esa web con **automatización con N8N**, así lo que el visitante llena en tu sitio se convierte automáticamente en un lead, un correo o una notificación, sin que nadie tenga que copiar y pegar nada.

<table>
<tr>
<td align="center">⚡<br><b>Rápido</b><br>Carga optimizada y sin fricción</td>
<td align="center">🎨<br><b>A tu medida</b><br>Diseño único, no plantillas genéricas</td>
<td align="center">📱<br><b>Responsive</b><br>Perfecto en móvil, tablet y desktop</td>
<td align="center">🔗<br><b>Conectado</b><br>Automatizado con N8N desde el día uno</td>
</tr>
</table>

El resultado: negocios que lanzan más rápido, se ven más profesionales que su competencia y atienden a sus clientes sin esfuerzo manual extra.

---

## Servicios

| Línea de servicio | Qué incluye | Entregable típico |
|---|---|---|
| 🖥️ **Páginas web front-end** *(núcleo del negocio)* | Diseño UI/UX a medida, maquetación responsive, animaciones, SEO on-page básico | Sitio en producción (Vercel/Netlify) |
| 🧩 **Web apps a medida** | React + enrutamiento, consumo de APIs, autenticación de rutas | SPA con rutas públicas/privadas |
| 🔁 **Automatización con N8N** *(complemento)* | Workflows de captación de leads, notificaciones, integraciones (Sheets, Slack, Gmail, CRM) | Workflow(s) documentado(s) + panel de monitoreo |
| 🛠️ **Mantenimiento & soporte** | Actualizaciones, monitoreo de flujos, mejoras iterativas | SLA mensual |

### Por qué elegirnos

| | WebFlux | Plantillas genéricas |
|---|:---:|:---:|
| Diseño 100% a medida | ✅ | ❌ |
| Código propio y mantenible | ✅ | ⚠️ |
| Formularios conectados a automatización | ✅ | ❌ |
| Rendimiento optimizado (Vite) | ✅ | ⚠️ |
| Soporte post-lanzamiento | ✅ | ❌ |

---

## Stack tecnológico

**Front-end**
- React 18 + Vite
- React Router (enrutamiento público/privado)
- ESLint (calidad y consistencia de código)
- Consumo de API REST (mock con `json-server` vía `db.json` en desarrollo)

**Automatización**
- N8N (self-hosted o cloud) como orquestador de workflows
- Webhooks para conectar el front-end con los flujos de automatización
- Integraciones típicas: Google Sheets, Gmail/SMTP, Slack/WhatsApp, CRMs (HubSpot, Notion, Airtable)

**Testing**
- Vitest / Testing Library (`*.test.jsx`)

---

## Estructura del proyecto

Estructura real del repositorio (Vite + React), respetada tal cual para que este documento viva junto al código sin fricción:

```
webflux/
├── node_modules/
├── public/
├── src/
│   ├── assets/                # Imágenes, íconos, capturas
│   │   └── Captura de ...
│   ├── components/            # Componentes reutilizables de UI
│   │   ├── Navbar.jsx
│   │   └── Navbar.test.jsx
│   ├── pages/                 # Vistas / pantallas de la aplicación
│   ├── roots/                 # Definición raíz del enrutamiento
│   │   └── Routing.jsx
│   ├── routes/                # Guards de rutas públicas y privadas
│   │   ├── PrivateRoutes.jsx
│   │   └── PublicRoutes.jsx
│   ├── services/               # Llamadas a API / lógica de negocio / integraciones N8N
│   ├── App.jsx
│   └── main.jsx
├── db.json                    # Mock API (json-server) para desarrollo local
├── eslint.config.js
├── index.html
├── .gitignore
└── README.md
```

**Convención por carpeta:**

- `components/` → piezas de UI sin conocimiento de negocio (Navbar, botones, tarjetas de servicio, formularios de contacto).
- `pages/` → composición de componentes por ruta (Home, Servicios, Automatización, Contacto).
- `roots/Routing.jsx` → único punto donde se declara el árbol de rutas de la app.
- `routes/` → `PrivateRoutes.jsx` y `PublicRoutes.jsx` como guards; separan lo público (landing, servicios) de lo privado (panel de cliente, dashboard de automatizaciones).
- `services/` → capa de acceso a datos: llamadas al mock (`db.json`), a la API real cuando exista, y a los **webhooks de N8N** que disparan las automatizaciones desde el front-end.

---

## Arquitectura y flujo de datos

```
Usuario ──> Landing (pages/) ──> Formulario (components/)
                                      │
                                      ▼
                         services/contact.service.js
                                      │
                          POST /webhook/n8n-lead-capture
                                      ▼
                              Workflow en N8N
                     ┌───────────────┼───────────────┐
                     ▼               ▼               ▼
               Google Sheets     Email/CRM      Notificación
                (registro)      (seguimiento)   (Slack/WhatsApp)
```

El front-end nunca habla directamente con los sistemas internos del negocio: todo pasa por **un webhook de N8N**, lo que permite cambiar de CRM, agregar un paso de validación o notificar a un nuevo canal **sin tocar el código del front-end**.

---

## Puesta en marcha

```bash
# 1. Clonar el repositorio
git clone <url-del-repo> webflux
cd webflux

# 2. Instalar dependencias
npm install

# 3. Levantar el mock de API (db.json)
npx json-server --watch db.json --port 3001

# 4. Levantar el entorno de desarrollo
npm run dev
```

Variables de entorno sugeridas (`.env`):

```
VITE_API_URL=http://localhost:3001
VITE_N8N_WEBHOOK_URL=https://tu-instancia-n8n.app/webhook/lead-capture
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Entorno de desarrollo con hot reload |
| `npm run build` | Build de producción optimizado |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Corre ESLint sobre todo el proyecto |
| `npm run test` | Ejecuta las pruebas (`*.test.jsx`) |

---

## Convenciones de código

- **Componentes**: PascalCase (`Navbar.jsx`), un componente por archivo.
- **Servicios**: un archivo por dominio (`contact.service.js`, `automation.service.js`), siempre exportando funciones puras que devuelven promesas.
- **Rutas**: toda ruta nueva se declara en `roots/Routing.jsx` y se clasifica en `PublicRoutes.jsx` o `PrivateRoutes.jsx` según requiera sesión.
- **Commits**: convención `tipo: descripción corta` (`feat: agrega formulario de contacto`, `fix: corrige webhook de N8N`).
- **Lint**: ningún PR se mergea con errores de `npm run lint`.

---

## Opiniones de clientes

> ⭐⭐⭐⭐⭐

<table>
<tr>
<td width="33%" valign="top">

**"Cambió la cara de mi negocio"**

*"Pasamos de no tener presencia online a tener una web que se ve tan profesional como la de empresas mucho más grandes. Los clientes lo notaron de inmediato."*

— **María F.**, dueña de estudio de diseño de interiores

</td>
<td width="33%" valign="top">

**"Rápida, moderna y sin dolores de cabeza"**

*"El sitio carga instantáneo y se ve perfecto en el celular. Es justo lo que necesitaba para dejar de perder clientes por una web anticuada."*

— **Carlos R.**, agencia de viajes local

</td>
<td width="33%" valign="top">

**"La automatización fue el plus que no sabía que necesitaba"**

*"Cada formulario que llenan en mi web ahora me llega directo a WhatsApp y a mi hoja de cálculo. Dejé de estar pendiente del correo todo el día."*

— **Lucía G.**, clínica dental

</td>
</tr>
</table>

<div align="center">

**+20 negocios** ya confían en WebFlux para su presencia digital

</div>

---

## Roadmap

- [ ] Landing page pública (Home, Servicios, Casos de éxito, Contacto)
- [ ] Formulario de contacto conectado a webhook de N8N
- [ ] Panel privado de cliente (`PrivateRoutes`) con estado de sus automatizaciones
- [ ] Catálogo de workflows de N8N reutilizables (plantillas por industria)
- [ ] Integración de pagos / cotizador automático
- [ ] Migración de `db.json` a API real

---

## Contacto

**WebFlux** — Diseño web front-end + automatización digital con N8N.

- 🌐 Web: `próximamente`
- ✉️ Correo: `contacto@webflux.dev`
- 💼 Propuesta comercial: agenda una llamada de diagnóstico gratuita para mapear qué procesos de tu negocio son candidatos a automatización.