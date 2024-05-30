import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, Star, StarOutline, TrashOutline } from '@/assets'
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
const placeholderImage =
  'https://production-it-incubator.s3.eu-central-1.amazonaws.com/file-manager/Image/fb0c2ac3-807c-4805-910a-8cd2abe204e5_image-1717091563266.png'

type Props = {
  currentUserId: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (id: string) => void
  onFavoriteToggle: (id: string, isFavorite: boolean) => void
  onSort: (key: Sort) => void
  sort: Sort
}

export const DecksTable = ({
  currentUserId,
  decks,
  onDeleteClick,
  onEditClick,
  onFavoriteToggle,
  onSort,
  sort,
}: Props) => {
  const handleEditClick = (id: string) => () => onEditClick(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick(id)
  const handleFavoriteToggle = (id: string, isFavorite: boolean) => () =>
    onFavoriteToggle(id, isFavorite)

  return (
    <Table>
      <TableHeader columns={columns} onSort={onSort} sort={sort} />
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <div className={s.nameContainer}>
                <img alt={deck.name} src={deck.cover ?? placeholderImage} />
                <Typography as={Link} to={`/decks/${deck.id}`} variant={'body2'}>
                  {deck.name}
                </Typography>
              </div>
            </TableCell>
            <TableCell>{deck.cardsCount}</TableCell>
            <TableCell>{formatDate(deck.updated)}</TableCell>
            <TableCell>{deck.author.name}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}>
                <Button
                  className={s.favoriteToggle}
                  onClick={handleFavoriteToggle(deck.id, !deck.isFavorite)}
                  variant={'icon'}
                >
                  {deck.isFavorite ? (
                    <Star height={16} width={16} />
                  ) : (
                    <StarOutline height={16} width={16} />
                  )}
                </Button>
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
