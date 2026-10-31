import type { GrowthData, GrowthEntry } from '../types'
import { dateKey, lastSevenDays } from '../utils/dates'
import { SpaceIcon } from '../components/SpaceIcon'
export function HabitsView({
  entries,
  data,
  onEdit,
  onToggle,
}: {
  entries: GrowthEntry[]
  data: GrowthData
  onEdit: (e: GrowthEntry) => void
  onToggle: (id: string, day: string) => void
}) {
  const days = lastSevenDays()
  return (
    <div className="gx-habits">
      <section className="gx-panel gx-week">
        <div className="gx-section-label">
          <h3>把坚持变成看得见的光</h3>
          <span className="gx-muted">最近 7 天</span>
        </div>
        <p className="gx-muted">点击圆点打卡，也可以补记过去几天。小小的重复，会有很大的回响。</p>
        <div className="gx-week-scroll">
          <div className="gx-week-grid">
            <span>我的习惯</span>
            {days.map((day) => (
              <time key={day} className={day === dateKey() ? 'is-today' : ''}>
                {day === dateKey() ? '今天' : day.slice(5).replace('-', '.')}
              </time>
            ))}
            {entries.map((entry) => (
              <div className="gx-week-row" key={entry.id}>
                <button className="gx-habit-name" onClick={() => onEdit(entry)}>
                  {entry.title}
                  <small>{entry.detail}</small>
                </button>
                {days.map((day) => {
                  const checked = !!data.checks[day]?.includes(entry.id)
                  return (
                    <button
                      key={day}
                      className={'gx-check-dot ' + (checked ? 'checked' : '')}
                      aria-label={day + ' ' + entry.title}
                      aria-pressed={checked}
                      onClick={() => onToggle(entry.id, day)}
                    >
                      {checked ? <SpaceIcon name="check" size={16} /> : <span />}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="gx-habit-notes">
        {entries.map((entry) => (
          <article className="gx-panel" key={entry.id}>
            <div className="gx-card-top">
              <h3>{entry.title}</h3>
              <button
                className="gx-text-button"
                aria-label={'编辑' + entry.title}
                onClick={() => onEdit(entry)}
              >
                <SpaceIcon name="edit" size={16} />
              </button>
            </div>
            <p>{entry.body}</p>
            <small>
              本周已点亮 {days.filter((day) => data.checks[day]?.includes(entry.id)).length} / 7 天
            </small>
          </article>
        ))}
      </div>
    </div>
  )
}
import './HabitsView.css'
