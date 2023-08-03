import type { Meta, StoryObj } from '@storybook/react'

import { NewPassword } from './'

const meta = {
  title: 'Auth/New password',
  component: NewPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof NewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: data => console.info(data),
  },
}
