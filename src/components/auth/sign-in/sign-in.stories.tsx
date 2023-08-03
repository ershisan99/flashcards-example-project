import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './'

const meta = {
  title: 'Auth/Sign in',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: data => console.info(data),
  },
}
