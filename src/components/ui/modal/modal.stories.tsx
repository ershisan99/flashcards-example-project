import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Modal } from '@/components'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

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
        <Modal {...args} onOpenChange={setOpen} open={open}>
          Modal content here
        </Modal>
      </>
    )
  },
}
