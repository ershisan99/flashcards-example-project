import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
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

import s from './decks-table.module.scss'

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
  currentUserId: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
}
export const DecksTable = ({ currentUserId, decks, onDeleteClick, onEditClick }: Props) => {
  const handleEditClick = (id: string) => () => onEditClick(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)

  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <Typography as={Link} to={`/decks/${deck.id}`} variant={'body2'}>
                {deck.name}
              </Typography>
            </TableCell>
            <TableCell>{deck.cardsCount}</TableCell>
            <TableCell>{formatDate(deck.updated)}</TableCell>
            <TableCell>{deck.author.name}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}>
                <Link to={`/decks/${deck.id}/learn`}>
                  <PlayCircleOutline />
                </Link>
                {deck.author.id === currentUserId && (
                  <>
                    <button onClick={handleEditClick(deck.id)}>
                      <Edit2Outline />
                    </button>
                    <button onClick={handleDeleteClick(deck.id)}>
                      <TrashOutline />
                    </button>
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
