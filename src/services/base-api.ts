import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/services/base-api-with-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
