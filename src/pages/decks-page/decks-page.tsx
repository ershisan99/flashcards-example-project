import { useState } from 'react'

import { Button, DecksTable, Page, Slider, Spinner, TextField, Typography } from '@/components'
import { DeckDialog } from '@/components/decks/deck-dialog'
import { DeleteDeckDialog } from '@/components/decks/delete-deck-dialog'
import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDeckSearchParams } from '@/pages/decks-page/use-deck-search-params'
import { useMeQuery } from '@/services/auth/auth.service'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks'

import s from './decks-page.module.scss'

export const DecksPage = () => {
  const { data: me } = useMeQuery()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deckToDeleteId, setDeckToDeleteId] = useState<null | string>(null)
  const [deckToEditId, setDeckToEditId] = useState<null | string>(null)

  const showEditModal = !!deckToEditId

  const {
    currentPage,
    currentTab,
    maxCardsCount,
    minCardsCount,
    rangeValue,
    search,
    setCurrentPage,
    setCurrentTab,
    setMaxCards,
    setMinCards,
    setRangeValue,
    setSearch,
    setSort,
    sort,
  } = useDeckSearchParams()

  const currentUserId = me?.id
  const authorId = currentTab === 'my' ? currentUserId : undefined
  const { currentData: decksCurrentData, data: decksData } = useGetDecksQuery({
    authorId,
    currentPage,
    maxCardsCount,
    minCardsCount,
    name: search,
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })
  const resetFilters = () => {
    setCurrentPage(null)
    setSearch(null)
    setMinCards(null)
    setMaxCards(null)
    setRangeValue([0, decks?.maxCardsCount ?? null])
    setSort(null)
  }
  const decks = decksCurrentData ?? decksData

  const showConfirmDeleteModal = !!deckToDeleteId
  const deckToDeleteName = decks?.items?.find(deck => deck.id === deckToDeleteId)?.name

  const deckToEdit = decks?.items?.find(deck => deck.id === deckToEditId)

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const openCreateModal = () => setShowCreateModal(true)

  const handleSearch = (search: null | string) => {
    setCurrentPage(null)
    setSearch(search)
  }
  const handleSliderCommitted = (value: number[]) => {
    setCurrentPage(null)
    setMinCards(value[0])
    setMaxCards(value[1])
  }

  const handleTabChange = (tab: string) => {
    setCurrentPage(null)
    setCurrentTab(tab)
  }

  if (!decks || !me) {
    return <Spinner fullScreen />
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
          <TextField
            onValueChange={handleSearch}
            placeholder={'Search'}
            type={'search'}
            value={search ?? ''}
          />
          <Tabs asChild onValueChange={handleTabChange} value={currentTab ?? undefined}>
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
          onSort={setSort}
          sort={sort}
        />
        <Pagination
          className={s.pagination}
          count={decks?.pagination?.totalPages || 1}
          onChange={setCurrentPage}
          page={currentPage ?? 1}
        />
      </div>
    </Page>
  )
}
