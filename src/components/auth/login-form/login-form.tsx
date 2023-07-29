import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { LoginFormData, loginSchema } from './login-form.schema'

import { Button, TextField, ControlledCheckbox } from '@/components'

type Props = {
  onSubmit: (data: LoginFormData) => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <TextField {...register('email')} label={'email'} errorMessage={errors.email?.message} />
      <TextField
        {...register('password')}
        label={'password'}
        errorMessage={errors.password?.message}
      />
      <ControlledCheckbox label={'remember me'} control={control} name={'rememberMe'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
