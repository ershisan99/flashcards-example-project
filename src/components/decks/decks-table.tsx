import { Link } from 'react-router-dom'

import {
  Column,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { Deck } from '@/services/decks'
import { formatDate } from '@/utils'

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

type Props = {
  decks: Deck[] | undefined
}
export const DecksTable = ({ decks }: Props) => {
  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <Typography variant={'body2'} as={Link} to={`/decks/${deck.id}`}>
                {deck.name}
              </Typography>
            </TableCell>
            <TableCell>{deck.cardsCount}</TableCell>
            <TableCell>{formatDate(deck.updated)}</TableCell>
            <TableCell>{deck.author.name}</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
