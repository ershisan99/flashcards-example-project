import { ComponentPropsWithoutRef, FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

import { Check } from '@/assets/icons'
import { Typography } from '@/components'

export type CheckboxProps = {
  label?: string
  position?: 'left' | 'default'
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox: FC<CheckboxProps> = ({
  position = 'default',
  label,
  className,
  disabled,
  ...rest
}) => {
  const classNames = {
    container: clsx(s.container, className),
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    root: s.root,
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <Typography variant="body2" className={classNames.label} as={'label'}>
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
