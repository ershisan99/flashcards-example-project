import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { omit } from 'remeda'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

const schema = z
  .object({
    email: z.string().email('Invalid email address').nonempty('Enter email'),
    password: z.string().nonempty('Enter password'),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
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
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(data =>
    props.onSubmit(omit(data, ['passwordConfirmation']))
  )

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography className={s.title} variant={'large'}>
          Sign Up
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <ControlledTextField
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
            />
            <ControlledTextField
              control={control}
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
              type={'password'}
            />
            <ControlledTextField
              control={control}
              label={'Confirm password'}
              name={'passwordConfirmation'}
              placeholder={'Confirm password'}
              type={'password'}
            />
          </div>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Typography className={s.caption} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography as={Link} className={s.signInLink} to={'/sign-in'} variant={'link1'}>
          Sign In
        </Typography>
      </Card>
    </>
  )
}
