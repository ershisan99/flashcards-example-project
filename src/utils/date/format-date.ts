export function formatDate(date: string | undefined) {
  if (!date) {
    return ''
  }

  return new Date(date).toLocaleDateString('ru-RU')
}
