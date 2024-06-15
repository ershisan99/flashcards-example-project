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
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const cachedArgsForQuery = decksService.util.selectCachedArgsForQuery(
          getState(),
          'getDecks'
        ) as GetDecksArgs[]

        try {
          const { data } = await queryFulfilled

          cachedArgsForQuery.forEach(cachedArgs => {
            dispatch(
              decksService.util.updateQueryData('getDecks', cachedArgs, draft => {
                if (cachedArgs.currentPage !== 1) {
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
      query: body => {
        const { cover, isPrivate, name } = body

        const formData = new FormData()

        formData.append('name', name)

        if (isPrivate) {
          formData.append('isPrivate', isPrivate.toString())
        }
        if (cover) {
          formData.append('cover', cover)
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
      async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
        // 1
        const cachedArgsForQuery = decksService.util.selectCachedArgsForQuery(
          getState(),
          'getDecks'
        )
        const patchResults: any[] = []

        cachedArgsForQuery.forEach(cachedArgs => {
          patchResults.push(
            dispatch(
              decksService.util.updateQueryData('getDecks', cachedArgs, draft => {
                const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                if (itemToUpdateIndex === -1) {
                  return
                }

                draft.items[itemToUpdateIndex] = { ...draft.items[itemToUpdateIndex], ...args }
              })
            )
          )
        })

        try {
          //2 - запускает query
          await queryFulfilled
        } catch (e) {
          patchResults.forEach(patchResult => {
            // в случае ошибки вернет предыдущее значение
            patchResult.undo()
          })
        }
      },
      query: ({ cover, id, isPrivate, name }) => {
        // 3
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
          // небходимо для зануления картинки
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
  useUpdateDeckMutation,
} = decksService
