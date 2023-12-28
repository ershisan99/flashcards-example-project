import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Eye, Search, VisibilityOff } from '@/assets'
import { Typography } from '@/components'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  containerProps?: ComponentProps<'div'>
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  onValueChange?: (value: string) => void
  search?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      containerProps,
      errorMessage,
      label,
      labelProps,
      onChange,
      onValueChange,
      placeholder,
      search,
      type,
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const isShowPasswordButtonShown = type === 'password'

    const finalType = getFinalType(type, showPassword)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const classNames = {
      error: clsx(s.error),
      field: clsx(s.field, !!errorMessage && s.error, search && s.hasLeadingIcon, className),
      fieldContainer: clsx(s.fieldContainer),
      label: clsx(s.label, labelProps?.className),
      leadingIcon: s.leadingIcon,
      root: clsx(s.root, containerProps?.className),
    }

    return (
      <div className={classNames.root}>
        {label && (
          <Typography as={'label'} className={classNames.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          {search && <Search className={classNames.leadingIcon} />}
          <input
            className={classNames.field}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            type={finalType}
            {...restProps}
          />
          {isShowPasswordButtonShown && (
            <button
              className={s.showPassword}
              onClick={() => setShowPassword(prev => !prev)}
              type={'button'}
            >
              {showPassword ? <VisibilityOff /> : <Eye />}
            </button>
          )}
        </div>

        <Typography className={classNames.error} variant={'error'}>
          {errorMessage}
        </Typography>
      </div>
    )
  }
)

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
