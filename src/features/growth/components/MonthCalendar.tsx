import { useState } from 'react'
import type { GrowthEntry } from '../types'
import { dateKey } from '../utils/dates'
import { SpaceIcon } from './SpaceIcon'

export function MonthCalendar({
  entries,
  selected,
  onSelect,
}: {
  entries: GrowthEntry[]
  selected: string
  onSelect: (date: string) => void
}) {
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  )
  const year = month.getFullYear(),
    index = month.getMonth()
  const days = new Date(year, index + 1, 0).getDate(),
    offset = new Date(year, index, 1).getDay()
  const recorded = new Set(entries.map((e) => e.date))
  return (
    <section className="gx-panel gx-calendar">
      <h2>本月回望</h2>
      <div className="gx-calendar-nav">
        <button aria-label="上个月" onClick={() => setMonth(new Date(year, index - 1, 1))}>
          <SpaceIcon name="back" size={16} />
        </button>
        <span>
          {year}年{index + 1}月
        </span>
        <button aria-label="下个月" onClick={() => setMonth(new Date(year, index + 1, 1))}>
          <SpaceIcon name="arrow" size={16} />
        </button>
      </div>
      <div className="gx-calendar-grid">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <small key={day}>{day}</small>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={'blank' + i} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const key = dateKey(new Date(year, index, i + 1))
          return (
            <button
              key={key}
              className={[
                key === dateKey() ? 'today' : '',
                key === selected ? 'selected' : '',
                recorded.has(key) ? 'has-record' : '',
              ].join(' ')}
              aria-label={key + (recorded.has(key) ? ' 有记录' : '')}
              aria-pressed={key === selected}
              onClick={() => onSelect(selected === key ? '' : key)}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
      <p className="gx-muted">金色光点，是你留下微光的日子。</p>
      {selected && (
        <button className="gx-text-button" onClick={() => onSelect('')}>
          清除日期筛选 ×
        </button>
      )}
    </section>
  )
}
