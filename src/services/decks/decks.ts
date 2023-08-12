import { baseApi } from '@/services/base-api.ts'
import {
  CreateDeckArgs,
  Deck,
  DecksResponse,
  DeleteDeckArgs,
  GetDecksArgs,
} from '@/services/decks/types.ts'
import { RootState } from '@/services/store.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: data => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: data,
          }
        },
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState

          const { searchByName, orderBy, currentPage, itemsPerPage } = state.decksSlice

          try {
            const res = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                { name: searchByName, orderBy, currentPage, itemsPerPage },
                draft => {
                  draft.items.pop()
                  draft.items.unshift(res.data)
                }
              )
            )
          } catch {
            // patchResult.undo()
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState

          const { searchByName, orderBy, currentPage, itemsPerPage } = state.decksSlice

          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              { name: searchByName, orderBy, currentPage, itemsPerPage },
              draft => {
                draft.items = draft.items.filter(deck => deck.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation, useDeleteDeckMutation } = decksApi
