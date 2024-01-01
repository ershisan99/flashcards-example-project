import s from './personal-information.module.scss'

import { Camera, Edit, Logout } from '../../../assets/icons'
import { Button, Card, Typography } from '../../ui'

type Props = {
  avatar: string
  email: string
  name: string
  onAvatarChange: (newAvatar: string) => void
  onLogout: () => void
  onNameChange: (newName: string) => void
}
export const PersonalInformation = ({
  avatar,
  email,
  name,
  onAvatarChange,
  onLogout,
  onNameChange,
}: Props) => {
  const handleAvatarChanged = () => {
    onAvatarChange('new Avatar')
  }
  const handleNameChanged = () => {
    onNameChange('New name')
  }
  const handleLogout = () => {
    onLogout()
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.photoContainer}>
        <div>
          <img alt={'avatar'} src={avatar} />
          <button className={s.editAvatarButton} onClick={handleAvatarChanged}>
            <Camera />
          </button>
        </div>
      </div>
      <div className={s.nameWithEditButton}>
        <Typography className={s.name} variant={'h1'}>
          {name}
        </Typography>
        <button className={s.editNameButton} onClick={handleNameChanged}>
          <Edit />
        </button>
      </div>
      <Typography className={s.email} variant={'body2'}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        {email}
      </Typography>
      <div className={s.buttonContainer}>
        <Button onClick={handleLogout} variant={'secondary'}>
          <Logout />
          Sign Out
        </Button>
      </div>
    </Card>
  )
}
