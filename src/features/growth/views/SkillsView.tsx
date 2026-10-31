import type { GrowthEntry } from '../types'
import { SpaceIcon } from '../components/SpaceIcon'
export function SkillsView({
  entries,
  onEdit,
}: {
  entries: GrowthEntry[]
  onEdit: (e: GrowthEntry) => void
}) {
  const plotted = entries.slice(0, 6),
    total = Math.max(3, plotted.length)
  const point = (i: number, r: number) => [
    170 + Math.cos((i * Math.PI * 2) / total - Math.PI / 2) * r,
    165 + Math.sin((i * Math.PI * 2) / total - Math.PI / 2) * r,
  ]
  const polygon = (r: number) =>
    Array.from({ length: total }, (_, i) => point(i, r).join(',')).join(' ')
  return (
    <div className="gx-skills">
      <section className="gx-panel gx-radar">
        <h3>能力的形状</h3>
        <p className="gx-muted">不与别人比较，记录自己的生长。</p>
        <svg viewBox="0 0 340 330" role="img" aria-label="前六项技能的自评进度雷达图">
          {[25, 50, 75, 100].map((r) => (
            <polygon key={r} points={polygon(r)} fill="none" stroke="#30454e" />
          ))}
          {Array.from({ length: total }, (_, i) => (
            <line
              key={i}
              x1="170"
              y1="165"
              x2={point(i, 100)[0]}
              y2={point(i, 100)[1]}
              stroke="#30454e"
            />
          ))}
          <polygon
            points={Array.from({ length: total }, (_, i) =>
              point(i, plotted[i]?.progress || 0).join(','),
            ).join(' ')}
            fill="#83c5c633"
            stroke="#83c5c6"
            strokeWidth="2"
          />
          {plotted.map((e, i) => (
            <g key={e.id}>
              <circle
                cx={point(i, e.progress)[0]}
                cy={point(i, e.progress)[1]}
                r="4"
                fill="#c5ecdd"
              />
              <text
                x={point(i, 128)[0]}
                y={point(i, 128)[1]}
                fill="#b8cad4"
                fontSize="12"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {e.title.slice(0, 12)}
              </text>
            </g>
          ))}
        </svg>
        <small className="gx-muted">自评进度 · 展示前六项技能</small>
      </section>
      <div className="gx-skill-list">
        {entries.map((entry) => (
          <button className="gx-panel gx-skill-card" key={entry.id} onClick={() => onEdit(entry)}>
            <span className="gx-card-top">
              <strong>{entry.title}</strong>
              <span>
                {entry.progress}% <SpaceIcon name="edit" size={14} />
              </span>
            </span>
            <span className="gx-progress">
              <i style={{ width: entry.progress + '%' }} />
            </span>
            <span className="gx-muted">{entry.body}</span>
            <small>下一步 · {entry.detail.replace(/^下一步[：:]\s*/, '') || '给自己设定一个小练习'}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
import './SkillsView.css'
