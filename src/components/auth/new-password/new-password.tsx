import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './new-password.module.scss'

const schema = z.object({
  password: z.string().nonempty('Enter password'),
})

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: FormType) => void
}

export const NewPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="large" className={s.title}>
          Create new password
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <ControlledTextField
            placeholder={'Password'}
            name={'password'}
            control={control}
            type={'password'}
            containerProps={{ className: s.input }}
          />
          <Typography variant="caption" className={s.instructions}>
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
