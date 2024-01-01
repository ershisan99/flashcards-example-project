import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  component: Slider,
  parameters: {},
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: [0, 100] },
}
