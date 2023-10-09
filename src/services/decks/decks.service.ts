import { CardsResponse, DeckResponse, DecksResponse, GetDecksArgs } from './decks.types'

import { baseApi } from '@/services'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, GetDecksArgs | void>({
      query: args => {
        return {
          url: `v1/decks`,
          params: args ?? undefined,
        }
      },
    }),
    getDeckById: builder.query<DeckResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}`,
    }),
    getDeckCards: builder.query<CardsResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}/cards`,
    }),
  }),
})

export const { useGetDecksQuery, useGetDeckByIdQuery, useGetDeckCardsQuery } = decksService
