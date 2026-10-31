export type SpaceId = 'journal' | 'goals' | 'reading' | 'skills' | 'habits' | 'memories'
export type PageId = 'overview' | SpaceId
export type Mood = '超棒' | '不错' | '平静' | '有点累' | '低落'
export interface GrowthEntry {
  id: string
  kind: SpaceId
  title: string
  body: string
  date: string
  tags: string[]
  mood: Mood
  progress: number
  detail: string
  cover: number
}
export interface GrowthData {
  version: 1
  entries: GrowthEntry[]
  moods: Record<string, Mood>
  checks: Record<string, string[]>
}
export type EntryDraft = Omit<GrowthEntry, 'id'>
