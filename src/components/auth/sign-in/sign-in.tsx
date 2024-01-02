import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '../../ui'

const schema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().nonempty('Enter password'),
  rememberMe: z.boolean().optional(),
})

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: FormType) => void
}

export const SignIn = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography className={s.title} variant={'large'}>
          Sign In
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
          </div>
          <ControlledCheckbox
            className={s.checkbox}
            control={control}
            label={'Remember me'}
            name={'rememberMe'}
            position={'left'}
          />
          <Typography
            as={Link}
            className={s.recoverPasswordLink}
            to={'/recover-password'}
            variant={'body2'}
          >
            Forgot Password?
          </Typography>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography className={s.caption} variant={'body2'}>
          {`Don't have an account?`}
        </Typography>
        <Typography as={Link} className={s.signUpLink} to={'/sign-up'} variant={'link1'}>
          Sign Up
        </Typography>
      </Card>
    </>
  )
}
