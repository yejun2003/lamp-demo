import { useEffect, useRef } from 'react'
import { Icon } from './Icon'
import './InfoDialog.css'

export type DialogKind = 'help' | 'about'

// 原生 dialog 负责焦点限制与背景遮罩；由 App 的 kind 控制打开/关闭。
export function InfoDialog({ kind, onClose }: { kind: DialogKind | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialogRef.current
    if (kind && !element?.open) element?.showModal()
    if (!kind && element?.open) element.close()
  }, [kind])
  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      aria-labelledby="dialog-title"
    >
      <button className="dialog-close" aria-label="关闭弹窗" onClick={() => onClose()}>
        <Icon name="close" />
      </button>
      <Icon name="sun" className="welcome-sun" />
      <h2 id="dialog-title">{kind === 'help' ? '不妨，轻松一点。' : '一个有温度的小空间。'}</h2>
      <p>
        {kind === 'help'
          ? '使用下方账号，或点击「体验一下」即可进入。'
          : '灵感来自一盏可以拉绳点亮的台灯。希望这个小小的互动，能为忙碌的日常留下一点温柔。'}
      </p>
      {kind === 'help' && (
        <div className="account-hint">
          账号 <strong>叶先生</strong>
          <span>
            密码 <strong>200320</strong>
          </span>
        </div>
      )}
      <button className="primary-button" onClick={() => onClose()}>
        知道了
        <Icon name="arrow" />
      </button>
    </dialog>
  )
}
