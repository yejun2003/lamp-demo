import { lazy, Suspense, useState } from 'react'
import { PageLayout } from './components/layout/PageLayout'
import { LampScene } from './components/lamp/LampScene'
import { LoginForm } from './components/auth/LoginForm'
import { InfoDialog } from './components/ui/InfoDialog'
import type { DialogKind } from './components/ui/InfoDialog'

const GrowthApp = lazy(() => import('./features/growth/GrowthApp'))

// 入口只负责跨区域状态与页面组合，具体功能和样式在对应组件目录。
export default function App() {
  const [lampOn, setLampOn] = useState(true)
  const [entered, setEntered] = useState(false)
  const [dialog, setDialog] = useState<DialogKind | null>(null)

  function enterSpace() {
    setLampOn(true)
    setEntered(true)
  }

  if (entered)
    return (
      <Suspense
        fallback={
          <div
            style={{
              minHeight: '100svh',
              background: '#080e1c',
              color: '#efc789',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            正在点亮你的星系…
          </div>
        }
      >
        <GrowthApp onExit={() => setEntered(false)} />
      </Suspense>
    )

  return (
    <>
      <PageLayout onAbout={() => setDialog('about')}>
        <LampScene on={lampOn} setOn={setLampOn} />
        <section className="form-panel" aria-label="账号登录">
          <LoginForm onSuccess={enterSpace} onHelp={() => setDialog('help')} />
        </section>
      </PageLayout>
      <InfoDialog kind={dialog} onClose={() => setDialog(null)} />
    </>
  )
}
