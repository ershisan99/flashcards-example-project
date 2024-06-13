import {
  CardsResponse,
  CreateDeckArgs,
  DeckResponse,
  DecksResponse,
  GetDecksArgs,
  UpdateDeckArgs,
} from '@/services'
import { getValuable } from '@/utils'

import { flashcardsApi } from '../flashcardsApi'

const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createDeck: builder.mutation<DeckResponse, CreateDeckArgs>({
      invalidatesTags: ['Decks'],
      query: body => ({
        body,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),
    deleteDeck: builder.mutation<void, { id: string }>({
      invalidatesTags: ['Decks'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/decks/${id}`,
      }),
    }),
    getDeckById: builder.query<DeckResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}`,
    }),
    getDeckCards: builder.query<CardsResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}/cards`,
    }),
    getDecks: builder.query<DecksResponse, GetDecksArgs | void>({
      providesTags: ['Decks'],
      query: args => {
        return {
          params: args ? getValuable(args) : undefined,
          url: `v1/decks`,
        }
      },
    }),
    updateDeck: builder.mutation<DeckResponse, UpdateDeckArgs>({
      invalidatesTags: ['Decks'],
      query: ({ id, ...body }) => ({
        body,
        method: 'PATCH',
        url: `v1/decks/${id}`,
      }),
    }),
  }),
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksService
