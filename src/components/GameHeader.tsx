import formatTime from "../utils/formatTime";
import { useGame } from "../context/useGame";

type GameHeaderProps = {
  label: string;
  onBackToHome: () => void;
};

function GameHeader({label, onBackToHome}: GameHeaderProps) {
// Verileri ve aksiyonları direkt Context telsizinden alıyoruz
const {moves, elapsedTime, isPaused, togglePause, restartGame} = useGame();
  return (
    <header className="game-header">
      <div>
        <p className="eyebrow">Memory Game</p>
        <h1>{label} seviye</h1>
      </div>
      <div className="game-stats">
        <span>🕹️ Hamle: {moves}</span>
        <span>⏱️ Süre: {formatTime(elapsedTime)}</span>
      </div>
      <div className="game-actions">
        <button className="text-button" type="button" onClick={togglePause}>
          {isPaused ? '▶️' : '⏸️'}
        </button>
        <button className="text-button" type="button" onClick={restartGame}>
          Yeniden başlat
        </button>
        <button className="text-button" type="button" onClick={onBackToHome}>
          Ana sayfa
        </button>
      </div>
    </header>
  );
}

export default GameHeader;
