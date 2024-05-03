import type { Meta, StoryObj } from '@storybook/react'

import { Component } from './'

const meta = {
  component: Component,
  tags: ['autodocs'],
  title: 'Components/Component',
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
