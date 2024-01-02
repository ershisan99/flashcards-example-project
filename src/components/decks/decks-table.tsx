import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import {
  Button,
  Column,
  Sort,
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
  onSort: (key: Sort) => void
  sort: Sort
}

export const DecksTable = ({
  currentUserId,
  decks,
  onDeleteClick,
  onEditClick,
  onSort,
  sort,
}: Props) => {
  const handleEditClick = (id: string) => () => onEditClick(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)

  return (
    <Table>
      <TableHeader columns={columns} onSort={onSort} sort={sort} />
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
                <Button as={Link} to={`/decks/${deck.id}/learn`} variant={'icon'}>
                  <PlayCircleOutline />
                </Button>
                {deck.author.id === currentUserId && (
                  <>
                    <Button onClick={handleEditClick(deck.id)} variant={'icon'}>
                      <Edit2Outline />
                    </Button>
                    <Button onClick={handleDeleteClick(deck.id)} variant={'icon'}>
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
