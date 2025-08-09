import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/app'
import { env } from "@/env"
import { mockWorker } from "@/services/pizza-shop/mock"

(async () => {

  if ( env.MODE === 'mock' ) {
    await mockWorker.start()
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  
})()