import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './spinner.module.scss'

export type SpinnerProps = {
  fullScreen?: boolean
  size?: CSSProperties['width']
} & ComponentPropsWithoutRef<'span'>

export const Spinner = forwardRef<ElementRef<'span'>, SpinnerProps>(
  ({ className, fullScreen, size = '48px', style, ...rest }, ref) => {
    const styles = {
      height: size,
      width: size,
      ...style,
    } satisfies CSSProperties

    if (fullScreen) {
      return (
        <div className={s.fullScreenContainer}>
          <span className={clsx(s.loader, className)} ref={ref} style={styles} {...rest} />
        </div>
      )
    }

    return <span className={clsx(s.loader, className)} ref={ref} style={styles} {...rest} />
  }
)
