import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Auth/Sign up',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: data => console.info(data),
  },
}
