import type { CardType } from '../types/game'
import Card from './Card'

type GameBoardProps = {
  cards: CardType[]
  columns: number
  countdown: number | null
  gameStarted: boolean
  isPaused: boolean
  isChecking: boolean
  onCardClick: (cardId: number) => void
}

function GameBoard({
  cards,
  columns,
  countdown,
  gameStarted,
  isPaused,
  isChecking,
  onCardClick,
}: GameBoardProps) {
  return (
    <section className="board">
      <div
        className="board-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isPaused={isPaused}
            disabled={!gameStarted || isPaused || isChecking}
            onClick={() => onCardClick(card.id)}
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
  )
}

export default GameBoard
