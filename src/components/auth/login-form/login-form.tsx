import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field.tsx'

const loginSchema = z.object({
  email: z.string().email(''),
  password: z.string().min(3).max(30),
  rememberMe: z.literal(true),
})

type FormValues = z.infer<typeof loginSchema>
export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        control={control}
        name={'email'}
        label={'email'}
        errorMessage={errors.email?.message}
      />
      <ControlledTextField
        control={control}
        name={'password'}
        label={'password'}
        errorMessage={errors.password?.message}
      />
      <ControlledCheckbox
        control={control}
        name={'rememberMe'}
        label="I accept terms and conditions"
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
