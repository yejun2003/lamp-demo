import type { CSSProperties } from 'react'
import './ParticleBurst.css'

// 每次换色通过父组件的 key 重新播放；轨迹固定，避免重渲染随机闪跳。
export function ParticleBurst() {
  return (
    <div className="particle-burst" aria-hidden="true">
      {Array.from({ length: 26 }, (_, index) => (
        <i
          key={index}
          style={
            {
              '--dx': `${Math.cos(index * 2.4) * (95 + index * 4)}px`,
              '--dy': `${Math.sin(index * 2.4) * 140 + 80}px`,
              '--delay': `${(index % 5) * 35}ms`,
              '--size': `${3 + (index % 4)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
