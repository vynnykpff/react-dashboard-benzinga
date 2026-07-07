import { createRoot } from 'react-dom/client'
import { App } from './views/App.tsx'
import './views/styles/index.css'

createRoot(document.getElementById('root')!).render(<App />)
