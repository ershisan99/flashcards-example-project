import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tab } from '@/services'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
    perPage: 10,
    search: '',
    minCards: 0,
    maxCards: undefined as number | undefined,
    currentTab: 'all' as Tab,
  },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setCurrentTab: (state, action: PayloadAction<Tab>) => {
      state.currentTab = action.payload
    },
    setMinCards: (state, action: PayloadAction<number>) => {
      state.minCards = action.payload
    },
    setMaxCards: (state, action: PayloadAction<number>) => {
      state.maxCards = action.payload
    },
    resetFilters: state => {
      state.search = ''
      state.currentTab = 'all'
      state.minCards = 0
      state.maxCards = undefined
    },
    resetCurrentPage: state => {
      state.currentPage = 1
    },
  },
})
