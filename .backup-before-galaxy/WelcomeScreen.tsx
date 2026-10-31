import { Icon } from '../ui/Icon'
import './WelcomeScreen.css'

export function WelcomeScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="welcome-content">
      <Icon name="moon" className="welcome-sun" />
      <p className="welcome-small">很高兴，你来了。</p>
      <h2 tabIndex={-1} ref={(node) => node?.focus()}>
        晚安，叶先生。
      </h2>
      <p>
        总有一盏灯，为此刻的你而亮。
        <br />
        放慢一点，享受属于自己的时光。
      </p>
      <button className="primary-button" onClick={onBack}>
        回到灯下
        <Icon name="arrow" />
      </button>
      <span className="welcome-footnote">愿你今晚，也有一个好梦。</span>
    </div>
  )
}
