import type { Meta, StoryObj } from '@storybook/react'

import { RecoverPassword } from './'

const meta = {
  component: RecoverPassword,
  tags: ['autodocs'],
  title: 'Auth/Recover password',
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: data => console.info(data),
  },
}
