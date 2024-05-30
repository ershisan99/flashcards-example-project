import * as React from 'react'

import { Typography } from '@/components'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={clsx(s.root, className)} {...props} ref={ref} />
})

RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item className={clsx(s.option, className)} ref={ref} {...props}>
      <div className={s.icon}></div>
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

type Option = {
  label: string
  value: string
}
export type RadioGroupProps = {
  errorMessage?: string
  options: Option[]
} & Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'children'>
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>((props, ref) => {
  const { errorMessage, options, ...restProps } = props

  return (
    <RadioGroupRoot {...restProps} ref={ref}>
      {options.map(option => (
        <div className={s.label} key={option.value}>
          <RadioGroupItem id={option.value} value={option.value} />
          <Typography as={'label'} htmlFor={option.value} variant={'body2'}>
            {option.label}
          </Typography>
        </div>
      ))}
    </RadioGroupRoot>
  )
})

export { RadioGroup, RadioGroupItem, RadioGroupRoot }
