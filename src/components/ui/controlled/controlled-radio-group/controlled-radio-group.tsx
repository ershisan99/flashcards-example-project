import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui'

export type ControlledRadioGroupProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
} & Omit<RadioGroupProps, 'onChange' | 'value' | 'id'>

export const ControlledRadioGroup = <TFieldValues extends FieldValues>(
  props: ControlledRadioGroupProps<TFieldValues>
) => {
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })

  return (
    <RadioGroup
      {...props}
      {...field}
      onValueChange={onChange}
      errorMessage={error?.message}
      id={props.name}
    />
  )
}
