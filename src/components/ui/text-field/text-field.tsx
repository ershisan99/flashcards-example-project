import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './text-field.module.scss'

import { VisibilityOff, Eye, Search } from '@/assets'
import { Typography } from '@/components'

export type TextFieldProps = {
  onValueChange?: (value: string) => void
  containerProps?: ComponentProps<'div'>
  labelProps?: ComponentProps<'label'>
  errorMessage?: string
  label?: string
  search?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      errorMessage,
      placeholder,
      type,
      containerProps,
      labelProps,
      label,
      onChange,
      onValueChange,
      search,
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
      root: clsx(s.root, containerProps?.className),
      fieldContainer: clsx(s.fieldContainer),
      field: clsx(s.field, !!errorMessage && s.error, search && s.hasLeadingIcon, className),
      label: clsx(s.label, labelProps?.className),
      error: clsx(s.error),
      leadingIcon: s.leadingIcon,
    }

    return (
      <div className={classNames.root}>
        {label && (
          <Typography variant="body2" as="label" className={classNames.label}>
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          {search && <Search className={classNames.leadingIcon} />}
          <input
            className={classNames.field}
            placeholder={placeholder}
            ref={ref}
            type={finalType}
            onChange={handleChange}
            {...restProps}
          />
          {isShowPasswordButtonShown && (
            <button
              className={s.showPassword}
              type={'button'}
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <VisibilityOff /> : <Eye />}
            </button>
          )}
        </div>

        <Typography variant="error" className={classNames.error}>
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
