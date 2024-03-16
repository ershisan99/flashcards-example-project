import type { Meta, StoryObj } from '@storybook/react'

import { DecksTable } from './'

const meta = {
  component: DecksTable,
  tags: ['autodocs'],
  title: 'Components/Decks/Table',
} satisfies Meta<typeof DecksTable>

export default meta
type Story = StoryObj<typeof meta>

const mockDecks = [
  {
    cards: 50,
    createdBy: 'Anthony Johnson',
    id: 'fddb846b-f674-4507-a0c8-a8a9ef68c9b6',
    lastUpdated: '2023-09-04T22:35:07',
    name: 'Court',
  },
  {
    cards: 35,
    createdBy: 'Mark Brown',
    id: '2d8324af-3516-47d5-8f42-8ad7a68fd9c2',
    lastUpdated: '2023-08-19T22:45:58',
    name: 'Personal',
  },
  {
    cards: 43,
    createdBy: 'Teresa Ward',
    id: '0110bf6d-305a-453a-90fa-3af94cd910ce',
    lastUpdated: '2023-09-24T01:49:08',
    name: 'Begin',
  },
  {
    cards: 7,
    createdBy: 'Julian Mcbride',
    id: '2e7153b1-29be-488c-9083-6fa363761b4d',
    lastUpdated: '2023-07-11T13:10:15',
    name: 'Sure',
  },
  {
    cards: 2,
    createdBy: 'Carl Johnson',
    id: '369236a3-8230-4fa4-b1af-5ffec321e3e6',
    lastUpdated: '2023-04-02T05:21:35',
    name: 'Sign',
  },
]

export const Default: Story = {
  args: {
    decks: mockDecks,
  },
}
