import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import '@/shared/i18n/i18n'
import { router } from '@/app/router'
import '@/app/globals.css'
import 'pretendard/dist/web/static/Pretendard-Regular.css'
import 'pretendard/dist/web/static/Pretendard-SemiBold.css'

const container = document.getElementById('root')
if (!container) throw new Error('#root element not found')

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
