import type { ReactNode } from 'react'
import { Icon } from '../ui/Icon'
import './PageLayout.css'

export function PageLayout({ children, onAbout }: { children: ReactNode; onAbout: () => void }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="./" className="wordmark" aria-label="Ye 首页">
          Ye<span>.</span>
        </a>
        <p>一盏灯，一个属于你的空间。</p>
      </header>
      <main className="main-layout">{children}</main>
      <footer className="site-footer">
        <p>
          © 2026 Ye. <span>慢一点，也很好。</span>
        </p>
        <button className="text-button" onClick={onAbout}>
          关于这个小空间
          <Icon name="diagonal" />
        </button>
      </footer>
    </div>
  )
}
