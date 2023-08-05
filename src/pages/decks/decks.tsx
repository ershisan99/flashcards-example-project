import { useState } from 'react'

import { Button, TextField } from '@/components'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const Decks = () => {
  const [cardName, setCardName] = useState('')

  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const { isLoading, data, refetch } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  const handleCreateClicked = () => createDeck({ name: cardName })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div>
        <Button onClick={refetch}>refetch</Button>
      </div>
      <div>
        <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>
        <Button onClick={() => setItemsPerPage(20)}>itemsPerPage: 20</Button>
        <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>
      </div>
      <div>
        <Button onClick={() => setCurrentPage(1)}>currentPage: 1</Button>
        <Button onClick={() => setCurrentPage(2)}>currentPage: 2</Button>
        <Button onClick={() => setCurrentPage(3)}>currentPage: 3</Button>
      </div>
      <TextField value={searchByName} onChange={e => setSearch(e.currentTarget.value)} />
      <TextField
        value={cardName}
        onChange={e => setCardName(e.currentTarget.value)}
        label={'card name'}
      />
      <Button onClick={handleCreateClicked}>Create deck</Button>
      isCreateDeckLoading: {isCreateDeckLoading.toString()}
      <Table>
        {/* table*/}
        <TableHead>
          {/* thead*/}
          <TableRow>
            {/* tr*/}
            <TableHeadCell>Name</TableHeadCell>
            {/* th*/}
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Created By</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* tbody*/}
          {data?.items.map(deck => {
            return (
              <TableRow key={deck.id}>
                {/* tr*/}
                <TableCell>{deck.name}</TableCell> {/* td*/}
                <TableCell>{deck.cardsCount}</TableCell>
                <TableCell>{new Date(deck.updated).toLocaleString('en-GB')}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
