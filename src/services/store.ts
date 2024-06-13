import { decksSlice } from '@/services/decks/decks.slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { flashcardsApi } from './flashcardsApi'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashcardsApi.middleware),
  reducer: {
    [decksSlice.name]: decksSlice.reducer,
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
