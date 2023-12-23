import { useSearchParams } from 'react-router-dom'

import s from './decks.module.scss'

import { Button, TextField, Typography } from '@/components'
import { Page } from '@/components/ui/page/page.tsx'
import { Pagination } from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service.ts'

export const Decks = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1', name: '' })
  const page = Number(searchParams.get('page'))
  const name = searchParams.get('name')
  const setPage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }

  const setName = (name: string) => {
    if (name === '') {
      searchParams.delete('name')
    } else {
      searchParams.set('name', name)
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }
  const { data, isLoading, error } = useGetDecksQuery({
    currentPage: page || 1,
    itemsPerPage: 8,
    name: name ?? undefined,
  })

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error(error)

    return <div>Error</div>
  }

  return (
    <Page>
      <div className={s.header}>
        <Typography variant="large" as={'h1'}>
          Decks
        </Typography>
        <Button onClick={() => createDeck({ name: '123123' })}>Add new deck</Button>
      </div>
      <div className={s.filter}>
        <TextField
          type={'search'}
          placeholder={'Search decks'}
          value={name ?? ''}
          onValueChange={setName}
        />
        <div className={s.tabs}>
          <Button>My decks</Button>
          <Button>All decks</Button>
        </div>
        <input type={'range'} />
        <Button variant={'secondary'}>Clear</Button>
      </div>
      <Table width={'100%'}>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last updated</TableHeadCell>
            <TableHeadCell>Created by</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map(deck => {
            return (
              <TableRow key={deck.id}>
                <TableCell>{deck.name}</TableCell>
                <TableCell>{deck.cardsCount}</TableCell>
                <TableCell>{new Date(deck.updated).toLocaleDateString()}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination count={data?.pagination?.totalPages ?? 1} onChange={setPage} page={page} />
    </Page>
  )
}
