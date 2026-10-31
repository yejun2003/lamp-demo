import { spaces } from '../config/spaces'
import { useEffect, useState } from 'react'
import type { PageId } from '../types'
import { SpaceIcon } from './SpaceIcon'
import './GrowthSidebar.css'

interface Props {
  page: PageId
  onNavigate: (page: PageId) => void
  onExit: () => void
  onBackup: () => void
  open: boolean
  onClose: () => void
}
export function GrowthSidebar({ page, onNavigate, onExit, onBackup, open, onClose }: Props) {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 800px)').matches)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)')
    const update = () => setMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open, onClose])
  return (
    <>
      {open && <button className="gx-nav-scrim" aria-label="关闭导航" onClick={onClose} />}
      <aside className={`gx-sidebar ${open ? 'is-open' : ''}`} inert={mobile && !open}>
        <button
          className="gx-brand"
          onClick={() => onNavigate('overview')}
          aria-label="返回星系总览"
        >
          <span>Ye.</span>
          <b>✦</b>
          <small>星屿</small>
        </button>
        <nav aria-label="成长空间">
          <button
            className={page === 'overview' ? 'active' : ''}
            aria-current={page === 'overview' ? 'page' : undefined}
            onClick={() => onNavigate('overview')}
          >
            <SpaceIcon name="overview" />
            星系总览
          </button>
          {spaces.map((space) => (
            <button
              key={space.id}
              className={page === space.id ? 'active' : ''}
              aria-current={page === space.id ? 'page' : undefined}
              onClick={() => onNavigate(space.id)}
            >
              <SpaceIcon name={space.id} />
              {space.name}
            </button>
          ))}
        </nav>
        <div className="gx-sidebar-bottom">
          <p>一颗星球，一种热爱。</p>
          <button onClick={onBackup}>
            <SpaceIcon name="storage" />
            本机数据与备份
          </button>
          <button onClick={onExit}>
            <SpaceIcon name="logout" />
            退出星系
          </button>
        </div>
      </aside>
    </>
  )
}
