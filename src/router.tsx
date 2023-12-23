import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import { LoginPage } from '@/pages/auth/login/login.tsx'
import { Decks } from '@/pages/decks/decks.tsx'

const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
]
const privateRoutes = [
  {
    path: '/',
    element: <Decks />,
  },
]

const router = createBrowserRouter([
  ...publicRoutes,
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
