import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>hello</div>,
  },
]

const router = createBrowserRouter(routes)

export const Router = () => {
  return <RouterProvider router={router} />
}
