import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
    perPage: 10,
    search: '',
    authorId: '',
    minCards: 0,
    maxCards: null as number | null,
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
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    },
    setMinCards: (state, action: PayloadAction<number>) => {
      state.minCards = action.payload
    },
    setMaxCards: (state, action: PayloadAction<number>) => {
      state.maxCards = action.payload
    },
    resetFilters: state => {
      state.search = ''
      state.authorId = ''
      state.minCards = 0
      state.maxCards = null
    },
    resetCurrentPage: state => {
      state.currentPage = 1
    },
  },
})
