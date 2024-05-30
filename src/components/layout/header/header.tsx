import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '@/assets'
import { UserDropdown, UserDropdownProps } from '@/components/layout/header/user-dropdown'

import s from './header.module.scss'

import { Button } from '../../ui'

export type HeaderProps =
  | ({
      isLoggedIn: false
    } & Partial<UserDropdownProps>)
  | ({
      isLoggedIn: true
    } & UserDropdownProps)

export const Header = memo(({ avatar, email, isLoggedIn, onLogout, userName }: HeaderProps) => {
  return (
    <header className={s.root}>
      <div className={s.content}>
        <Link to={'/'}>
          <Logo />
        </Link>
        {isLoggedIn && (
          <UserDropdown avatar={avatar} email={email} onLogout={onLogout} userName={userName} />
        )}
        {!isLoggedIn && (
          <Button as={Link} to={'/sign-in'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
})
