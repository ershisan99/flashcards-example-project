import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, ControlledCheckbox, ControlledTextField, Dialog, DialogProps } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deck-dialog.module.scss'

const newDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(5000),
})

type FormValues = z.infer<typeof newDeckSchema>

type Props = Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'> & {
  defaultValues?: FormValues & { cover?: null | string }
  onConfirm: (data: FormValues & { cover?: File | null }) => void
}
export const DeckDialog = ({
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...dialogProps
}: Props) => {
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState<null | string>('')

  useEffect(() => {
    if (defaultValues?.cover) {
      setPreview(defaultValues?.cover)
    }
  }, [defaultValues?.cover])

  useEffect(() => {
    if (cover) {
      const newPreview = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
  }, [cover])

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })
  const onSubmit = handleSubmit(data => {
    onConfirm({ ...data, cover })
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
        {preview && <img alt={'Deck cover'} src={preview.toString()} />}
        <input
          accept={'image/*'}
          onChange={e => setCover(e.target.files?.[0] ?? null)}
          type={'file'}
        />
        {cover && (
          <Button
            onClick={() => {
              setCover(null)
              setPreview(null)
            }}
            type={'button'}
          >
            Remove cover
          </Button>
        )}
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
