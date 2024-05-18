import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { decksSlice } from '@/services/decks/decks.slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { flashcardsApi } from './flashcards-api'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashcardsApi.middleware),
  reducer: {
    [decksSlice.name]: decksSlice.reducer,
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
