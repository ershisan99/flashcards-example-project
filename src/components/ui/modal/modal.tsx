import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets'
import { Typography } from '@/components'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import s from './modal.module.scss'

export type ModalProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Dialog>, 'onOpenChange' | 'open'>
export const Modal = ({ children, title, ...props }: ModalProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={s.overlay} />
        <DialogPrimitive.Content className={s.content}>
          <div className={s.header}>
            <DialogPrimitive.Title asChild>
              <Typography as={'h2'} variant={'h2'}>
                {title}
              </Typography>
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className={s.closeButton}>
              <Close height={24} width={24} />
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
