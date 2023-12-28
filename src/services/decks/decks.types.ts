export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isBlocked?: boolean | null
  isDeleted: boolean | null
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}

export type DecksResponse = {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export type DeckResponse = Deck

export type CardsResponse = {
  items: Card[]
  pagination: Pagination
}

export type Card = {
  answer: string
  answerImg?: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg?: null | string
  shots: number
  updated: string
  userId: string
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export type CreateDeckArgs = {
  cover?: string
  isPrivate?: boolean
  name: string
}

export type UpdateDeckArgs = Partial<CreateDeckArgs> & { id: Deck['id'] }

export type Tab = 'all' | 'my'
