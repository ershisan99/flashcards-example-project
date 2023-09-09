import { DecksResponse } from './decks.types'

import { baseApi } from '@/services'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, void>({
      query: () => `v1/decks`,
    }),
  }),
})

export const { useGetDecksQuery } = decksService
