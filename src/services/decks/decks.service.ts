import { CreateDeckArgs, Deck, DeckResponse, DeleteDeckArgs, GetDecksArgs } from './decks.types.ts'

import { baseApi } from '@/services/base-api.ts'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DeckResponse, GetDecksArgs | void>({
        query: args => ({
          url: `v2/decks`,
          params: args ?? undefined,
        }),
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: args => ({
          url: 'v1/decks',
          body: args,
          method: 'POST',
        }),
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        query: args => ({
          url: `v1/decks/${args.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})
export const { useGetDecksQuery, useCreateDeckMutation, useDeleteDeckMutation } = DecksService
