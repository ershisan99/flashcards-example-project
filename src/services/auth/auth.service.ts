import { LoginArgs } from '@/services/auth/auth.types.ts'
import { baseApi } from '@/services/base-api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<any, void>({
      query: () => '/v1/auth/me',
      providesTags: ['Me'],
    }),
    updateProfile: builder.mutation<any, any>({
      query: body => ({
        url: '/v1/auth/me',
        method: 'PATCH',
        body,
      }),
    }),
    login: builder.mutation<any, LoginArgs>({
      query: body => ({
        url: '/v1/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/v1/auth/logout',
        method: 'POST',
      }),
      // onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
      //   try {
      //     await queryFulfilled
      //     dispatch(
      //       authService.util.updateQueryData('me', undefined, draft => {
      //         return null
      //       })
      //     )
      //   } catch (e) {
      //     console.error(e)
      //   }
      // },
      invalidatesTags: ['Me'],
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useUpdateProfileMutation, useLogoutMutation } =
  authService
