import { useMemo, useState } from 'react'

import { Meta } from '@storybook/react'

import {
  Column,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeadCell,
  TableHeader,
  TableRow,
} from './'

import { Typography } from '@/components'

export default {
  title: 'Components/Table',
  component: Table,
} as Meta<typeof Table>

export const Default = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableHeadCell>Название</TableHeadCell>
            <TableHeadCell align="center">Описание</TableHeadCell>
            <TableHeadCell>Ссылка</TableHeadCell>
            <TableHeadCell>Тип</TableHeadCell>
            <TableHeadCell>Вид</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Web Basic</TableCell>
            <TableCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut sed do eiusmod tempoei usmodr sit amet, consectetur adipiscing elit, sed
              do...
            </TableCell>
            <TableCell>
              <Typography
                as={'a'}
                variant={'link1'}
                href="https://it-incubator.io/"
                target="_blank"
              >
                Какая-то ссылка кудато на какой-то источник с информациейо ссылка кудато на какой-то
                источник
              </Typography>
            </TableCell>
            <TableCell>Основной</TableCell>
            <TableCell>Читать</TableCell>
            <TableCell>🦎</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Web Basic</TableCell>
            <TableCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut sed do eiusmod tempoei usmodr sit amet, consectetur adipiscing elit, sed
              do...
            </TableCell>
            <TableCell>
              Какая-то ссылка кудато на какой-то источник с информациейо ссылка кудато на какой-то
              источник
            </TableCell>
            <TableCell>Основной</TableCell>
            <TableCell>Читать</TableCell>
            <TableCell>✨</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
}

const data = [
  {
    id: '01',
    title: 'Web Basic',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    link: 'Какая-то ссылка кудато на какой-то источник с информациейо ссылка кудато на какой-то',
    category: 'Основной',
    type: 'Читать',
  },
  {
    id: '02',
    title: 'Web Basic',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    link: 'Какая-то ссылка куда-то',
    category: 'Основной',
    type: 'Читать',
  },
  {
    id: '03',
    title: 'Web Basic',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    link: 'Какая-то ссылка кудато на какой-то источник с информациейо ссылка кудато на какой-то. Какая-то ссылка кудато на какой-то источник с информациейо ссылка куда-то на какой-то',
    category: 'Основной',
    type: 'Читать',
  },
]

export const WithMapMethod = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableHeadCell>Название</TableHeadCell>
            <TableHeadCell align="center">Описание</TableHeadCell>
            <TableHeadCell>Ссылка</TableHeadCell>
            <TableHeadCell>Тип</TableHeadCell>
            <TableHeadCell>Вид</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.link}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
}
const data2 = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]

export const WithSort = {
  render: () => {
    const [sort, setSort] = useState<Sort>(null)
    const sortedString = useMemo(() => {
      if (!sort) return null

      return `${sort.key}-${sort.direction}`
    }, [sort])

    return (
      <table>
        <TableHeader columns={columns} sort={sort} onSort={setSort} />
        <tbody>
          {data2.map(item => (
            <tr key={item.title}>
              <td>{item.title}</td>
              <td>{item.cardsCount}</td>
              <td>{item.updated}</td>
              <td>{item.createdBy}</td>
              <td>icons...</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
}
export const Empty = {
  render: () => <TableEmpty />,
}
