import { useEffect, useRef } from 'react'
import { spaces } from '../config/spaces'

// 更新位置，不触发 React 重渲染；百分比坐标随容器尺寸自适应。
export function useOrbitMotion(paused: boolean) {
  const plane = useRef<HTMLDivElement>(null)
  const elapsed = useRef(0)
  useEffect(() => {
    const element = plane.current
    if (!element || paused) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const buttons = element.querySelectorAll<HTMLButtonElement>('.gx-planet')
    let frame = 0,
      previous = 0
    function tick(time: number) {
      if (previous && !reduced.matches && !element!.matches(':hover, :focus-within')) {
        elapsed.current += Math.min(time - previous, 100)
        buttons.forEach((button, index) => {
          const angle = (spaces[index].phase / 100 + elapsed.current / 240000) * Math.PI * 2
          button.style.setProperty('--orbit-x', String(Math.cos(angle)))
          button.style.setProperty('--orbit-y', String(Math.sin(angle)))
        })
      }
      previous = time
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [paused])
  return plane
}
