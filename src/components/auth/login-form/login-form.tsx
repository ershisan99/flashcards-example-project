import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, TextField } from '@/components'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .nonempty('Password is required')
    .min(3, 'Password must be at least 3 characters'),
  rememberMe: z.boolean().default(false),
})

export type LoginFormSchema = z.infer<typeof loginSchema>
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  const onSubmit = (data: LoginFormSchema) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*rhf dev tool*/}
      <DevTool control={control} />
      {/*rhf dev tool*/}

      <TextField {...register('email')} label={'email'} errorMessage={errors.email?.message} />
      <TextField
        {...register('password')}
        label={'password'}
        errorMessage={errors.password?.message}
      />

      <ControlledCheckbox control={control} label={'remember me'} name={'rememberMe'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
