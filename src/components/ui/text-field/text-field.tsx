import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  forwardRef,
  memo,
  useCallback,
  useState,
} from 'react'

import { Eye, VisibilityOff } from '@/assets'
import { Typography } from '@/components'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  containerProps?: ComponentProps<'div'>
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

const RawTextField = forwardRef<HTMLInputElement, TextFieldProps>(
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
      type,
      ...restProps
    },
    ref
  ) => {
    const [revealPassword, setRevealPassword] = useState(false)

    const isRevealPasswordButtonShown = type === 'password'

    const finalType = getFinalType(type, revealPassword)

    const classNames = {
      error: clsx(s.error),
      field: clsx(s.field, errorMessage && s.error, className),
      fieldContainer: clsx(s.fieldContainer),
      label: clsx(s.label, labelProps?.className),
      root: clsx(s.root, containerProps?.className),
    }

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        onValueChange?.(e.target.value)
      },
      [onChange, onValueChange]
    )

    const handleShowPasswordClick = useCallback(() => {
      setRevealPassword(prev => !prev)
    }, [])

    return (
      <div className={classNames.root}>
        {label && (
          <Typography as={'label'} className={classNames.label} variant={'body2'}>
            {label}
          </Typography>
        )}

        <div className={classNames.fieldContainer}>
          <input
            className={classNames.field}
            onChange={handleChange}
            placeholder={placeholder}
            ref={ref}
            type={finalType}
            {...restProps}
          />
          {isRevealPasswordButtonShown && (
            <button className={s.showPassword} onClick={handleShowPasswordClick} type={'button'}>
              {revealPassword ? <VisibilityOff /> : <Eye />}
            </button>
          )}
        </div>

        {errorMessage && (
          <Typography className={classNames.error} variant={'error'}>
            {errorMessage}
          </Typography>
        )}
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

export const TextField = memo(RawTextField)

TextField.displayName = 'TextField'
