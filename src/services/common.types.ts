export type Pagination = {
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
}

export type PaginatedResponse<T> = {
  items: T
  pagination: Pagination
}
