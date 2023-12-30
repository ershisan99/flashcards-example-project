export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type User = {
  avatar: null | string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
