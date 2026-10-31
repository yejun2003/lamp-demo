import type { GrowthEntry } from '../types'
import { StoryArt } from '../components/PlanetArt'
import { SpaceIcon } from '../components/SpaceIcon'
export function JournalView({
  entries,
  onEdit,
}: {
  entries: GrowthEntry[]
  onEdit: (e: GrowthEntry) => void
}) {
  return (
    <div className="gx-timeline">
      {entries.map((entry) => (
        <article className="gx-timeline-item" key={entry.id}>
          <time dateTime={entry.date}>
            {entry.date.slice(5).replace('-', '月')}日
            <small>
              {new Date(entry.date + 'T12:00:00').toLocaleDateString('zh-CN', { weekday: 'long' })}
            </small>
          </time>
          <button
            className="gx-panel gx-journal-card"
            onClick={() => onEdit(entry)}
            aria-label={'查看与编辑：' + entry.title}
          >
            <StoryArt index={entry.cover} />
            <span className="gx-journal-copy">
              <strong>{entry.title}</strong>
              <span className="gx-tags">
                {entry.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
                <span>{entry.mood}</span>
              </span>
              <span className="gx-entry-excerpt">
                {entry.body || '故事还在酝酿，点这里继续写。'}
              </span>
            </span>
            <SpaceIcon name="edit" size={17} />
          </button>
        </article>
      ))}
    </div>
  )
}
import './JournalView.css'
