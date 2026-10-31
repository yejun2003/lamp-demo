import { useState } from 'react'
import type { CSSProperties } from 'react'
import { lampThemes } from '../../config/lampThemes'
import { PullCord } from './PullCord'
import { ParticleBurst } from './ParticleBurst'
import './LampScene.css'

export function LampScene({ on, setOn }: { on: boolean; setOn: (value: boolean) => void }) {
  const [mood, setMood] = useState(0)
  const [burst, setBurst] = useState(0)
  const [particles, setParticles] = useState(true)
  function changeMood(index = (mood + 1) % lampThemes.length) {
    setMood(index)
    setOn(true)
    setBurst((value) => value + 1)
  }
  return (
    <section
      className={`lamp-scene ${on ? 'is-on' : 'is-off'}`}
      aria-label="互动台灯"
      style={{ '--light-color': lampThemes[mood].color } as CSSProperties}
    >
      <div className="scene-heading">
        <h1>为你，留一盏灯。</h1>
        <p>让忙碌暂歇，让灵感亮起。</p>
      </div>
      <div className="lamp-art">
        <img
          className="scene-photo"
          src={`${import.meta.env.BASE_URL}lamp-scene.png`}
          alt="奶油色小台灯，圆润的灯罩上带着微笑"
          style={{ filter: on ? lampThemes[mood].filter : 'brightness(.55) saturate(.3)' }}
        />
        <PullCord onPull={() => changeMood()} />
        {particles && on && burst > 0 && <ParticleBurst key={burst} />}
      </div>
      <div className="lamp-controls">
        <div className="mood-caption">
          <p>拉一下灯绳，换一种心情</p>
          <span aria-live="polite">
            {on
              ? `${lampThemes[mood].name} · ${String(mood + 1).padStart(2, '0')} / ${lampThemes.length}`
              : '灯已休息，拉一下唤醒它'}
          </span>
        </div>
        <div className="light-options">
          <div className="swatches" role="group" aria-label="灯光氛围">
            {lampThemes.map((item, index) => (
              <button
                key={item.name}
                className={`swatch ${index === mood ? 'selected' : ''}`}
                style={{ background: item.color }}
                aria-label={`${item.name}灯光`}
                title={item.name}
                aria-pressed={index === mood}
                onClick={() => changeMood(index)}
              />
            ))}
          </div>
          <button
            className="light-switch"
            role="switch"
            aria-checked={on}
            aria-label="台灯开关"
            onClick={() => setOn(!on)}
          >
            <span />
            <span>{on ? 'ON' : 'OFF'}</span>
          </button>
        </div>
        <button
          className="particles-toggle"
          aria-pressed={particles}
          onClick={() => setParticles(!particles)}
        >
          <span aria-hidden="true">✧</span> 粒子效果 {particles ? '已开启' : '已关闭'}
        </button>
      </div>
    </section>
  )
}
