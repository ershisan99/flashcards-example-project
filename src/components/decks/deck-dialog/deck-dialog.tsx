import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './deck-dialog.module.scss'

import { ControlledCheckbox, ControlledTextField, Dialog, DialogProps } from '@/components'

const newDeckSchema = z.object({
  name: z.string().min(3).max(50),
  isPrivate: z.boolean(),
})

type FormValues = z.infer<typeof newDeckSchema>

type Props = Pick<DialogProps, 'onOpenChange' | 'open' | 'onCancel'> & {
  onConfirm: (data: FormValues) => void
  defaultValues?: FormValues
}
export const DeckDialog = ({
  onConfirm,
  onCancel,
  defaultValues = { isPrivate: false, name: '' },
  ...dialogProps
}: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(newDeckSchema),
    defaultValues,
  })
  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    reset()
  })
  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <Dialog {...dialogProps} title={'Create new deck'} onConfirm={onSubmit} onCancel={handleCancel}>
      <form className={s.content} onSubmit={onSubmit}>
        <ControlledTextField name={'name'} control={control} label={'Deck name'} />
        <ControlledCheckbox
          name={'isPrivate'}
          control={control}
          label={'Private'}
          position={'left'}
        />
      </form>
    </Dialog>
  )
}
