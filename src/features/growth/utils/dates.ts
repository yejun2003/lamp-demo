// 使用本机日期，不通过 UTC 截取，避免凌晨记录被分到前一天。
export function dateKey(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}
export function daysAgo(offset: number) {
  const date = new Date()
  date.setDate(date.getDate() - offset)
  return dateKey(date)
}
export function displayDate(value: string) {
  return new Date(value + 'T12:00:00').toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
  })
}
export const lastSevenDays = () => Array.from({ length: 7 }, (_, index) => daysAgo(6 - index))
