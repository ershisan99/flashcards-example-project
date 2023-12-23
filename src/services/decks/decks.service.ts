import { baseApi } from '@/services/base-api.ts'
import {
  CreateDeckArgs,
  Deck,
  GetDecksArgs,
  GetDecksResponse,
} from '@/services/decks/decks.types.ts'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        query: params => {
          return {
            url: 'v1/decks',
            params: params ?? {},
          }
        },
        providesTags: ['Decks'],
      }),
      getDeckById: builder.query<Deck, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
          }
        },
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: args => ({
          url: 'v1/decks',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useGetDeckByIdQuery, useCreateDeckMutation } = decksService
