import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const Login = () => {
  const { isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError
  const [logIn] = useLoginMutation()

  if (isLoading) return <div>Loading...</div>

  if (isAuthenticated) return <Navigate to={'/'} replace={true} />

  return <SignIn onSubmit={logIn} />
}
