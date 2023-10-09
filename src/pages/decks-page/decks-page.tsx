import { useState } from 'react'

import s from './decks-page.module.scss'

import { Button, Page, Slider, TextField, Typography } from '@/components'
import { DecksTable } from '@/components/decks/decks-table'
import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tab, useGetDecksQuery } from '@/services/decks'
import {
  selectDecksCurrentPage,
  selectDecksCurrentTab,
  selectDecksMaxCards,
  selectDecksMinCards,
  selectDecksSearch,
} from '@/services/decks/decks.selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const DecksPage = () => {
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

  const [rangeValue, setRangeValue] = useState([minCards, maxCards])

  const handleSliderCommitted = (value: number[]) => {
    setMinCards(value[0])
    setMaxCards(value[1])
  }

  const authorId = currentTab === 'my' ? 'f2be95b9-4d07-4751-a775-bd612fc9553a' : undefined

  const { data: decks } = useGetDecksQuery({
    currentPage,
    minCardsCount: minCards,
    maxCardsCount: maxCards,
    name: search,
    authorId,
  })

  if (!decks) return <div>loading...</div>

  return (
    <Page>
      <div className={s.root}>
        <div className={s.header}>
          <Typography variant="large">Decks</Typography>
          <Button>Add new deck</Button>
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
          <Button variant={'secondary'}>Clear filters</Button>
        </div>
        <DecksTable decks={decks?.items} />
        <Pagination
          count={decks?.pagination?.totalPages || 1}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </Page>
  )
}
