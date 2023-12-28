import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect } from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'
const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  Omit<ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'value'> & {
    value?: (number | undefined)[]
  }
>(({ className, max, onValueChange, value, ...props }, ref) => {
  useEffect(() => {
    if (value?.[1] === undefined || value?.[1] === null) {
      onValueChange?.([value?.[0] ?? 0, max ?? 0])
    }
  }, [max, value, onValueChange])

  return (
    <div className={s.container}>
      <span>{value?.[0]}</span>
      <SliderPrimitive.Root
        className={clsx(s.root, className)}
        max={max}
        onValueChange={onValueChange}
        ref={ref}
        {...props}
        value={[value?.[0] ?? 0, value?.[1] ?? max ?? 0]}
      >
        <SliderPrimitive.Track className={s.track}>
          <SliderPrimitive.Range className={'absolute h-full bg-primary'} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={s.thumb} />
        <SliderPrimitive.Thumb className={s.thumb} />
      </SliderPrimitive.Root>
      <span>{value?.[1]}</span>
    </div>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
