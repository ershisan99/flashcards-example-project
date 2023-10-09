import s from './dialog.module.scss'

import { Button, Modal, ModalProps } from '@/components'

export type DialogProps = ModalProps & {
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}
export const Dialog = ({
  children,
  onCancel,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  ...modalProps
}: DialogProps) => {
  return (
    <Modal {...modalProps}>
      {children}
      <div className={s.buttons}>
        <Button variant={'secondary'} onClick={onCancel}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  )
}
