import type { CSSProperties } from 'react'
export function PlanetArt({ index, className = '' }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`planet-art ${className}`}
      style={
        { backgroundPosition: `${(index % 3) * 50}% ${index > 2 ? 100 : 0}%` } as CSSProperties
      }
    />
  )
}
export function StoryArt({ index, className = '' }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`story-art ${className}`}
      style={{ backgroundPosition: `${(index % 2) * 100}% ${index > 1 ? 100 : 0}%` }}
    />
  )
}
