import formatTime from "../utils/formatTime";

type GameHeaderProps = {
  label: string;
  moves: number;
  elapsedTime: number;
  onBackToHome: () => void;
};

function GameHeader({
  label,
  moves,
  elapsedTime,
  onBackToHome,
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
      <button className="text-button" type="button" onClick={onBackToHome}>
        Ana sayfa
      </button>
    </header>
  );
}

export default GameHeader;
