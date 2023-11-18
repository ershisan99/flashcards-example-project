import { useState } from 'react'

import { Dialog } from './'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
    component: Dialog,
    tags: ['autodocs'],
    title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Modal',
        onOpenChange: () => {},
        open: true,
        title: 'Modal',
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
