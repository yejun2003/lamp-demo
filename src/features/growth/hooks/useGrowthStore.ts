import { useEffect, useState } from 'react'
import type { EntryDraft, GrowthData, GrowthEntry, Mood } from '../types'
import { spaces, moods } from '../config/spaces'
import { createSeedData } from '../data/seed'
import { dateKey } from '../utils/dates'

const STORAGE_KEY = 'luma.growth.v1'
// 导入与读取本机存档共用校验，异常存档不被静默覆盖。
export function isGrowthData(value: unknown): value is GrowthData {
  if (!value || typeof value !== 'object') return false
  const data = value as GrowthData
  return (
    data.version === 1 &&
    Array.isArray(data.entries) &&
    data.entries.length <= 10000 &&
    data.entries.every(
      (e) =>
        e &&
        typeof e.id === 'string' &&
        spaces.some((s) => s.id === e.kind) &&
        ['title', 'body', 'date', 'detail'].every(
          (key) => typeof e[key as keyof GrowthEntry] === 'string',
        ) &&
        /^\d{4}-\d{2}-\d{2}$/.test(e.date) &&
        Array.isArray(e.tags) &&
        e.tags.every((t) => typeof t === 'string') &&
        moods.includes(e.mood) &&
        Number.isFinite(e.progress) &&
        e.progress >= 0 &&
        e.progress <= 100 &&
        Number.isInteger(e.cover) &&
        e.cover >= 0 &&
        e.cover <= 3,
    ) &&
    !!data.moods &&
    typeof data.moods === 'object' &&
    Object.values(data.moods).every((m) => moods.includes(m)) &&
    !!data.checks &&
    typeof data.checks === 'object' &&
    Object.values(data.checks).every(
      (ids) => Array.isArray(ids) && ids.every((id) => typeof id === 'string'),
    )
  )
}
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { data: createSeedData(), warning: '' }
    const parsed: unknown = JSON.parse(raw)
    if (isGrowthData(parsed)) return { data: parsed, warning: '' }
    return {
      data: createSeedData(),
      warning: '原存档无法读取，当前为临时副本。请导出备份，原存档不会被覆盖。',
    }
  } catch {
    return { data: createSeedData(), warning: '本机存储不可用，关闭页面前请导出备份。' }
  }
}
export function useGrowthStore() {
  const [initial] = useState(loadData)
  const [data, setData] = useState(initial.data)
  const [storageError, setStorageError] = useState(initial.warning)
  useEffect(() => {
    if (initial.warning) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      queueMicrotask(() => setStorageError('保存失败，关闭页面前请导出备份。'))
    }
  }, [data, initial.warning])
  function saveEntry(draft: EntryDraft, id?: string) {
    const entry = { ...draft, id: id || crypto.randomUUID() }
    setData((current) => ({
      ...current,
      entries: id
        ? current.entries.map((e) => (e.id === id ? entry : e))
        : [entry, ...current.entries],
    }))
  }
  function removeEntry(id: string) {
    setData((current) => ({
      ...current,
      entries: current.entries.filter((e) => e.id !== id),
      checks: Object.fromEntries(
        Object.entries(current.checks).map(([day, ids]) => [
          day,
          ids.filter((value) => value !== id),
        ]),
      ),
    }))
  }
  function updateProgress(id: string, progress: number) {
    setData((current) => ({
      ...current,
      entries: current.entries.map((e) =>
        e.id === id ? { ...e, progress: Math.max(0, Math.min(100, progress)) } : e,
      ),
    }))
  }
  function toggleHabit(id: string, day = dateKey()) {
    setData((current) => {
      const ids = current.checks[day] || []
      return {
        ...current,
        checks: {
          ...current.checks,
          [day]: ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
        },
      }
    })
  }
  function setMood(mood: Mood) {
    setData((current) => ({ ...current, moods: { ...current.moods, [dateKey()]: mood } }))
  }
  function mergeBackup(incoming: GrowthData) {
    setData((current) => {
      const existing = new Set(current.entries.map((e) => e.id))
      return {
        ...current,
        entries: [...current.entries, ...incoming.entries.filter((e) => !existing.has(e.id))],
        moods: { ...incoming.moods, ...current.moods },
        checks: Object.fromEntries(
          [...new Set([...Object.keys(incoming.checks), ...Object.keys(current.checks)])].map(
            (day) => [
              day,
              [...new Set([...(incoming.checks[day] || []), ...(current.checks[day] || [])])],
            ],
          ),
        ),
      }
    })
  }
  return {
    data,
    storageError,
    saveEntry,
    removeEntry,
    updateProgress,
    toggleHabit,
    setMood,
    mergeBackup,
  }
}
