import s from './decks-table.module.scss'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components'

type Deck = {
  cards: number
  createdBy: string
  id: string
  lastUpdated: string
  name: string
}

type Props = {
  decks: Deck[] | undefined
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
}

export const DecksTable = ({ decks, onDeleteClick, onEditClick }: Props) => {
  const handleEditClick = (id: string) => () => onEditClick?.(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last updated</TableHeadCell>
          <TableHeadCell>Author</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <Typography as={'a'} href={`/decks/${deck.id}`} variant={'body2'}>
                {deck.name}
              </Typography>
            </TableCell>
            <TableCell>{deck.cards}</TableCell>
            <TableCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableCell>
            <TableCell>{deck.createdBy}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}>
                <Button as={'a'} href={`/decks/${deck.id}/learn`} variant={'icon'}>
                  <PlayCircleOutline />
                </Button>
                <Button onClick={handleEditClick(deck.id)} variant={'icon'}>
                  <Edit2Outline />
                </Button>
                <Button onClick={handleDeleteClick(deck.id)} variant={'icon'}>
                  <TrashOutline />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
