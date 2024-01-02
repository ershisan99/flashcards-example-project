import { RootState } from '@/services/store'

export const selectDecksCurrentPage = (state: RootState) => state.decks.currentPage

export const selectDecksPerPage = (state: RootState) => state.decks.perPage

export const selectDecksSearch = (state: RootState) => state.decks.search

export const selectDecksCurrentTab = (state: RootState) => state.decks.currentTab

export const selectDecksMinCards = (state: RootState) => state.decks.minCards

export const selectDecksMaxCards = (state: RootState) => state.decks.maxCards
