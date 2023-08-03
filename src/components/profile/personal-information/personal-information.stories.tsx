import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from './'

const meta = {
  title: 'Profile/Personal information',
  component: PersonalInformation,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'your_email@domain.com',
    avatar: 'https://picsum.photos/200',
    name: 'John Doe',
    onAvatarChange: () => {
      console.info('avatar changed')
    },
    onNameChange: () => {
      console.info('name changed')
    },
    onLogout: () => {
      console.info('logout')
    },
  },
}
