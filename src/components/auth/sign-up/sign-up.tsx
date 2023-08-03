import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './sign-up.module.scss'

const schema = z
  .object({
    email: z.string().email('Invalid email address').nonempty('Enter email'),
    password: z.string().nonempty('Enter password'),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        message: 'Passwords do not match',
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: Omit<FormType, 'passwordConfirmation'>) => void
}

export const SignUp = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleFormSubmitted = handleSubmit(data =>
    props.onSubmit(omit(data, ['passwordConfirmation']))
  )

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="large" className={s.title}>
          Sign Up
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <ControlledTextField
              label={'Email'}
              placeholder={'Email'}
              name={'email'}
              control={control}
            />
            <ControlledTextField
              placeholder={'Password'}
              label={'Password'}
              type={'password'}
              name={'password'}
              control={control}
            />
            <ControlledTextField
              placeholder={'Confirm password'}
              label={'Confirm password'}
              type={'password'}
              name={'passwordConfirmation'}
              control={control}
            />
          </div>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Typography variant="body2" className={s.caption}>
          Already have an account?
        </Typography>
        <Typography variant="link1" as={Link} to="/sign-in" className={s.signInLink}>
          Sign In
        </Typography>
      </Card>
    </>
  )
}
