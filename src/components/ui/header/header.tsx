import s from './header.module.scss'

export type HeaderProps = {
  avatar?: string
  name?: string
  onLogout?: () => void
}

export const Header = ({}: HeaderProps) => {
  return <div>Header</div>
}
