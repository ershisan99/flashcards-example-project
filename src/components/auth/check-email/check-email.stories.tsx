import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './'

const meta = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Auth/Check email',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'your_email@domain.com',
  },
}
