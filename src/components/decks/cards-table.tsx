import { Column, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components'
import { Card } from '@/services/decks'
import { formatDate } from '@/utils'

const columns: Column[] = [
  {
    key: 'question',
    title: 'Question',
    sortable: true,
  },
  {
    key: 'answer',
    title: 'Answer',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'grade',
    title: 'Grade',
    sortable: true,
  },
]

type Props = {
  cards: Card[] | undefined
}
export const CardsTable = ({ cards }: Props) => {
  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        {cards?.map(card => (
          <TableRow key={card.id}>
            <TableCell>{card.question}</TableCell>
            <TableCell>{card.answer}</TableCell>
            <TableCell>{formatDate(card.updated)}</TableCell>
            <TableCell>{card.grade}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
