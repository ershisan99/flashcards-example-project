import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Page, SignIn } from '@/components'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()
  const navigate = useNavigate()
  const handleSignIn = async (data: LoginArgs) => {
    try {
      await signIn(data).unwrap()
      navigate('/')
    } catch (error: any) {
      console.log(error)
      toast.error(error?.data?.message ?? 'Could not sign in')
    }
  }

  return (
    <Page>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
