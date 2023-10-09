import {
  CardsResponse,
  CreateDeckArgs,
  DeckResponse,
  DecksResponse,
  GetDecksArgs,
  UpdateDeckArgs,
} from './decks.types'

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
      providesTags: ['Decks'],
    }),
    getDeckById: builder.query<DeckResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}`,
    }),
    getDeckCards: builder.query<CardsResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}/cards`,
    }),
    createDeck: builder.mutation<DeckResponse, CreateDeckArgs>({
      query: body => ({
        url: `v1/decks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `v1/decks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<DeckResponse, UpdateDeckArgs>({
      query: ({ id, ...body }) => ({
        url: `v1/decks/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Decks'],
    }),
  }),
})

export const {
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = decksService
