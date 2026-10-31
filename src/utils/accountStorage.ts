const ACCOUNT_KEY = 'luma.account.v1'

// 只保存用户主动勾选的账号，绝不保存密码。存储不可用时不影响登录。
export function readAccount() {
  try {
    return localStorage.getItem(ACCOUNT_KEY) || ''
  } catch {
    return ''
  }
}
export function saveAccount(account: string, remember: boolean) {
  try {
    if (remember) localStorage.setItem(ACCOUNT_KEY, account.trim())
    else localStorage.removeItem(ACCOUNT_KEY)
  } catch {
    /* 无痕模式下，本地存储可能不可用。 */
  }
}
