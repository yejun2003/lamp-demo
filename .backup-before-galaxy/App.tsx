import { useState } from 'react'
import { PageLayout } from './components/layout/PageLayout'
import { LampScene } from './components/lamp/LampScene'
import { LoginForm } from './components/auth/LoginForm'
import { WelcomeScreen } from './components/auth/WelcomeScreen'
import { InfoDialog } from './components/ui/InfoDialog'
import type { DialogKind } from './components/ui/InfoDialog'

// 入口只负责跨区域状态与页面组合，具体功能和样式在对应组件目录。
export default function App() {
  const [lampOn, setLampOn] = useState(true)
  const [entered, setEntered] = useState(false)
  const [dialog, setDialog] = useState<DialogKind | null>(null)

  function enterSpace() {
    setLampOn(true)
    setEntered(true)
  }

  return (
    <>
      <PageLayout onAbout={() => setDialog('about')}>
        <LampScene on={lampOn} setOn={setLampOn} />
        <section className="form-panel" aria-label={entered ? '欢迎空间' : '账号登录'}>
          {entered ? (
            <WelcomeScreen onBack={() => setEntered(false)} />
          ) : (
            <LoginForm onSuccess={enterSpace} onHelp={() => setDialog('help')} />
          )}
        </section>
      </PageLayout>
      <InfoDialog kind={dialog} onClose={() => setDialog(null)} />
    </>
  )
}
