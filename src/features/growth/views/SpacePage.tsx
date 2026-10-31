import { useState, type CSSProperties } from 'react'
import type { GrowthData, GrowthEntry, SpaceId } from '../types'
import { getSpace, moods } from '../config/spaces'
import { PlanetArt } from '../components/PlanetArt'
import { SpaceIcon } from '../components/SpaceIcon'
import { MonthCalendar } from '../components/MonthCalendar'
import { JournalView } from './JournalView'
import { GoalsView } from './GoalsView'
import { ReadingView } from './ReadingView'
import { SkillsView } from './SkillsView'
import { HabitsView } from './HabitsView'
import { MemoriesView } from './MemoriesView'
import './SpacePage.css'
import '../styles/spaceResponsive.css'

interface Props {
  kind: SpaceId
  data: GrowthData
  onNew: () => void
  onEdit: (e: GrowthEntry) => void
  onProgress: (id: string, n: number) => void
  onToggle: (id: string, day: string) => void
}
export function SpacePage({ kind, data, onNew, onEdit, onProgress, onToggle }: Props) {
  const space = getSpace(kind),
    all = data.entries.filter((e) => e.kind === kind)
  const [search, setSearch] = useState(''),
    [mood, setMood] = useState('全部'),
    [selectedDate, setSelectedDate] = useState('')
  const entries = all
    .filter(
      (e) =>
        (e.title + e.body + e.tags.join('') + e.detail)
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) &&
        (mood === '全部' || e.mood === mood) &&
        (!selectedDate || e.date === selectedDate),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
  const completed = all.filter((e) => e.progress === 100).length
  return (
    <div className="gx-space" style={{ '--space-color': space.color } as CSSProperties}>
      <header className="gx-space-hero">
        <div>
          <h1>{space.name}</h1>
          <p>{space.description}</p>
          <div className="gx-space-stats">
            <span>
              <SpaceIcon name={kind} />
              <strong>{all.length}</strong>
              {space.unit}
            </span>
            <span>
              <SpaceIcon name="overview" />
              {['goals', 'reading', 'skills'].includes(kind)
                ? completed + ' 项已完成'
                : new Set(all.flatMap((e) => e.tags)).size + ' 个成长关键词'}
            </span>
            <span>✧ 每一笔，都算数</span>
          </div>
        </div>
        <div className="gx-hero-planet" aria-hidden="true">
          <PlanetArt index={space.sprite} />
        </div>
      </header>
      <div className={'gx-space-layout ' + (kind === 'journal' ? '' : 'gx-wide-space')}>
        <div className="gx-space-body">
          <div className="gx-filters">
            <label className="gx-search">
              <SpaceIcon name="search" size={19} />
              <input
                aria-label="搜索记录"
                placeholder="搜索标题、内容或标签…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button aria-label="清空搜索" onClick={() => setSearch('')}>
                  <SpaceIcon name="close" size={14} />
                </button>
              )}
            </label>
            {kind === 'journal' && (
              <div className="gx-mood-filter">
                {['全部', ...moods].map((value) => (
                  <button
                    key={value}
                    className={mood === value ? 'active' : ''}
                    aria-pressed={mood === value}
                    onClick={() => setMood(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedDate && (
            <p className="gx-filter-summary">
              {selectedDate} 的记录{' '}
              <button className="gx-text-button" onClick={() => setSelectedDate('')}>
                清除筛选 ×
              </button>
            </p>
          )}
          {entries.length === 0 ? (
            <div className="gx-panel gx-empty">
              <SpaceIcon name={kind} size={35} />
              <h3>{all.length === 0 ? '这颗星球，等待你的第一个故事' : '还没有找到这束微光'}</h3>
              <p>{all.length === 0 ? space.prompt : '试试其他关键词，或清除当前筛选。'}</p>
              {all.length === 0 ? (
                <button className="gx-button" onClick={onNew}>
                  {space.action}
                </button>
              ) : (
                <button
                  className="gx-button secondary"
                  onClick={() => {
                    setSearch('')
                    setMood('全部')
                    setSelectedDate('')
                  }}
                >
                  查看全部记录
                </button>
              )}
            </div>
          ) : (
            <>
              {kind === 'journal' && <JournalView entries={entries} onEdit={onEdit} />}
              {kind === 'goals' && (
                <GoalsView entries={entries} onEdit={onEdit} onProgress={onProgress} />
              )}
              {kind === 'reading' && (
                <ReadingView entries={entries} onEdit={onEdit} onProgress={onProgress} />
              )}
              {kind === 'skills' && <SkillsView entries={entries} onEdit={onEdit} />}
              {kind === 'habits' && (
                <HabitsView entries={entries} data={data} onEdit={onEdit} onToggle={onToggle} />
              )}
              {kind === 'memories' && <MemoriesView entries={entries} onEdit={onEdit} />}
            </>
          )}
        </div>
        <aside className="gx-space-aside">
          <section className="gx-panel gx-prompt">
            <h2>给自己的提问</h2>
            <span className="gx-prompt-star">✧</span>
            <p>{space.prompt}</p>
            <button className="gx-button" onClick={onNew}>
              <SpaceIcon name="edit" size={17} />
              {kind === 'journal' ? '写下答案' : space.action}
            </button>
          </section>
          {kind === 'journal' ? (
            <MonthCalendar entries={all} selected={selectedDate} onSelect={setSelectedDate} />
          ) : (
            <section className="gx-panel gx-space-note">
              <SpaceIcon name={kind} size={26} />
              <h3>按照自己的节奏</h3>
              <p>
                {kind === 'habits'
                  ? '偶尔中断没有关系，今天仍然是一个新的开始。'
                  : kind === 'skills'
                    ? '这里的进度是你对自己的观察，不是一场需要满分的考试。'
                    : kind === 'reading'
                      ? '书不必读得很快，留下一句真正打动你的话就很好。'
                      : kind === 'goals'
                        ? '把大的愿望拆成小的行动。每前进一步，都是在认真回应自己。'
                        : '用文字留住细节。多年后，你会感谢今天愿意记录的自己。'}
              </p>
              <small>慢慢来，你正在生长。</small>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}
