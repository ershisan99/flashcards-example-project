import { useState } from 'react'

import s from './decks-page.module.scss'

import { Button, Page, Slider, TextField, Typography } from '@/components'
import { DeckDialog } from '@/components/decks/deck-dialog'
import { DecksTable } from '@/components/decks/decks-table'
import { DeleteDeckDialog } from '@/components/decks/delete-deck-dialog'
import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tab,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks'
import {
  selectDecksCurrentPage,
  selectDecksCurrentTab,
  selectDecksMaxCards,
  selectDecksMinCards,
  selectDecksSearch,
} from '@/services/decks/decks.selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store'

export const DecksPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deckToDeleteId, setDeckToDeleteId] = useState<string | null>(null)
  const [deckToEditId, setDeckToEditId] = useState<string | null>(null)

  const showEditModal = !!deckToEditId

  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectDecksCurrentPage)
  const minCards = useAppSelector(selectDecksMinCards)
  const maxCards = useAppSelector(selectDecksMaxCards)
  const currentTab = useAppSelector(selectDecksCurrentTab)
  const search = useAppSelector(selectDecksSearch)
  const setCurrentPage = (page: number) => dispatch(decksSlice.actions.setCurrentPage(page))
  const setMinCards = (minCards: number) => dispatch(decksSlice.actions.setMinCards(minCards))
  const setMaxCards = (maxCards: number) => dispatch(decksSlice.actions.setMaxCards(maxCards))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearch(search))
  const setCurrentTab = (tab: Tab) => dispatch(decksSlice.actions.setCurrentTab(tab))

  const resetFilters = () => {
    dispatch(decksSlice.actions.resetFilters())
    setRangeValue([0, decks?.maxCardsCount || undefined])
  }

  const [rangeValue, setRangeValue] = useState([minCards, maxCards])

  const handleSliderCommitted = (value: number[]) => {
    setMinCards(value[0])
    setMaxCards(value[1])
  }
  const currentUserId = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const authorId = currentTab === 'my' ? currentUserId : undefined

  const { data: decks } = useGetDecksQuery({
    currentPage,
    minCardsCount: minCards,
    maxCardsCount: maxCards,
    name: search,
    authorId,
  })

  const showConfirmDeleteModal = !!deckToDeleteId
  const deckToDeleteName = decks?.items?.find(deck => deck.id === deckToDeleteId)?.name

  const deckToEdit = decks?.items?.find(deck => deck.id === deckToEditId)

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const openCreateModal = () => setShowCreateModal(true)

  if (!decks) return <div>loading...</div>

  return (
    <Page>
      <DeleteDeckDialog
        open={showConfirmDeleteModal}
        onOpenChange={() => setDeckToDeleteId(null)}
        deckName={deckToDeleteName ?? 'Selected deck'}
        onCancel={() => setDeckToDeleteId(null)}
        onConfirm={() => {
          deleteDeck({ id: deckToDeleteId ?? '' })
          setDeckToDeleteId(null)
        }}
      />
      <DeckDialog
        open={showEditModal}
        onOpenChange={() => setDeckToEditId(null)}
        onConfirm={data => {
          if (!deckToEditId) return

          updateDeck({ id: deckToEditId, ...data })
        }}
        defaultValues={deckToEdit}
        key={deckToEditId}
      />
      <div className={s.root}>
        <div className={s.header}>
          <Typography variant="large">Decks</Typography>
          <Button onClick={openCreateModal}>Add new deck</Button>
          <DeckDialog
            open={showCreateModal}
            onOpenChange={setShowCreateModal}
            onConfirm={createDeck}
            onCancel={() => setShowCreateModal(false)}
          />
        </div>
        <div className={s.filters}>
          <TextField placeholder="Search" search value={search} onValueChange={setSearch} />
          <Tabs value={currentTab} onValueChange={value => setCurrentTab(value as Tab)}>
            <TabsList>
              <TabsTrigger value={'my'}>My decks</TabsTrigger>
              <TabsTrigger value={'all'}>All decks</TabsTrigger>
            </TabsList>
          </Tabs>
          <Slider
            onValueCommit={handleSliderCommitted}
            value={rangeValue}
            onValueChange={setRangeValue}
            min={0}
            max={decks?.maxCardsCount || 0}
          />
          <Button variant={'secondary'} onClick={resetFilters}>
            Clear filters
          </Button>
        </div>
        <DecksTable
          decks={decks?.items}
          onDeleteClick={setDeckToDeleteId}
          onEditClick={setDeckToEditId}
          currentUserId={currentUserId}
        />
        <Pagination
          count={decks?.pagination?.totalPages || 1}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </Page>
  )
}
