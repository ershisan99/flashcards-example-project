import * as React from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

import { Typography } from '@/components'

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
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item ref={ref} className={clsx(s.option, className)} {...props}>
      <div className={s.icon}></div>
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

type Option = {
  label: string
  value: string
}
export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'children'
> & {
  options: Option[]
  errorMessage?: string
}
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>((props, ref) => {
  const { options, errorMessage, ...restProps } = props

  return (
    <RadioGroupRoot {...restProps} ref={ref}>
      {options.map(option => (
        <div className={s.label} key={option.value}>
          <RadioGroupItem value={option.value} id={option.value} />
          <Typography variant={'body2'} as={'label'} htmlFor={option.value}>
            {option.label}
          </Typography>
        </div>
      ))}
    </RadioGroupRoot>
  )
})

export { RadioGroupRoot, RadioGroupItem, RadioGroup }
