import { ChangeEvent, useEffect, useState } from 'react'
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

type Props = {
  defaultValues?: { cover?: null | string } & FormValues
  onConfirm: (data: { cover?: File | null } & FormValues) => void
} & Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'>

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
      // создать ссылку на файл
      const newPreview = URL.createObjectURL(cover)

      // зачищаем старое превью чтобы не хранилось в памяти
      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)

      // зачищаем новое превью чтобы не хранилось в памяти
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

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setCover(file)
    }
  }

  const removeCoverHandler = () => {
    setCover(null)
    setPreview(null)
  }

  return (
    <Dialog {...dialogProps} onCancel={handleCancel} onConfirm={onSubmit} title={'Create new deck'}>
      <form className={s.content} onSubmit={onSubmit}>
        {preview && <img alt={'cover'} src={preview} width={'50px'} />}

        <input accept={'image/*'} onChange={uploadHandler} type={'file'} />

        {preview && (
          <Button onClick={removeCoverHandler} type={'button'}>
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
