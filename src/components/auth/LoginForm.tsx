import { useState } from 'react'
import type { FormEvent } from 'react'
import { Icon } from '../ui/Icon'
import { readAccount, saveAccount } from '../../utils/accountStorage'
import './LoginForm.css'

export function LoginForm({ onSuccess, onHelp }: { onSuccess: () => void; onHelp: () => void }) {
  const [account, setAccount] = useState(readAccount)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => Boolean(readAccount()))
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  function submit(event: FormEvent) {
    event.preventDefault()
    if (account.trim() !== '叶先生' || password !== '200320') {
      setError('账号或密码不正确')
      return
    }
    saveAccount(account, remember)
    onSuccess()
  }
  return (
    <div className="login-content">
      <div className="form-heading">
        <Icon name="sun" className="welcome-sun" />
        <h2>欢迎回来</h2>
        <p>点亮你的空间，继续未完的灵感。</p>
      </div>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="account">账号</label>
          <input
            id="account"
            name="username"
            autoComplete="username"
            placeholder="请输入你的账号"
            value={account}
            onChange={(e) => {
              setAccount(e.target.value)
              setError('')
            }}
            required
            aria-describedby={error ? 'login-error' : undefined}
            aria-invalid={Boolean(error)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">密码</label>
          <div className="password-field">
            <input
              id="password"
              name="password"
              type={visible ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              required
              aria-describedby={error ? 'login-error' : undefined}
              aria-invalid={Boolean(error)}
            />
            <button
              className="eye-button"
              type="button"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? '隐藏密码' : '显示密码'}
            >
              <Icon name={visible ? 'eye-off' : 'eye'} />
            </button>
          </div>
        </div>
        <div className="form-options">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            记住账号
          </label>
          <button className="text-button" type="button" onClick={onHelp}>
            忘记密码？
          </button>
        </div>
        {error && (
          <p className="error" id="login-error" role="alert">
            {error}
          </p>
        )}
        <button className="primary-button" type="submit">
          登录
          <Icon name="arrow" />
        </button>
      </form>
      <div className="divider">
        <span>第一次来这里？</span>
      </div>
      <button className="secondary-button" onClick={onSuccess}>
        体验一下
      </button>
    </div>
  )
}
