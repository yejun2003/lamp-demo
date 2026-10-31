import type { GrowthData, Mood } from '../types'
import { moods } from '../config/spaces'
import { dateKey } from '../utils/dates'
import { SpaceIcon } from './SpaceIcon'
import './TodayPanel.css'

export function TodayPanel({
  data,
  onMood,
  onToggle,
}: {
  data: GrowthData
  onMood: (mood: Mood) => void
  onToggle: (id: string) => void
}) {
  const today = dateKey(),
    done = data.checks[today] || []
  const habits = data.entries.filter((entry) => entry.kind === 'habits')
  const completed = habits.filter((habit) => done.includes(habit.id)).length
  return (
    <aside className="gx-today gx-panel">
      <h2>今日航行</h2>
      <p className="gx-muted">
        {new Date().toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })}
      </p>
      <div className="gx-today-section">
        <h3>今天的你，感觉如何？</h3>
        <div className="gx-moods">
          {moods.map((mood, index) => (
            <button
              key={mood}
              className={data.moods[today] === mood ? 'selected' : ''}
              onClick={() => onMood(mood)}
              aria-pressed={data.moods[today] === mood}
            >
              <svg viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="16" />
                <circle cx="12" cy="14" r="1" />
                <circle cx="24" cy="14" r="1" />
                <path
                  d={index < 2 ? 'M10 21q8 10 16 0' : index === 2 ? 'M12 24h12' : 'M11 26q7-8 14 0'}
                />
              </svg>
              <span>{mood}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="gx-today-section">
        <div className="gx-section-label">
          <h3>今日习惯</h3>
          <span>
            {completed} / {habits.length}
          </span>
        </div>
        <div className="gx-today-habits">
          {habits.slice(0, 4).map((habit) => (
            <button
              key={habit.id}
              aria-pressed={done.includes(habit.id)}
              onClick={() => onToggle(habit.id)}
            >
              <span className="gx-check">
                {done.includes(habit.id) && <SpaceIcon name="check" size={14} />}
              </span>
              <span>{habit.title}</span>
            </button>
          ))}
          {habits.length === 0 && <p className="gx-muted">去习惯星球，种下第一个小习惯。</p>}
        </div>
      </div>
      <p className="gx-today-quote">
        <span>✧</span> 慢慢来，你正在靠近
        <br />
        想成为的自己。
      </p>
    </aside>
  )
}
