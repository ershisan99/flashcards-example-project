import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button, CardsTable, TextField, Typography } from '@/components'
import { Pagination } from '@/components/ui/pagination'
import { useGetDeckByIdQuery, useGetDeckCardsQuery } from '@/services'

export const DeckPage = () => {
  const { deckId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId || '' })
  const { data: cardsData } = useGetDeckCardsQuery({ id: deckId || '' })

  const learnLink = `/decks/${deckId}/learn`

  return (
    <div>
      <Typography variant={'large'}>{deckData?.name}</Typography>
      <Button as={Link} to={learnLink}>
        Learn
      </Button>
      <TextField placeholder={'Search cards'} search />
      <CardsTable cards={cardsData?.items} />
      <Pagination
        count={cardsData?.pagination?.totalPages || 1}
        onChange={setCurrentPage}
        page={currentPage}
      />
    </div>
  )
}
