import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './avatar.module.scss'

export type AvatarProps = {
  size?: CSSProperties['width']
} & ComponentPropsWithoutRef<'img'>

export const Avatar = ({ className, size = '36px', style, ...rest }: AvatarProps) => {
  return (
    <img
      className={clsx(className, s.avatar)}
      style={{
        ...style,
        height: size,
        width: size,
      }}
      {...rest}
    />
  )
}
