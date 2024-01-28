import { getValuable } from '@/utils'

import {
  CardsResponse,
  CreateDeckArgs,
  DeckResponse,
  DecksResponse,
  GetDecksArgs,
  UpdateDeckArgs,
  baseApi,
} from '../'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createDeck: builder.mutation<DeckResponse, CreateDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const res = await queryFulfilled

        for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
          getState(),
          [{ type: 'Decks' }]
        )) {
          // we only want to update `getPosts` here
          if (endpointName !== 'getDecks') {
            continue
          }
          dispatch(
            decksService.util.updateQueryData(endpointName, originalArgs, draft => {
              draft.items.unshift(res.data)
            })
          )
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),
    deleteDeck: builder.mutation<void, { id: string }>({
      invalidatesTags: ['Decks'],
      async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
        let patchResult: any

        for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
          getState(),
          [{ type: 'Decks' }]
        )) {
          console.log(endpointName, originalArgs)
          // we only want to update `getPosts` here
          if (endpointName !== 'getDecks') {
            continue
          }
          patchResult = dispatch(
            decksService.util.updateQueryData(endpointName, originalArgs, draft => {
              const index = draft?.items?.findIndex(deck => deck.id === id)

              if (index !== undefined && index !== -1) {
                draft?.items?.splice(index, 1)
              }
            })
          )
        }

        try {
          await queryFulfilled
        } catch {
          patchResult?.undo()
        }
      },
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
      async onQueryStarted({ id, ...data }, { dispatch, getState, queryFulfilled }) {
        let patchResult: any

        for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
          getState(),
          [{ type: 'Decks' }]
        )) {
          if (endpointName !== 'getDecks') {
            continue
          }
          patchResult = dispatch(
            decksService.util.updateQueryData(endpointName, originalArgs, draft => {
              const index = draft?.items?.findIndex(deck => deck.id === id)

              if (!index || index === -1) {
                return
              }
              Object.assign(draft?.items?.[index], data)
            })
          )
        }

        try {
          await queryFulfilled
        } catch (e) {
          patchResult?.undo()
        }
      },
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
