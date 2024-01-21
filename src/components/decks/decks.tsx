import { useMemo, useState } from 'react'

import { Link, useSearchParams } from 'react-router-dom'

import { Button, TextField } from '@/components'
import { Sort, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '@/services/decks/decks.service.ts'

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last updated',
    sortable: true,
  },
  {
    key: 'author.name',
    title: 'Created by',
    sortable: true,
  },
  {
    key: '',
    title: '',
    sortable: false,
  },
]

export const Decks = () => {
  const [search, setSearch] = useSearchParams()
  const [name, setName] = useState('')
  const orderBy = JSON.parse(search.get('orderBy') ?? 'null')
  const setOrderBy = (value: Sort) => {
    search.set('orderBy', JSON.stringify(value))
    setSearch(search)
  }
  const orderByString = useMemo(() => {
    if (!orderBy) return null

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const { data, isLoading, error } = useGetDecksQuery({
    name,
    orderBy: orderByString,
  })

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}...</h1>
  }

  return (
    <div
      style={{
        maxWidth: 1280,
        padding: '24px 137px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <Link to={'login'}>Login</Link>
      <TextField onValueChange={setName} value={name} label={'Search'} />
      <Button
        disabled={isDeckBeingCreated}
        onClick={() => {
          createDeck({
            name: '🥳 new card',
          })
        }}
      >
        Create deck
      </Button>
      <Table width={'100%'}>
        <TableHeader columns={columns} sort={orderBy} onSort={setOrderBy} />
        <TableBody>
          {data?.items?.map(deck => {
            return (
              <TableRow key={deck.id}>
                <TableCell>{deck.name}</TableCell>
                <TableCell>{deck.cardsCount}</TableCell>
                <TableCell>{new Date(deck.updated).toLocaleDateString('ru-RU')}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
                <TableCell>
                  <button
                    style={{ all: 'unset' }}
                    onClick={() => deleteDeck({ id: deck.id })}
                    disabled={isDeckBeingDeleted}
                  >
                    <TrashOutline />
                  </button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

const TrashOutline = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_53159_1173)">
        <path
          d="M13.9999 4.00011H10.6666V2.88677C10.6509 2.45998 10.4667 2.05681 10.1543 1.76563C9.84188 1.47446 9.42675 1.31903 8.99992 1.33344H6.99992C6.57309 1.31903 6.15796 1.47446 5.84554 1.76563C5.53312 2.05681 5.34889 2.45998 5.33325 2.88677V4.00011H1.99992C1.82311 4.00011 1.65354 4.07034 1.52851 4.19537C1.40349 4.32039 1.33325 4.48996 1.33325 4.66677C1.33325 4.84358 1.40349 5.01315 1.52851 5.13818C1.65354 5.2632 1.82311 5.33344 1.99992 5.33344H2.66659V12.6668C2.66659 13.1972 2.8773 13.7059 3.25237 14.081C3.62744 14.4561 4.13615 14.6668 4.66659 14.6668H11.3333C11.8637 14.6668 12.3724 14.4561 12.7475 14.081C13.1225 13.7059 13.3333 13.1972 13.3333 12.6668V5.33344H13.9999C14.1767 5.33344 14.3463 5.2632 14.4713 5.13818C14.5963 5.01315 14.6666 4.84358 14.6666 4.66677C14.6666 4.48996 14.5963 4.32039 14.4713 4.19537C14.3463 4.07034 14.1767 4.00011 13.9999 4.00011ZM6.66659 2.88677C6.66659 2.78011 6.80659 2.66677 6.99992 2.66677H8.99992C9.19325 2.66677 9.33325 2.78011 9.33325 2.88677V4.00011H6.66659V2.88677ZM11.9999 12.6668C11.9999 12.8436 11.9297 13.0132 11.8047 13.1382C11.6796 13.2632 11.5101 13.3334 11.3333 13.3334H4.66659C4.48977 13.3334 4.32021 13.2632 4.19518 13.1382C4.07016 13.0132 3.99992 12.8436 3.99992 12.6668V5.33344H11.9999V12.6668Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_53159_1173">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
