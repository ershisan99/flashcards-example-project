import { useForm } from 'react-hook-form'

import { ControlledCheckbox, ControlledTextField, Dialog, DialogProps } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deck-dialog.module.scss'

const newDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(5000),
})

type FormValues = z.infer<typeof newDeckSchema>

type Props = Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'> & {
  defaultValues?: FormValues
  onConfirm: (data: FormValues) => void
}
export const DeckDialog = ({
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...dialogProps
}: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })
  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    dialogProps.onOpenChange?.(false)
    reset()
  })
  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <Dialog {...dialogProps} onCancel={handleCancel} onConfirm={onSubmit} title={'Create new deck'}>
      <form className={s.content} onSubmit={onSubmit}>
        <ControlledTextField control={control} label={'Deck name'} name={'name'} />
        <ControlledCheckbox
          control={control}
          label={'Private'}
          name={'isPrivate'}
          position={'left'}
        />
      </form>
    </Dialog>
  )
}
