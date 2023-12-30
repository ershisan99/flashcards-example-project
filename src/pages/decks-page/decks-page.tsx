import { useState } from 'react'

import { Button, DecksTable, Page, Slider, TextField, Typography } from '@/components'
import { DeckDialog } from '@/components/decks/deck-dialog'
import { DeleteDeckDialog } from '@/components/decks/delete-deck-dialog'
import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMeQuery } from '@/services/auth/auth.service'
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
} from '@/services/decks/decks.selectors'
import { decksSlice } from '@/services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './decks-page.module.scss'

export const DecksPage = () => {
  const { data: me } = useMeQuery()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deckToDeleteId, setDeckToDeleteId] = useState<null | string>(null)
  const [deckToEditId, setDeckToEditId] = useState<null | string>(null)

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
  const setCurrentTab = (tab: { authorId?: string; tab: Tab }) =>
    dispatch(decksSlice.actions.setCurrentTab(tab))

  const resetFilters = () => {
    dispatch(decksSlice.actions.resetFilters())
    setRangeValue([0, decks?.maxCardsCount || undefined])
  }

  const [rangeValue, setRangeValue] = useState([minCards, maxCards])

  const handleSliderCommitted = (value: number[]) => {
    setMinCards(value[0])
    setMaxCards(value[1])
  }
  const currentUserId = me?.id
  const authorId = currentTab === 'my' ? currentUserId : undefined
  const { currentData: decksCurrentData, data: decksData } = useGetDecksQuery({
    authorId,
    currentPage,
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    name: search,
  })

  const decks = decksCurrentData ?? decksData

  const showConfirmDeleteModal = !!deckToDeleteId
  const deckToDeleteName = decks?.items?.find(deck => deck.id === deckToDeleteId)?.name

  const deckToEdit = decks?.items?.find(deck => deck.id === deckToEditId)

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const openCreateModal = () => setShowCreateModal(true)

  if (!decks || !me) {
    return <div>loading...</div>
  }

  return (
    <Page>
      <DeleteDeckDialog
        deckName={deckToDeleteName ?? 'Selected deck'}
        onCancel={() => setDeckToDeleteId(null)}
        onConfirm={() => {
          deleteDeck({ id: deckToDeleteId ?? '' })
          setDeckToDeleteId(null)
        }}
        onOpenChange={() => setDeckToDeleteId(null)}
        open={showConfirmDeleteModal}
      />
      <DeckDialog
        defaultValues={deckToEdit}
        key={deckToEditId}
        onConfirm={data => {
          if (!deckToEditId) {
            return
          }

          updateDeck({ id: deckToEditId, ...data })
        }}
        onOpenChange={() => setDeckToEditId(null)}
        open={showEditModal}
      />
      <div className={s.root}>
        <div className={s.header}>
          <Typography variant={'large'}>Decks</Typography>
          <Button onClick={openCreateModal}>Add new deck</Button>
          <DeckDialog
            onCancel={() => setShowCreateModal(false)}
            onConfirm={data => {
              resetFilters()
              createDeck(data)
            }}
            onOpenChange={setShowCreateModal}
            open={showCreateModal}
          />
        </div>
        <div className={s.filters}>
          <TextField onValueChange={setSearch} placeholder={'Search'} search value={search} />
          <Tabs
            onValueChange={value => setCurrentTab({ authorId: currentUserId, tab: value as Tab })}
            value={currentTab}
          >
            <TabsList>
              <TabsTrigger value={'my'}>My decks</TabsTrigger>
              <TabsTrigger value={'all'}>All decks</TabsTrigger>
            </TabsList>
          </Tabs>
          <Slider
            max={decks?.maxCardsCount || 0}
            min={0}
            onValueChange={setRangeValue}
            onValueCommit={handleSliderCommitted}
            value={rangeValue}
          />
          <Button onClick={resetFilters} variant={'secondary'}>
            Clear filters
          </Button>
        </div>
        <DecksTable
          currentUserId={currentUserId ?? ''}
          decks={decks?.items}
          onDeleteClick={setDeckToDeleteId}
          onEditClick={setDeckToEditId}
        />
        <Pagination
          count={decks?.pagination?.totalPages || 1}
          onChange={setCurrentPage}
          page={currentPage}
        />
      </div>
    </Page>
  )
}
