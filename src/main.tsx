import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    console.log('Nueva versión disponible. Actualiza la página.');
  },
  onOfflineReady() {
    console.log('La app está lista para usarse offline.');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

