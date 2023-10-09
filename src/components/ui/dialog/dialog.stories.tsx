import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Dialog } from './'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: 'Modal',
    children: 'Modal',
  },
  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <button onClick={() => setOpen(true)}>Open Modal</button>
        <Dialog {...args} onOpenChange={setOpen} open={open}>
          Dialog content here
        </Dialog>
      </>
    )
  },
}
