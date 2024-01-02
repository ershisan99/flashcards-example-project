import { Typography } from '@/components'
import { Meta } from '@storybook/react'

import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeadCell, TableRow } from './'

export default {
  component: Table,
  title: 'Components/Table',
} as Meta<typeof Table>

export const Default = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableHeadCell>Название</TableHeadCell>
            <TableHeadCell align={'center'}>Описание</TableHeadCell>
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
                href={'https://it-incubator.io/'}
                target={'_blank'}
                variant={'link1'}
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
    category: 'Основной',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    id: '01',
    link: 'Какая-то ссылка кудато на какой-то источник с информациейо ссылка кудато на какой-то',
    title: 'Web Basic',
    type: 'Читать',
  },
  {
    category: 'Основной',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    id: '02',
    link: 'Какая-то ссылка куда-то',
    title: 'Web Basic',
    type: 'Читать',
  },
  {
    category: 'Основной',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    id: '03',
    link: 'Какая-то ссылка кудато на какой-то источник с информациейо ссылка кудато на какой-то. Какая-то ссылка кудато на какой-то источник с информациейо ссылка куда-то на какой-то',
    title: 'Web Basic',
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
            <TableHeadCell align={'center'}>Описание</TableHeadCell>
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

export const Empty = {
  render: () => <TableEmpty />,
}
