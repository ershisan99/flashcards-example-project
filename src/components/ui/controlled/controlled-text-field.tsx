import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui/text-field'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'disabled' | 'rules' | 'defaultValue'
> &
  Omit<TextFieldProps, 'value' | 'onChange' | 'onValueChange'>
export const ControlledTextField = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const { field } = useController({
    name: rest.name,
    control,
    shouldUnregister,
    disabled: rest.disabled,
  })

  return <TextField {...rest} {...field} />
}
