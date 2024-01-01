import { useState } from 'react'

import { Button } from '@/components'
import { Meta, StoryObj } from '@storybook/react'

import { DeleteDeckDialog } from './'

const meta = {
  component: DeleteDeckDialog,
  tags: ['autodocs'],
  title: 'Decks/Delete Deck Dialog',
} satisfies Meta<typeof DeleteDeckDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    deckName: 'Deck Name',
    onOpenChange: () => {},
    open: true,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <DeleteDeckDialog
          {...args}
          onCancel={closeModal}
          onConfirm={closeModal}
          onOpenChange={setOpen}
          open={open}
        />
      </>
    )
  },
}
