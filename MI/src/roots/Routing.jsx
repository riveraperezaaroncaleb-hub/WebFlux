import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import PrivateRoutes from '../routes/PrivateRoutes.jsx'
import PublicRoutes from '../routes/PublicRoutes.jsx'

function PrivatePlaceholder() {
  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p>Panel privado de cliente — próximamente.</p>
    </main>
  )
}

export default function Routing() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/privado" element={<PrivatePlaceholder />} />
      </Route>
    </Routes>
  )
}