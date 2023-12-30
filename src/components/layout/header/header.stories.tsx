import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './'

const meta = {
  argTypes: {
    onLogout: { action: 'logout' },
  },
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  // @ts-expect-error onLogout is required but it is provided through argTypes
  args: {
    avatar: 'https://avatars.githubusercontent.com/u/1196870?v=4',
    email: 'johndoe@gmail.com',
    isLoggedIn: true,
    userName: 'John Doe',
  },
}

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
}
