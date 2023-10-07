export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type DecksResponse = {
  maxCardsCount: number
  pagination: Pagination
  items: Deck[]
}

export type DeckResponse = Deck

export type CardsResponse = {
  pagination: Pagination
  items: Card[]
}

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: string | null
  answerImg?: string | null
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}
