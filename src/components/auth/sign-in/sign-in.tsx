import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '../../ui'

import s from './sign-in.module.scss'

export const emailSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
})

const schema = z
  .object({
    password: z.string().nonempty('Enter password'),
    rememberMe: z.boolean().optional(),
  })
  .merge(emailSchema)

type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: FormType) => void
}

export const SignIn = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="large" className={s.title}>
          Sign In
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <ControlledTextField
              placeholder={'Email'}
              label={'Email'}
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
          </div>
          <ControlledCheckbox
            className={s.checkbox}
            label={'Remember me'}
            control={control}
            name={'rememberMe'}
            position={'left'}
          />
          <Typography
            variant="body2"
            as={Link}
            to="/recover-password"
            className={s.recoverPasswordLink}
          >
            Forgot Password?
          </Typography>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography className={s.caption} variant="body2">
          {`Don't have an account?`}
        </Typography>
        <Typography variant="link1" as={Link} to="/sign-up" className={s.signUpLink}>
          Sign Up
        </Typography>
      </Card>
    </>
  )
}
