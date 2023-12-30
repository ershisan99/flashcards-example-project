import type { Meta, StoryObj } from '@storybook/react'

import { Layout } from './'

const meta = {
  argTypes: {
    onLogout: { action: 'logout' },
  },
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Components/Layout',
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  // @ts-expect-error onLogout is required but it is provided through argTypes
  args: {
    avatar: 'https://avatars.githubusercontent.com/u/1196870?v=4',
    children: 'Hello World',
    email: 'johndoe@gmail.com',
    isLoggedIn: true,
    userName: 'John Doe',
  },
}

export const LoggedOut: Story = {
  args: {
    children: 'Hello World',
    isLoggedIn: false,
  },
}
