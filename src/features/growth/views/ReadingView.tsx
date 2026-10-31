import type { GrowthEntry } from '../types'
import { SpaceIcon } from '../components/SpaceIcon'
export function ReadingView({
  entries,
  onEdit,
  onProgress,
}: {
  entries: GrowthEntry[]
  onEdit: (e: GrowthEntry) => void
  onProgress: (id: string, n: number) => void
}) {
  return (
    <div className="gx-reading-list">
      {entries.map((entry, index) => (
        <article className="gx-panel gx-book-card" key={entry.id}>
          <button
            className={'gx-book-cover cover-' + (index % 3)}
            onClick={() => onEdit(entry)}
            aria-label={'打开' + entry.title}
          >
            <span>我的私人书架</span>
            <strong>{entry.title}</strong>
            <small>{entry.detail || '写下作者的名字'}</small>
            <i>✧</i>
          </button>
          <div className="gx-book-copy">
            <div className="gx-card-top">
              <span className="gx-category">
                {entry.progress === 100 ? '已读完' : entry.progress === 0 ? '想读' : '正在读'}
              </span>
              <button
                className="gx-text-button"
                onClick={() => onEdit(entry)}
                aria-label={'编辑' + entry.title}
              >
                <SpaceIcon name="edit" size={17} />
              </button>
            </div>
            <h3>{entry.title}</h3>
            <p className="gx-muted">{entry.detail}</p>
            <p className="gx-book-note">{entry.body}</p>
            <div className="gx-book-progress">
              <span className="gx-progress">
                <i style={{ width: entry.progress + '%' }} />
              </span>
              <span>{entry.progress}%</span>
            </div>
            {entry.progress < 100 && (
              <button className="gx-text-button" onClick={() => onProgress(entry.id, 100)}>
                标记读完 <SpaceIcon name="check" size={15} />
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
import './ReadingView.css'
