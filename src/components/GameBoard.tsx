import Card from "./Card";
import { useGame } from "../context/useGame";

type GameBoardProps = { columns: number };

function GameBoard({ columns }: GameBoardProps) {
  const {
    cards,
    countdown,
    gameStarted,
    isPaused,
    isChecking,
    handleCardClick,
  } = useGame();
  return (
    <section className="board">
      <div
        className={`board-grid ${countdown !== null || isPaused ? "board-grid--blurred" : ""}`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isPaused={isPaused}
            disabled={!gameStarted || isPaused || isChecking}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {countdown !== null && (
        <div className="countdown-overlay" aria-live="polite">
          <span>{countdown}</span>
        </div>
      )}
      {isPaused && (
        <div className="pause-overlay" aria-live="polite">
          <span>Oyun duraklatıldı</span>
        </div>
      )}
    </section>
  );
}

export default GameBoard;
