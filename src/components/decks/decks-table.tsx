import { Link } from 'react-router-dom'

import s from './decks-table.module.scss'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import {
  Button,
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
  onDeleteClick: (id: string) => void
  currentUserId: string
  onEditClick: (id: string) => void
}
export const DecksTable = ({ decks, onEditClick, onDeleteClick, currentUserId }: Props) => {
  const handleEditClick = (id: string) => () => onEditClick(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)

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
            <TableCell>
              <div className={s.iconsContainer}>
                <Button variant={'icon'} as={Link} to={`/decks/${deck.id}/learn`}>
                  <PlayCircleOutline />
                </Button>
                {deck.author.id === currentUserId && (
                  <>
                    <Button variant={'icon'} onClick={handleEditClick(deck.id)}>
                      <Edit2Outline />
                    </Button>
                    <Button variant={'icon'} onClick={handleDeleteClick(deck.id)}>
                      <TrashOutline />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
