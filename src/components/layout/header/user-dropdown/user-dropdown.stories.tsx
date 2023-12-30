import type { Meta, StoryObj } from '@storybook/react'

import { UserDropdown } from './'

const meta = {
  argTypes: {
    onLogout: { action: 'logout' },
  },
  component: UserDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/UserDropdown',
} satisfies Meta<typeof UserDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-expect-error onLogout is required but it is provided through argTypes
  args: {
    avatar: 'https://avatars.githubusercontent.com/u/1196870?v=4',
    email: 'johndoe@gmail.com',
    userName: 'John Doe',
  },
}
