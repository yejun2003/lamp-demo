import type { GrowthData, GrowthEntry, Mood, SpaceId } from '../types'
import { GalaxyScene } from '../components/GalaxyScene'
import { TodayPanel } from '../components/TodayPanel'
import { StoryArt } from '../components/PlanetArt'
import { SpaceIcon } from '../components/SpaceIcon'
import './Overview.css'

interface Props {
  data: GrowthData
  onExplore: (id: SpaceId) => void
  onEdit: (entry: GrowthEntry) => void
  onMood: (mood: Mood) => void
  onToggle: (id: string) => void
}
export function Overview({ data, onExplore, onEdit, onMood, onToggle }: Props) {
  const recent = data.entries
    .filter((e) => e.kind === 'journal')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
  const goal = data.entries.find((e) => e.kind === 'goals' && e.progress < 100)
  return (
    <>
      <div className="gx-overview-top">
        <section className="gx-explorer">
          <div className="gx-overview-heading">
            <h1>
              每一点成长，
              <br />
              都有自己的轨道。
            </h1>
            <p>把日常的微光，慢慢连成属于你的宇宙。</p>
          </div>
          <GalaxyScene entries={data.entries} onExplore={onExplore} />
        </section>
        <TodayPanel data={data} onMood={onMood} onToggle={onToggle} />
      </div>
      <div className="gx-overview-bottom">
        <section className="gx-panel gx-recent">
          <div className="gx-section-label">
            <h2>最近的微光</h2>
            <button className="gx-text-button" onClick={() => onExplore('journal')}>
              查看全部
              <SpaceIcon name="arrow" size={15} />
            </button>
          </div>
          {recent.map((entry) => (
            <button className="gx-recent-row" key={entry.id} onClick={() => onEdit(entry)}>
              <StoryArt index={entry.cover} />
              <time>{entry.date.slice(5).replace('-', '.')}</time>
              <span>
                <strong>{entry.title}</strong>
                <small>{entry.body.split('\n')[0]}</small>
              </span>
              <SpaceIcon name="arrow" size={15} />
            </button>
          ))}
          {recent.length === 0 && <p className="gx-empty">你写下的第一篇日志，会在这里亮起。</p>}
        </section>
        <section className="gx-panel gx-current-goal">
          <div className="gx-section-label">
            <h2>正在靠近的目标</h2>
            <button className="gx-text-button" onClick={() => onExplore('goals')}>
              查看全部
              <SpaceIcon name="arrow" size={15} />
            </button>
          </div>
          {goal ? (
            <button className="gx-featured-goal" onClick={() => onEdit(goal)}>
              <StoryArt index={3} />
              <span>
                <strong>{goal.title}</strong>
                <small>{goal.body.split('\n')[0]}</small>
                <span className="gx-progress">
                  <i style={{ width: goal.progress + '%' }} />
                </span>
                <small className="gx-progress-label">
                  {goal.progress}% · {goal.detail}
                </small>
              </span>
            </button>
          ) : (
            <p className="gx-empty">下一颗想抵达的星，会在哪里？</p>
          )}
          <p className="gx-goal-footnote">不必急着发光，先成为自己的太阳。</p>
        </section>
      </div>
    </>
  )
}
