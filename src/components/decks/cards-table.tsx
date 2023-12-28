import { Column, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components'
import { Card } from '@/services/decks'
import { formatDate } from '@/utils'

const columns: Column[] = [
  {
    key: 'question',
    sortable: true,
    title: 'Question',
  },
  {
    key: 'answer',
    sortable: true,
    title: 'Answer',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'grade',
    sortable: true,
    title: 'Grade',
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
