import { Tab } from '@/services'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  initialState: {
    authorId: undefined as string | undefined,
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
      state.authorId = undefined
      state.minCards = 0
      state.maxCards = undefined
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setCurrentTab: (state, action: PayloadAction<{ authorId?: string; tab: Tab }>) => {
      state.currentTab = action.payload.tab
      state.authorId = action.payload.authorId
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
