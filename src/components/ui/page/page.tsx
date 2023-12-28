import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './page.module.scss'

export type PageProps = ComponentPropsWithoutRef<'div'>

export const Page = forwardRef<HTMLDivElement, PageProps>(({ className, ...props }, ref) => {
  const classNames = {
    root: clsx(s.root, className),
  }

  return <div {...props} className={classNames.root} ref={ref} />
})
