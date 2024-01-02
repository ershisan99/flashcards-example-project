import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { Logout, PersonOutline } from '@/assets'
import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography,
} from '@/components'

import s from './user-dropdown.module.scss'

export type UserDropdownProps = {
  avatar: null | string
  email: string
  onLogout: ComponentPropsWithoutRef<typeof DropdownMenuItem>['onSelect']
  userName: string
}

export const UserDropdown = ({ avatar, email, onLogout, userName }: UserDropdownProps) => {
  if (!avatar) {
    avatar = `https://ui-avatars.com/api/?name=${userName.split(' ').join('+')}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={s.trigger}>
          <Typography className={s.name} variant={'subtitle1'}>
            {userName}
          </Typography>
          <Avatar src={avatar} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Avatar src={avatar} />
          <div>
            <Typography variant={'subtitle2'}>{userName}</Typography>
            <Typography className={s.email} variant={'caption'}>
              {email}
            </Typography>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={'/profile'}>
            <PersonOutline />
            My profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onLogout}>
          <Logout />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
