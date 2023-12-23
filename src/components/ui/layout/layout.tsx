import { ComponentPropsWithoutRef, CSSProperties, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './layout.module.scss'

import { Header } from '@/components/ui/header'

type Props = ComponentPropsWithoutRef<'div'> & {
  contentMarginTop?: CSSProperties['marginTop']
}
export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Header />
        <main className={s.main}>{children}</main>
      </div>
    )
  }
)
