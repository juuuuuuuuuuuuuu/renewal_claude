import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'
import { ko, enUS, ja } from 'date-fns/locale'

const localeMap = { ko, en: enUS, ja }

export function formatDate(date: string | Date, pattern = 'yyyy.MM.dd'): string {
  return format(new Date(date), pattern)
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'yyyy.MM.dd HH:mm')
}

export function formatRelativeTime(date: string | Date, locale: 'ko' | 'en' | 'ja' = 'ko'): string {
  const d = new Date(date)
  if (isToday(d)) return formatDistanceToNow(d, { addSuffix: true, locale: localeMap[locale] })
  if (isYesterday(d)) return locale === 'ko' ? '어제' : locale === 'ja' ? '昨日' : 'Yesterday'
  return formatDate(d)
}
