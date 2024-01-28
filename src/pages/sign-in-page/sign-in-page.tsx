import { toast } from 'react-toastify'

import { Page, SignIn } from '@/components'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()
  const handleSignIn = async (data: LoginArgs) => {
    try {
      await signIn(data).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Could not sign in')
    }
  }

  return (
    <Page>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
