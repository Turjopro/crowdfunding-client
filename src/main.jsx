import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import './index.css'
import router from './routes/router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </AuthProvider>
  </StrictMode>,
)