import { useEffect, useRef, useState } from 'react'
import type { GrowthData } from '../types'
import { isGrowthData } from '../hooks/useGrowthStore'
import { dateKey } from '../utils/dates'
import { SpaceIcon } from './SpaceIcon'
import './Dialogs.css'

export function BackupDialog({
  data,
  onImport,
  onClose,
}: {
  data: GrowthData
  onImport: (data: GrowthData) => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const file = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    dialog.current?.showModal()
  }, [])
  function download() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = 'luma-growth-' + dateKey() + '.json'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage('备份文件已生成，请在浏览器下载列表中查看。')
  }
  return (
    <dialog
      className="gx-dialog gx-backup"
      aria-label="本机数据与备份"
      ref={dialog}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="gx-dialog-heading">
        <div>
          <span className="gx-muted">你的宇宙，由你保管</span>
          <h2>本机数据与备份</h2>
        </div>
        <button className="gx-icon-button" aria-label="关闭备份" onClick={onClose}>
          <SpaceIcon name="close" />
        </button>
      </div>
      <p>
        已收藏 <strong>{data.entries.length}</strong>{' '}
        条记录。内容仅保存在当前浏览器，不会上传到服务器，也不会随账号跨设备同步。清除浏览器数据会移除记录，建议定期导出。
      </p>
      <div className="gx-backup-options">
        <button className="gx-button" onClick={download}>
          <SpaceIcon name="download" />
          导出全部记录
        </button>
        <button className="gx-button secondary" onClick={() => file.current?.click()}>
          <SpaceIcon name="upload" />
          导入备份
        </button>
      </div>
      <p className="gx-muted">
        导入会合并新记录；相同编号的记录保留本机版本，不覆盖已有内容。请只导入你信任的星屿备份文件。
      </p>
      <input
        ref={file}
        type="file"
        accept=".json,application/json"
        hidden
        onChange={async (e) => {
          const selected = e.target.files?.[0]
          e.target.value = ''
          if (!selected) return
          try {
            if (selected.size > 5_000_000) throw new Error()
            const parsed: unknown = JSON.parse(await selected.text())
            if (!isGrowthData(parsed)) throw new Error()
            const existing = new Set(data.entries.map((item) => item.id))
            const count = parsed.entries.filter((item) => !existing.has(item.id)).length
            onImport(parsed)
            setMessage('导入完成，合并了 ' + count + ' 条新记录。')
          } catch {
            setMessage('无法导入：请选择有效的星屿 JSON 备份（小于 5 MB）。')
          }
        }}
      />
      {message && (
        <p className="gx-backup-message" role="status">
          {message}
        </p>
      )}
    </dialog>
  )
}
