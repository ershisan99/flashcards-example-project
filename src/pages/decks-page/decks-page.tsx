import { useState } from 'react'

import s from './decks-page.module.scss'

import { Button, Page, Slider, TextField, Typography } from '@/components'
import { DecksTable } from '@/components/decks/decks-table.tsx'
import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetDecksQuery } from '@/services/decks'

export const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: decks } = useGetDecksQuery()
  const [activeTab, setActiveTab] = useState('my')
  const [range, setRange] = useState([0, 100])
  const [rangeValue, setRangeValue] = useState([0, 1])

  if (!decks) return <div>loading...</div>

  return (
    <Page>
      <div className={s.root}>
        <div className={s.header}>
          <Typography variant="large">Decks</Typography>
          <Button>Add new deck</Button>
        </div>
        <div className={s.filters}>
          <TextField placeholder="Search" search />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value={'my'}>My decks</TabsTrigger>
              <TabsTrigger value={'all'}>All decks</TabsTrigger>
            </TabsList>
          </Tabs>
          <Slider onValueCommit={setRange} value={rangeValue} onValueChange={setRangeValue} />
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
