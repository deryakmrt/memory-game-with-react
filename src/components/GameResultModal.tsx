import formatTime from '../utils/formatTime'
import { useGame } from '../context/useGame'

type GameResultModalProps = {
  onBackToHome: () => void
}

function GameResultModal({onBackToHome}: GameResultModalProps) {
  // Oyun sonuç verilerini ve yeniden başlatma fonksiyonunu Context'ten alıyoruz
  const {moves, elapsedTime, restartGame} = useGame();
  return (
    <div className="result-overlay">
      <div className="result-panel">
        <p className="eyebrow">Tur tamamlandı</p>
        <h2>Tebrikler🥳!</h2>
        <p>Süre: {formatTime(elapsedTime)}</p>
        <p>Hamle: {moves}</p>
        <div className="result-actions">
          <button className="primary-button" type="button" onClick={restartGame}>
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
