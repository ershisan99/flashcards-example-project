import { ComponentPropsWithoutRef, FC } from 'react'

import { Check } from '@/assets/icons'
import { Typography } from '@/components'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: string
  position?: 'default' | 'left'
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox: FC<CheckboxProps> = ({
  className,
  disabled,
  label,
  position = 'default',
  ...rest
}) => {
  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    container: clsx(s.container, className),
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
    root: s.root,
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <Typography as={'label'} className={classNames.label} variant={'body2'}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root className={classNames.root} disabled={disabled} {...rest}>
              <CheckboxRadix.Indicator className={classNames.indicator}>
                <Check />
              </CheckboxRadix.Indicator>
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </LabelRadix.Root>
    </div>
  )
}
