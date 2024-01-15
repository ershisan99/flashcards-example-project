import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'disabled' | 'rules' | 'defaultValue'
> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name: rest.name,
    control,
    shouldUnregister,
    disabled: rest.disabled,
  })

  return <Checkbox {...rest} checked={value} onCheckedChange={onChange} onBlur={onBlur} ref={ref} />
}
