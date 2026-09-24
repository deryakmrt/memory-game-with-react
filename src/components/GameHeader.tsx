import formatTime from "../utils/formatTime";

type GameHeaderProps = {
  label: string;
  moves: number;
  elapsedTime: number;
  isPaused: boolean;
  onBackToHome: () => void;
  onTogglePause: () => void;
  onRestart: () => void;
};

function GameHeader({
  label,
  moves,
  elapsedTime,
  isPaused,
  onBackToHome,
  onTogglePause,
  onRestart,
}: GameHeaderProps) {
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
        <button className="text-button" type="button" onClick={onTogglePause}>
          {isPaused ? '▶️' : '⏸️'}
        </button>
        <button className="text-button" type="button" onClick={onRestart}>
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
