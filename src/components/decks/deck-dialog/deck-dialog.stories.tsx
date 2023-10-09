import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { DeckDialog } from './'

import { Button } from '@/components'

const meta = {
  title: 'Decks/Deck Dialog',
  component: DeckDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof DeckDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <DeckDialog
          {...args}
          onOpenChange={setOpen}
          open={open}
          onCancel={closeModal}
          onConfirm={data => {
            console.log(data)
            closeModal()
          }}
        />
      </>
    )
  },
}

export const WithDefaultValues: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
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
            name: 'some name',
            isPrivate: true,
          }}
          onOpenChange={setOpen}
          open={open}
          onCancel={closeModal}
          onConfirm={data => {
            console.log(data)
            closeModal()
          }}
        />
      </>
    )
  },
}
