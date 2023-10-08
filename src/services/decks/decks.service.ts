import { baseApi } from '../base-api'

import type { CreateDeckArgs, Deck, DecksResponse, DeleteDeckArgs } from './decks.types.ts'
import { GetDecksParams } from './decks.types.ts'

import { RootState } from '@/services/store.ts'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksParams | void>({
        query: params => {
          return {
            url: `v1/decks`,
            params: params ?? {},
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: body => ({
          url: `v1/decks`,
          method: 'POST',
          body,
        }),
        onQueryStarted: async (_, { getState, queryFulfilled, dispatch }) => {
          const state = getState() as RootState
          const { searchByName, currentPage } = state.decks

          try {
            const result = await queryFulfilled

            dispatch(
              DecksService.util.updateQueryData(
                'getDecks',
                { currentPage, name: searchByName },
                draft => {
                  draft?.items?.unshift(result.data)
                }
              )
            )
          } catch (e) {
            console.error(e)
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),

        onQueryStarted: async ({ id }, { getState, queryFulfilled, dispatch }) => {
          const state = getState() as RootState
          const { searchByName, currentPage } = state.decks

          const patchResult = dispatch(
            DecksService.util.updateQueryData(
              'getDecks',
              { currentPage, name: searchByName },
              draft => {
                draft?.items?.splice(draft?.items?.findIndex(deck => deck.id === id), 1)
              }
            )
          )

          try {
            await queryFulfilled
          } catch (e) {
            patchResult.undo()
          }
        },

        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation, useDeleteDeckMutation } = DecksService
