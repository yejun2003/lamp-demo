import type { GrowthEntry } from '../types'
import { StoryArt } from '../components/PlanetArt'
import { SpaceIcon } from '../components/SpaceIcon'
export function MemoriesView({
  entries,
  onEdit,
}: {
  entries: GrowthEntry[]
  onEdit: (e: GrowthEntry) => void
}) {
  return (
    <div className="gx-memories">
      {entries.map((entry) => (
        <button className="gx-panel gx-memory" key={entry.id} onClick={() => onEdit(entry)}>
          <span className="gx-memory-photo">
            <StoryArt index={entry.cover} />
            <time>{entry.date.replaceAll('-', ' / ')}</time>
            <SpaceIcon name="edit" size={17} />
          </span>
          <span className="gx-memory-body">
            <span className="gx-tags">
              {entry.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </span>
            <strong>{entry.title}</strong>
            <span>{entry.body}</span>
            <small>✦ {entry.detail || '有些瞬间，值得被永远记得。'}</small>
          </span>
        </button>
      ))}
    </div>
  )
}
import './MemoriesView.css'
