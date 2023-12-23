import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './index.ts'

import { BrowserRouterDecorator } from '@/app/providers'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [BrowserRouterDecorator],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const AuthorizedUser: Story = {
  args: {
    data: {
      name: 'User name',
      email: 'user-email.gmail.com',
      avatar: '',
    },
    logout: () => {},
  },
}

export const UnauthorizedUser: Story = {
  args: {
    data: null,
    logout: () => {},
  },
}
