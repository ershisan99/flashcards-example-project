import { Button, Modal, ModalProps } from '@/components'

import s from './dialog.module.scss'

export type DialogProps = {
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
} & ModalProps
export const Dialog = ({
  cancelText = 'Cancel',
  children,
  confirmText = 'OK',
  onCancel,
  onConfirm,
  ...modalProps
}: DialogProps) => {
  return (
    <Modal {...modalProps}>
      {children}
      <div className={s.buttons}>
        <Button onClick={onCancel} variant={'secondary'}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  )
}
