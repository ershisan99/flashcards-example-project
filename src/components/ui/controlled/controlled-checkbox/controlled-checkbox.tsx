import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '../../'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<CheckboxProps, 'id' | 'onChange' | 'value'>

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <Checkbox
      {...{
        checked: value,
        id: name,
        onChange,
        ...checkboxProps,
      }}
    />
  )
}
