import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './new-password.module.scss'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

const schema = z.object({
  password: z.string().min(1, 'Enter password'),
})

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: FormType) => void
}

export const NewPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography className={s.title} variant={'large'}>
          Create new password
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <ControlledTextField
            containerProps={{ className: s.input }}
            control={control}
            name={'password'}
            placeholder={'Password'}
            type={'password'}
          />
          <Typography className={s.instructions} variant={'caption'}>
            Create new password and we will send you further instructions to email
          </Typography>
          <Button fullWidth type={'submit'}>
            Create new password
          </Button>
        </form>
      </Card>
    </>
  )
}
