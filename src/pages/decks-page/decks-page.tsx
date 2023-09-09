import { useState } from 'react'

import s from './decks-page.module.scss'

import {
  Button,
  Page,
  Typography,
  Column,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TextField,
  Slider,
} from '@/components'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetDecksQuery } from '@/services/decks'

const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'author',
    title: 'Created By',
  },
  {
    key: 'actions',
    title: '',
  },
]

export const DecksPage = () => {
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
        <Table>
          <TableHeader columns={columns} />
          <TableBody>
            {decks?.items.map(deck => (
              <TableRow key={deck.id}>
                <TableCell>{deck.name}</TableCell>
                <TableCell>{deck.cardsCount}</TableCell>
                <TableCell>{deck.updated}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
                <TableCell>...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  )
}
