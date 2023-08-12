import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { Button, ControlledTextField, TextField } from '@/components'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useLogoutMutation } from '@/services/auth/auth.ts'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { CreateDeckArgs } from '@/services/decks/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const Decks = () => {
  const [cardName, setCardName] = useState('')

  const { register, control, handleSubmit } = useForm<{
    name: string
    cover: File[]
  }>()

  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const orderBy = useAppSelector(state => state.decksSlice.orderBy)

  const setItemsPerPage = (itemsPerPage: number) => {
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  }
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const {
    isLoading,
    currentData: data,
    refetch,
  } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy,
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()
  const [deleteDeck, { error }] = useDeleteDeckMutation()
  const [logout] = useLogoutMutation()

  const handleCreateClicked = handleSubmit(data => {
    const formData = new FormData()

    console.log(data.cover)
    formData.append('name', data.name)
    formData.append('cover', data.cover[0])

    createDeck(formData as unknown as CreateDeckArgs)
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {/*<div>*/}
      {/*  <Button onClick={refetch}>refetch</Button>*/}
      {/*  <Button onClick={logout}>Logout</Button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>*/}
      {/*  <Button onClick={() => setItemsPerPage(20)}>itemsPerPage: 20</Button>*/}
      {/*  <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Button onClick={() => setCurrentPage(1)}>currentPage: 1</Button>*/}
      {/*  <Button onClick={() => setCurrentPage(2)}>currentPage: 2</Button>*/}
      {/*  <Button onClick={() => setCurrentPage(3)}>currentPage: 3</Button>*/}
      {/*</div>*/}
      {/*<TextField value={searchByName} onChange={e => setSearch(e.currentTarget.value)} />*/}
      <form onSubmit={handleCreateClicked}>
        <ControlledTextField name={'name'} control={control} label={'name'} />
        <input type={'file'} {...register('cover')} />
        <Button>Create deck</Button>
      </form>
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
                <TableCell>{deck.name}</TableCell> {/* td*/}
                <TableCell>{deck.cardsCount}</TableCell>
                <TableCell>{new Date(deck.updated).toLocaleString('en-GB')}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteDeck({ id: deck.id })}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
