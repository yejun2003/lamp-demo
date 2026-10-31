import { useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import './PullCord.css'

// 将拖动、轻点和键盘操作统一为一次 onPull，避免拖动结束后的 click 重复换色。
export function PullCord({ onPull }: { onPull: () => void }) {
  const [pull, setPull] = useState(0)
  const startY = useRef<number | null>(null)
  const dragged = useRef(false)

  function release(event: PointerEvent<HTMLButtonElement>) {
    if (startY.current === null) return
    dragged.current = event.clientY - startY.current > 12
    if (dragged.current) onPull()
    startY.current = null
    setPull(0)
  }

  return (
    <button
      className="pull-cord"
      aria-label="拉绳切换灯光颜色"
      style={{ '--pull': `${pull}px` } as CSSProperties}
      onPointerDown={(event) => {
        startY.current = event.clientY
        dragged.current = false
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (startY.current !== null)
          setPull(Math.min(65, Math.max(0, event.clientY - startY.current)))
      }}
      onPointerUp={release}
      onPointerCancel={() => {
        startY.current = null
        setPull(0)
        dragged.current = true
      }}
      onClick={(event) => {
        if (event.detail === 0 || !dragged.current) onPull()
        dragged.current = false
      }}
    >
      <span className="cord-line" />
      <span className="cord-knob" />
    </button>
  )
}
