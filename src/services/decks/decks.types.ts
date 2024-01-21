import { PaginatedResponse } from '@/services/common.types.ts'

export type DeckResponse = PaginatedResponse<Deck[]>

export type Deck = {
  author: DeckAuthor
  id: string
  userId: string
  name: string
  isPrivate: boolean
  cover: string
  created: string
  updated: string
  cardsCount: number
}

export type DeckAuthor = {
  id: string
  name: string
}

export type GetDecksArgs = {
  orderBy?: string | null
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
}

export type CreateDeckArgs = {
  name: string
  cover?: File | null
  isPrivate?: boolean
}

export type DeleteDeckArgs = {
  id: string
}
