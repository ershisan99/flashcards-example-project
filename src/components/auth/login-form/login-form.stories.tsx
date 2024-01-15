import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from './login-form'

const meta = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
