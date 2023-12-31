import { ReactNode } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Header, HeaderProps, Spinner } from '@/components'
import { useMeQuery } from '@/services/auth/auth.service'

import s from './layout.module.scss'

type AuthContext = {
  isAuthenticated: boolean
}

export function useAuthContext() {
  return useOutletContext<AuthContext>()
}

export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError && !isLoading

  if (isLoading) {
    return <Spinner fullScreen />
  }

  return (
    <LayoutPrimitive
      avatar={data?.avatar ?? null}
      email={data?.email ?? ''}
      isLoggedIn={isAuthenticated}
      onLogout={() => {}}
      userName={data?.name ?? ''}
    >
      <Outlet context={{ isAuthenticated } satisfies AuthContext} />
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
