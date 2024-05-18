import { useParams } from 'react-router-dom'

import { Card, Typography } from '@/components'
import { useGetDeckByIdQuery } from '@/services'

import s from './learn.page.module.scss'

export const LearnPage = () => {
  const { deckId } = useParams()
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId || '' })

  return (
    <Card className={s.card}>
      <Typography className={s.heading} variant={'large'}>
        Learn {deckData?.name}
      </Typography>
    </Card>
  )
}
