import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Button, TextField, Typography, CardsTable } from '@/components'
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
      <TextField search placeholder={'Search cards'} />
      <CardsTable cards={cardsData?.items} />
      <Pagination
        count={cardsData?.pagination?.totalPages || 1}
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  )
}
