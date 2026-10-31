import { useState } from 'react'
import type { CSSProperties } from 'react'
import { spaces } from '../config/spaces'
import type { GrowthEntry, SpaceId } from '../types'
import { PlanetArt } from './PlanetArt'
import { useOrbitMotion } from '../hooks/useOrbitMotion'
import { SpaceIcon } from './SpaceIcon'
import './GalaxyScene.css'

export function GalaxyScene({
  entries,
  onExplore,
}: {
  entries: GrowthEntry[]
  onExplore: (id: SpaceId) => void
}) {
  const [paused, setPaused] = useState(false)
  const plane = useOrbitMotion(paused)
  return (
    <div className={`gx-galaxy ${paused ? 'is-paused' : ''}`}>
      <div className="gx-galaxy-photo" aria-hidden="true" />
      <div className="gx-orbit-plane" ref={plane}>
        {[1, 2, 3].map((index) => (
          <span key={index} className={`gx-orbit-track orbit-${index}`} />
        ))}
        <div className="gx-core">
          <span />
          <strong>我的成长</strong>
        </div>
        {spaces.map((space) => (
          <button
            key={space.id}
            className={`gx-planet orbit-${space.orbit}`}
            style={
              {
                '--orbit-x': Math.cos((space.phase / 100) * Math.PI * 2),
                '--orbit-y': Math.sin((space.phase / 100) * Math.PI * 2),
                '--planet-color': space.color,
              } as CSSProperties
            }
            onClick={() => onExplore(space.id)}
            aria-label={`探索${space.name}`}
          >
            <PlanetArt index={space.sprite} />
            <strong>{space.name}</strong>
            <small>
              {entries.filter((entry) => entry.kind === space.id).length} {space.unit}
            </small>
          </button>
        ))}
      </div>
      <div className="gx-galaxy-caption">
        <span>点击星球，探索你的成长空间</span>
        <button
          className="gx-icon-button"
          aria-label={paused ? '继续星系旋转' : '暂停星系旋转'}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <SpaceIcon name={paused ? 'play' : 'pause'} size={17} />
        </button>
      </div>
      <small className="gx-sample-note">
        {entries.some((entry) => entry.id.startsWith('sample-'))
          ? ' 每一条都可以改成你的故事'
          : '每一点成长，都值得被看见'}
      </small>
    </div>
  )
}
