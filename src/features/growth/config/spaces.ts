import type { SpaceId } from '../types'

export const spaces: {
  id: SpaceId
  name: string
  english: string
  description: string
  color: string
  unit: string
  action: string
  prompt: string
  sprite: number
  phase: number
  orbit: number
}[] = [
  {
    id: 'journal',
    name: '成长日志',
    english: 'JOURNAL',
    description: '把今天的微光，留给未来的自己。',
    color: '#8ebfe7',
    unit: '篇记录',
    action: '写一篇日志',
    prompt: '今天有什么小事，让你觉得值得？',
    sprite: 0,
    phase: 60,
    orbit: 1,
  },
  {
    id: 'goals',
    name: '目标计划',
    english: 'GOALS',
    description: '不必一步抵达，向前一点也很好。',
    color: '#e6ba83',
    unit: '个目标',
    action: '种下一个目标',
    prompt: '想成为的自己，今天可以靠近哪一步？',
    sprite: 1,
    phase: 83,
    orbit: 2,
  },
  {
    id: 'reading',
    name: '阅读书架',
    english: 'LIBRARY',
    description: '在别人的文字里，拓宽自己的宇宙。',
    color: '#b5a5e5',
    unit: '本书',
    action: '放入一本书',
    prompt: '最近读到的哪句话，让你停留了很久？',
    sprite: 2,
    phase: 0,
    orbit: 3,
  },
  {
    id: 'skills',
    name: '技能地图',
    english: 'SKILLS',
    description: '把好奇心，练习成自己的引力。',
    color: '#83c5c6',
    unit: '项技能',
    action: '探索新技能',
    prompt: '如果每天练习二十分钟，你想学会什么？',
    sprite: 3,
    phase: 17,
    orbit: 2,
  },
  {
    id: 'habits',
    name: '习惯打卡',
    english: 'RITUALS',
    description: '微小的重复，是时间送给你的复利。',
    color: '#e3ae6e',
    unit: '个习惯',
    action: '建立一个习惯',
    prompt: '哪一个小习惯，会让明天的你感谢今天？',
    sprite: 4,
    phase: 33,
    orbit: 1,
  },
  {
    id: 'memories',
    name: '闪光回忆',
    english: 'MOMENTS',
    description: '收藏那些，让平凡日子发光的瞬间。',
    color: '#d99d99',
    unit: '段回忆',
    action: '收藏一个瞬间',
    prompt: '如果给今天拍一张心里的照片，会是什么？',
    sprite: 5,
    phase: 50,
    orbit: 3,
  },
]
export const moods = ['超棒', '不错', '平静', '有点累', '低落'] as const
export const getSpace = (id: SpaceId) => spaces.find((space) => space.id === id)!
