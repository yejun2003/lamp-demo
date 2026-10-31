import { useEffect, useState } from 'react'
import type { EntryDraft, GrowthEntry, PageId, SpaceId } from './types'
import { spaces, getSpace } from './config/spaces'
import { useGrowthStore } from './hooks/useGrowthStore'
import { GrowthSidebar } from './components/GrowthSidebar'
import { SpaceIcon } from './components/SpaceIcon'
import { RecordEditor } from './components/RecordEditor'
import { BackupDialog } from './components/BackupDialog'
import { Overview } from './views/Overview'
import { SpacePage } from './views/SpacePage'
import './styles/growth.css'
import './styles/feedback.css'

function readPage(): PageId {
  const hash = window.location.hash.replace('#space/', '')
  return spaces.some((s) => s.id === hash) ? (hash as SpaceId) : 'overview'
}
export default function GrowthApp({ onExit }: { onExit: () => void }) {
  const store = useGrowthStore()
  const [page, setPage] = useState<PageId>(readPage)
  const [navOpen, setNavOpen] = useState(false),
    [backupOpen, setBackupOpen] = useState(false)
  const [editor, setEditor] = useState<{ kind: SpaceId; entry?: GrowthEntry } | null>(null)
  const [notice, setNotice] = useState('')
  const title = page === 'overview' ? '星系总览' : getSpace(page).name
  useEffect(() => {
    const listener = () => {
      setPage(readPage())
      setNavOpen(false)
    }
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  }, [])
  useEffect(() => {
    document.title = title + ' · Ye 星屿'
    return () => {
      document.title = 'Ye · 为你，留一盏灯'
    }
  }, [title])
  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(''), 3500)
    return () => clearTimeout(timeout)
  }, [notice])
  function navigate(next: PageId) {
    window.history.pushState(null, '', '#space/' + next)
    setPage(next)
    setNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function edit(entry: GrowthEntry) {
    setEditor({ kind: entry.kind, entry })
  }
  function save(draft: EntryDraft, id?: string) {
    store.saveEntry(draft, id)
    setEditor(null)
    setNotice('微光已收藏' + (store.storageError ? '，请及时导出备份' : '，已保存在本机'))
  }
  function exit() {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    onExit()
  }
  return (
    <div className="growth-app">
      <GrowthSidebar
        page={page}
        onNavigate={navigate}
        onExit={exit}
        onBackup={() => {
          setNavOpen(false)
          setBackupOpen(true)
        }}
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />
      <main className="gx-main">
        <header className="gx-topbar">
          <div className="gx-breadcrumb">
            <button
              className="gx-icon-button gx-mobile-menu"
              aria-label="打开导航"
              aria-expanded={navOpen}
              onClick={() => setNavOpen(!navOpen)}
            >
              <SpaceIcon name="menu" size={18} />
            </button>
            <button aria-label="我的宇宙首页" onClick={() => navigate('overview')}>
              <SpaceIcon name="overview" size={20} />
            </button>
            <span>我的宇宙</span>
            <span>/</span>
            <span>{title}</span>
          </div>
          <div className="gx-top-actions">
            <time>
              {new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </time>
            <button
              className="gx-button"
              onClick={() => setEditor({ kind: page === 'overview' ? 'journal' : page })}
            >
              <SpaceIcon name="plus" size={18} />
              {page === 'overview' ? '记录此刻' : getSpace(page).action}
            </button>
          </div>
        </header>
        {store.storageError && (
          <p className="gx-storage-warning" role="alert">
            {store.storageError}
          </p>
        )}
        <div className="gx-content">
          {page === 'overview' ? (
            <Overview
              data={store.data}
              onExplore={navigate}
              onEdit={edit}
              onMood={store.setMood}
              onToggle={store.toggleHabit}
            />
          ) : (
            <SpacePage
              key={page}
              kind={page}
              data={store.data}
              onNew={() => setEditor({ kind: page })}
              onEdit={edit}
              onProgress={store.updateProgress}
              onToggle={store.toggleHabit}
            />
          )}
          <footer className="gx-footer-note">
            <span>Ye. ✧ 星屿 · 让成长有迹可循</span>
            {/* <span>
              {store.data.entries.some((e) => e.id.startsWith('sample-'))
                ? '包含可编辑的示例内容 · '
                : ''}
              数据仅保存在当前浏览器
            </span> */}
          </footer>
        </div>
      </main>
      {editor && (
        <RecordEditor
          kind={editor.kind}
          entry={editor.entry}
          onSave={save}
          onDelete={(id) => {
            store.removeEntry(id)
            setEditor(null)
            setNotice('这条记录已删除')
          }}
          onClose={() => setEditor(null)}
        />
      )}
      {backupOpen && (
        <BackupDialog
          data={store.data}
          onImport={store.mergeBackup}
          onClose={() => setBackupOpen(false)}
        />
      )}
      {notice && (
        <div className="gx-toast" role="status">
          <SpaceIcon name="check" size={16} />
          {notice}
        </div>
      )}
    </div>
  )
}
