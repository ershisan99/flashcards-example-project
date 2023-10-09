import s from './delete-deck-dialog.module.scss'

import { Dialog, DialogProps } from '@/components'
export default {}
type Props = Pick<DialogProps, 'onConfirm' | 'onCancel' | 'open' | 'onOpenChange'> & {
  deckName: string
}
export const DeleteDeckDialog = ({ deckName, ...dialogProps }: Props) => {
  return (
    <Dialog {...dialogProps} title={'Delete deck'}>
      <div className={s.content}>
        <p>
          Do you really want to remove <strong>{deckName}</strong>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
    </Dialog>
  )
}
