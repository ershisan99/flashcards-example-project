import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, HeaderProps } from '@/components'
import { useMeQuery } from '@/services/auth/auth.service'

import s from './layout.module.scss'

export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <LayoutPrimitive
      avatar={data?.avatar ?? null}
      email={data?.email ?? ''}
      isLoggedIn={!isError && !!data}
      onLogout={() => {}}
      userName={data?.name ?? ''}
    >
      <Outlet />
    </LayoutPrimitive>
  )
}

export type LayoutPrimitiveProps = { children: ReactNode } & HeaderProps

export const LayoutPrimitive = ({ children, ...headerProps }: LayoutPrimitiveProps) => {
  return (
    <div className={s.layout}>
      <Header {...headerProps} />
      <div className={s.content}>{children}</div>
    </div>
  )
}
