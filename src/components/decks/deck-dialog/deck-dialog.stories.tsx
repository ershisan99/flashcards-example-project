import { useState } from 'react'

import { Button } from '@/components'
import { Meta, StoryObj } from '@storybook/react'

import { DeckDialog } from './'

const meta = {
  component: DeckDialog,
  tags: ['autodocs'],
  title: 'Decks/Deck Dialog',
} satisfies Meta<typeof DeckDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onOpenChange: () => {},
    open: true,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <DeckDialog
          {...args}
          onCancel={closeModal}
          onConfirm={data => {
            console.log(data)
            closeModal()
          }}
          onOpenChange={setOpen}
          open={open}
        />
      </>
    )
  },
}

export const WithDefaultValues: Story = {
  args: {
    onOpenChange: () => {},
    open: true,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <DeckDialog
          {...args}
          defaultValues={{
            isPrivate: true,
            name: 'some name',
          }}
          onCancel={closeModal}
          onConfirm={data => {
            console.log(data)
            closeModal()
          }}
          onOpenChange={setOpen}
          open={open}
        />
      </>
    )
  },
}
