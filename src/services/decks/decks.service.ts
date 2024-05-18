import {
  CardsResponse,
  CreateDeckArgs,
  DeckMinMaxCardsResponse,
  DeckResponse,
  DecksResponse,
  GetDecksArgs,
  UpdateDeckArgs,
  flashcardsApi,
} from '@/services'
import { getValuable } from '@/utils'

const decksService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createDeck: builder.mutation<DeckResponse, CreateDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [{ type: 'Decks' }])

        try {
          const { data } = await queryFulfilled

          invalidateBy.forEach(({ originalArgs }) => {
            dispatch(
              decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                if (originalArgs.currentPage !== 1) {
                  return
                }
                draft.items.unshift(data)
                draft.items.pop()
              })
            )
          })
        } catch (e) {
          console.log(e)
        }
      },
      query: ({ cover, isPrivate, name }) => {
        const formData = new FormData()

        formData.append('name', name)

        if (isPrivate) {
          formData.append('isPrivate', isPrivate + '')
        }
        if (cover) {
          formData.append('cover', cover)
        } else if (cover === null) {
          formData.append('cover', '')
        }

        return {
          body: formData,
          method: 'POST',
          url: `v1/decks`,
        }
      },
    }),
    deleteDeck: builder.mutation<void, { id: string }>({
      invalidatesTags: ['Decks'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `v1/decks/${id}`,
      }),
    }),
    getDeckById: builder.query<DeckResponse, { id: string }>({
      providesTags: ['Decks'],
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
          url: 'v2/decks',
        }
      },
    }),
    getMinMaxCards: builder.query<DeckMinMaxCardsResponse, void>({
      query: () => `v2/decks/min-max-cards`,
    }),
    updateDeck: builder.mutation<DeckResponse, UpdateDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
        const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [{ type: 'Decks' }])
        const patchResults: any[] = []

        invalidateBy.forEach(({ originalArgs }) => {
          patchResults.push(
            dispatch(
              decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                if (itemToUpdateIndex === -1) {
                  return
                }

                Object.assign(draft.items[itemToUpdateIndex], args)
              })
            )
          )
        })

        try {
          await queryFulfilled
        } catch (e) {
          patchResults.forEach(patchResult => {
            patchResult.undo()
          })
        }
      },
      query: ({ cover, id, isPrivate, name }) => {
        const formData = new FormData()

        if (name) {
          formData.append('name', name)
        }
        if (isPrivate) {
          formData.append('isPrivate', isPrivate.toString())
        }
        if (cover) {
          formData.append('cover', cover)
        } else if (cover === null) {
          formData.append('cover', '')
        }

        return {
          body: formData,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }
      },
    }),
  }),
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useLazyGetDecksQuery,
  useUpdateDeckMutation,
} = decksService
