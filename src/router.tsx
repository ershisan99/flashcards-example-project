import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { SignInPage, DecksPage } from './pages'

import { DeckPage } from '@/pages/deck-page/deck-page.tsx'

const publicRoutes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [
      {
        path: '/login',
        element: <SignInPage />,
      },
    ],
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
  {
    path: '/decks/:deckId',
    element: <DeckPage />,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
