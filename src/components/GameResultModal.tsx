import formatTime from '../utils/formatTime'

type GameResultModalProps = {
  moves: number
  elapsedTime: number
  onRestart: () => void
  onBackToHome: () => void
}

function GameResultModal({
  moves,
  elapsedTime,
  onRestart,
  onBackToHome,
}: GameResultModalProps) {
  return (
    <div className="result-overlay">
      <div className="result-panel">
        <p className="eyebrow">Tur tamamlandı</p>
        <h2>Tebrikler🥳!</h2>
        <p>Süre: {formatTime(elapsedTime)}</p>
        <p>Hamle: {moves}</p>
        <div className="result-actions">
          <button className="primary-button" type="button" onClick={onRestart}>
            Yeni oyun
          </button>
          <button className="text-button" type="button" onClick={onBackToHome}>
            Ana sayfa
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameResultModal
