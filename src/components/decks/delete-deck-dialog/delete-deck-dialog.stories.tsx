import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { DeleteDeckDialog } from './'

import { Button } from '@/components'

const meta = {
  title: 'Decks/Delete Deck Dialog',
  component: DeleteDeckDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof DeleteDeckDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    deckName: 'Deck Name',
    open: true,
    onOpenChange: () => {},
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <DeleteDeckDialog
          {...args}
          onOpenChange={setOpen}
          open={open}
          onCancel={closeModal}
          onConfirm={closeModal}
        />
      </>
    )
  },
}
