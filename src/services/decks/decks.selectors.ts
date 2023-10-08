import { RootState } from '@/services/store.ts'

export const selectDecksCurrentPage = (state: RootState) => state.decks.currentPage

export const selectDecksPerPage = (state: RootState) => state.decks.perPage

export const selectDecksSearch = (state: RootState) => state.decks.search

export const selectDecksAuthorId = (state: RootState) => state.decks.authorId

export const selectDecksMinCards = (state: RootState) => state.decks.minCards

export const selectDecksMaxCards = (state: RootState) => state.decks.maxCards
