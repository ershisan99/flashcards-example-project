import { useState } from 'react'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Button, TextField } from '@/components'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Login } from '@/pages/login.tsx'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
} from '@/services/auth/auth.service.ts'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
  {
    path: '*',
    element: <h1>404</h1>,
  },
])

export const Router = () => {
  const [logOut] = useLogoutMutation()

  return (
    <div>
      <Button onClick={() => logOut()}>log out</Button>
      <RouterProvider router={router} />
    </div>
  )
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError

  if (isLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

function Decks() {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<Blob | undefined>()
  const searchByName = useAppSelector(state => state.decks.searchByName)
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const setCurrentPage = (page: number) => dispatch(decksSlice.actions.setCurrentPage(page))
  const setSearchByName = (name: string) => dispatch(decksSlice.actions.setSearchByName(name))
  const { currentData: data } = useGetDecksQuery({ currentPage, name: searchByName })
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateProfile] = useUpdateProfileMutation()

  return (
    <div>
      <input type={'file'} onChange={e => setValue(e.currentTarget.files?.[0])} />
      <Button
        onClick={() => {
          const formData = new FormData()

          if (value) formData.append('avatar', value)
          if (value) formData.append('name', 'Inocencio')
          console.log(formData.get('avatar'))
          console.log(formData.get('name'))
          updateProfile(formData)
        }}
      >
        Update avatar
      </Button>
      <Button
        onClick={() => {
          createDeck({ name: 'new deck 123' })
        }}
      >
        Create deck
      </Button>

      <TextField
        value={searchByName}
        onChange={event => {
          setSearchByName(event.target.value)
        }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Updated at</TableHeadCell>
            <TableHeadCell>Created By</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items?.map(deck => (
            <TableRow key={deck.id}>
              <TableCell>{deck.name}</TableCell>
              <TableCell>{deck.cardsCount}</TableCell>
              <TableCell>{new Date(deck.updated).toLocaleDateString()}</TableCell>
              <TableCell>
                <button onClick={() => deleteDeck({ id: deck.id })}>delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '24px' }}>
        {[...Array(data?.pagination?.totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => {
              setCurrentPage(index + 1)
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
