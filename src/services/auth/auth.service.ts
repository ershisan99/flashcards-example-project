import { flashcardsApi } from '..'
import { LoginArgs, LoginResponse, User } from './auth.types'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      async onQueryStarted(
        // 1 параметр: QueryArg - аргументы, которые приходят в query
        _,
        // 2 параметр: MutationLifecycleApi - dispatch, queryFulfilled, getState и пр.
        // queryFulfilled - это промис, возвращаемый RTK Query, который разрешается,
        // когда запрос успешно завершен
        { queryFulfilled }
      ) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
      },
      query: body => {
        return {
          body,
          method: 'POST',
          url: '/v1/auth/login',
        }
      },
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => '/v1/auth/me',
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authService
