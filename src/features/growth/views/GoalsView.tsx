import type { GrowthEntry } from '../types'
import { SpaceIcon } from '../components/SpaceIcon'
export function GoalsView({
  entries,
  onEdit,
  onProgress,
}: {
  entries: GrowthEntry[]
  onEdit: (e: GrowthEntry) => void
  onProgress: (id: string, n: number) => void
}) {
  const columns = [
    { label: '准备启程', hint: '每个开始都值得', test: (n: number) => n === 0 },
    { label: '正在靠近', hint: '一步一步，也很好', test: (n: number) => n > 0 && n < 100 },
    { label: '已经抵达', hint: '为自己轻轻鼓掌', test: (n: number) => n === 100 },
  ]
  return (
    <div className="gx-goal-board">
      {columns.map((column) => (
        <section key={column.label}>
          <header>
            <h3>{column.label}</h3>
            <span>{entries.filter((e) => column.test(e.progress)).length}</span>
          </header>
          <p className="gx-muted">{column.hint}</p>
          {entries
            .filter((e) => column.test(e.progress))
            .map((entry) => (
              <article className="gx-panel gx-goal-card" key={entry.id}>
                <div className="gx-card-top">
                  <span className="gx-goal-dot" />
                  <button
                    className="gx-text-button"
                    aria-label={'编辑' + entry.title}
                    onClick={() => onEdit(entry)}
                  >
                    <SpaceIcon name="edit" size={16} />
                  </button>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
                <span className="gx-progress">
                  <i style={{ width: entry.progress + '%' }} />
                </span>
                <div className="gx-card-top gx-progress-label">
                  <span>{entry.progress}%</span>
                  <time>{entry.date}</time>
                </div>
                <small>{entry.detail}</small>
                {entry.progress < 100 ? (
                  <button
                    className="gx-text-button"
                    onClick={() => onProgress(entry.id, entry.progress + 10)}
                  >
                    前进一小步 +10% <SpaceIcon name="arrow" size={14} />
                  </button>
                ) : (
                  <p className="gx-complete">✦ 又一颗星，被你点亮了</p>
                )}
              </article>
            ))}
        </section>
      ))}
    </div>
  )
}
import './GoalsView.css'
