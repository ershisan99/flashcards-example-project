import {
  CardsResponse,
  CreateDeckArgs,
  DeckResponse,
  DecksResponse,
  GetDecksArgs,
  UpdateDeckArgs,
  baseApi,
} from '@/services'
import { RootState } from '@/services/store'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createDeck: builder.mutation<DeckResponse, CreateDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const res = await queryFulfilled

        console.log(decksService.util.selectCachedArgsForQuery(getState(), 'getDecks'))
        for (const { endpointName, originalArgs } of decksService.util.selectInvalidatedBy(
          getState(),
          [{ type: 'Decks' }]
        )) {
          console.log(endpointName, originalArgs)
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

        // console.log(args)
        // const minCardsCount = state.decks.minCards
        // const search = state.decks.search
        // const currentPage = state.decks.currentPage
        // const maxCardsCount = state.decks.maxCards
        // const authorId = state.decks.authorId
        //
        // console.log(res)
        //
        // dispatch(
        //   decksService.util.updateQueryData(
        //     'getDecks',
        //     {
        //       authorId,
        //       currentPage,
        //       maxCardsCount,
        //       minCardsCount,
        //       name: search,
        //     },
        //     draft => {
        //       draft.items.unshift(res.data)
        //     }
        //   )
        // )
      },
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
          params: args ?? undefined,
          url: `v1/decks`,
        }
      },
    }),
    updateDeck: builder.mutation<DeckResponse, UpdateDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted({ id, ...patch }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState

        console.log(state)
        const minCardsCount = state.decks.minCards
        const search = state.decks.search
        const currentPage = state.decks.currentPage
        const maxCardsCount = state.decks.maxCards
        const authorId = state.decks.authorId

        const patchResult = dispatch(
          decksService.util.updateQueryData(
            'getDecks',
            {
              authorId,
              currentPage,
              maxCardsCount,
              minCardsCount,
              name: search,
            },
            draft => {
              const deck = draft.items.find(deck => deck.id === id)

              if (!deck) {
                return
              }
              Object.assign(deck, patch)
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
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
