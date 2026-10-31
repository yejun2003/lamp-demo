import { useEffect, useRef, useState } from 'react'
import type { EntryDraft, GrowthEntry, SpaceId } from '../types'
import { getSpace, moods } from '../config/spaces'
import { dateKey } from '../utils/dates'
import { SpaceIcon } from './SpaceIcon'
import { StoryArt } from './PlanetArt'
import './Dialogs.css'

interface Props {
  kind: SpaceId
  entry?: GrowthEntry
  onSave: (draft: EntryDraft, id?: string) => void
  onDelete: (id: string) => void
  onClose: () => void
}
export function RecordEditor({ kind, entry, onSave, onDelete, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [draft, setDraft] = useState<EntryDraft>(
    entry || {
      kind,
      title: '',
      body: '',
      date: dateKey(),
      tags: [],
      mood: '平静',
      progress: 0,
      detail: '',
      cover: 0,
    },
  )
  const [tags, setTags] = useState(entry?.tags.join('，') || '')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const space = getSpace(kind)
  const hasProgress = ['goals', 'reading', 'skills'].includes(kind)
  useEffect(() => {
    dialog.current?.showModal()
  }, [])
  function field<K extends keyof EntryDraft>(key: K, value: EntryDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }
  return (
    <dialog
      ref={dialog}
      className="gx-dialog gx-editor"
      aria-label={entry ? '编辑记录' : space.action}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="gx-dialog-heading">
        <div>
          <span className="gx-muted">
            {space.name} · {entry ? '编辑记录' : '新的微光'}
          </span>
          <h2>{entry ? '让故事继续生长' : space.action}</h2>
        </div>
        <button className="gx-icon-button" aria-label="关闭编辑" onClick={onClose}>
          <SpaceIcon name="close" />
        </button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!draft.title.trim()) return
          onSave(
            {
              ...draft,
              title: draft.title.trim(),
              body: draft.body.trim(),
              tags: tags
                .split(/[,，]/)
                .map((t) => t.trim())
                .filter(Boolean)
                .slice(0, 6),
            },
            entry?.id,
          )
        }}
      >
        <label>
          标题
          <input
            autoFocus
            required
            maxLength={80}
            placeholder={kind === 'reading' ? '这本书叫什么？' : '给这一刻起个名字'}
            value={draft.title}
            onChange={(e) => field('title', e.target.value)}
          />
        </label>
        <div className="gx-form-grid">
          <label>
            {kind === 'goals' ? '目标日期' : '记录日期'}
            <input
              required
              type="date"
              value={draft.date}
              onChange={(e) => field('date', e.target.value)}
            />
          </label>
          <label>
            标签 <small>用逗号分隔</small>
            <input
              maxLength={120}
              placeholder="生活，成长"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </label>
        </div>
        <label>
          {kind === 'reading'
            ? '阅读笔记'
            : kind === 'habits'
              ? '为什么想养成这个习惯？'
              : '写下你的故事'}
          <textarea
            rows={5}
            maxLength={12000}
            placeholder={space.prompt}
            value={draft.body}
            onChange={(e) => field('body', e.target.value)}
          />
        </label>
        <label>
          {kind === 'reading'
            ? '作者'
            : kind === 'habits'
              ? '每日的小约定'
              : '给自己的一句话 / 下一步'}
          <input
            maxLength={160}
            placeholder={kind === 'habits' ? '每天 20 分钟，从一页开始' : '让下一步更具体一点'}
            value={draft.detail}
            onChange={(e) => field('detail', e.target.value)}
          />
        </label>
        {hasProgress && (
          <label>
            当前进度 · {draft.progress}%
            <input
              aria-label="当前进度"
              type="range"
              min="0"
              max="100"
              step="5"
              value={draft.progress}
              onChange={(e) => field('progress', Number(e.target.value))}
            />
          </label>
        )}
        {(kind === 'journal' || kind === 'memories') && (
          <fieldset>
            <legend>此刻的心情</legend>
            <div className="gx-choice-row">
              {moods.map((mood) => (
                <button
                  type="button"
                  key={mood}
                  className={draft.mood === mood ? 'selected' : ''}
                  aria-pressed={draft.mood === mood}
                  onClick={() => field('mood', mood)}
                >
                  {mood}
                </button>
              ))}
            </div>
          </fieldset>
        )}
        <fieldset>
          <legend>选择一张封面</legend>
          <div className="gx-cover-choices">
            {['晨光小路', '书与咖啡', '海边日落', '远山旗帜'].map((name, index) => (
              <button
                type="button"
                key={name}
                className={draft.cover === index ? 'selected' : ''}
                aria-label={name}
                aria-pressed={draft.cover === index}
                onClick={() => field('cover', index)}
              >
                <StoryArt index={index} />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="gx-dialog-actions">
          {entry && (
            <button type="button" className="gx-delete" onClick={() => setConfirmDelete(true)}>
              删除记录
            </button>
          )}
          <button type="button" className="gx-button secondary" onClick={onClose}>
            取消
          </button>
          <button className="gx-button" type="submit">
            <SpaceIcon name="check" size={16} />
            保存微光
          </button>
        </div>
        {confirmDelete && (
          <div className="gx-delete-confirm" role="alert">
            <span>确定删除这条记录吗？此操作无法撤销。</span>
            <button type="button" onClick={() => setConfirmDelete(false)}>
              保留
            </button>
            <button type="button" onClick={() => entry && onDelete(entry.id)}>
              确认删除
            </button>
          </div>
        )}
      </form>
    </dialog>
  )
}
