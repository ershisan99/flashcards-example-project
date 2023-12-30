import { ReactNode } from 'react'

import { Header, HeaderProps } from '@/components'

import s from './layout.module.scss'

export type LayoutProps = { children: ReactNode } & HeaderProps

export const Layout = ({ children, ...headerProps }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header {...headerProps} />
      <div className={s.content}>{children}</div>
    </div>
  )
}
