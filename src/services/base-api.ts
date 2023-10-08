import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/base-query-with-reauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Users', 'Me'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
