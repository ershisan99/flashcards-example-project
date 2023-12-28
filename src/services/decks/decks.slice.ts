import { Tab } from '@/services'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  initialState: {
    currentPage: 1,
    currentTab: 'all' as Tab,
    maxCards: undefined as number | undefined,
    minCards: 0,
    perPage: 10,
    search: '',
  },
  name: 'decks',
  reducers: {
    resetCurrentPage: state => {
      state.currentPage = 1
    },
    resetFilters: state => {
      state.search = ''
      state.currentTab = 'all'
      state.minCards = 0
      state.maxCards = undefined
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setCurrentTab: (state, action: PayloadAction<Tab>) => {
      state.currentTab = action.payload
    },
    setMaxCards: (state, action: PayloadAction<number>) => {
      state.maxCards = action.payload
    },
    setMinCards: (state, action: PayloadAction<number>) => {
      state.minCards = action.payload
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})
