export type PaginatedEntity<T> = {
  pagination: Pagination
  items: T[]
}
export interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type PaginatedRequest<T> = Partial<Pick<Pagination, 'currentPage' | 'itemsPerPage'>> & T
