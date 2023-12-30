import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/1196870?v=4',
  },
}
