import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import GameHeader from '../components/GameHeader'
import GameResultModal from '../components/GameResultModal'
import type { Difficulty, DifficultySettings } from '../types/game'
import { difficultySettings } from '../data/difficultySettings'
import { GameProvider } from '../context/GameContext'
import { useGame } from '../context/useGame'

function Game() {
  const navigate = useNavigate()
  const { difficulty } = useParams<{ difficulty: Difficulty }>()
  const settings = difficulty ? difficultySettings[difficulty] : undefined
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    if (!settings && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true
      window.alert('Geçersiz zorluk seviyesi. Ana sayfaya yönlendiriliyorsunuz.')
      navigate('/', { replace: true })
    }
  }, [navigate, settings])

  if (!settings) return null

  return (
    <GameProvider pairCount={settings.pairCount}>
      <GameContent settings={settings} />
    </GameProvider>
  )
}

interface GameContentProps {
  settings: DifficultySettings
}

function GameContent({ settings }: GameContentProps) {
  const navigate = useNavigate()
  const game = useGame()

  return (
    <main className="game-page">
      <GameHeader
        label={settings.label}
        moves={game.moves}
        elapsedTime={game.elapsedTime}
        isPaused={game.isPaused}
        onBackToHome={() => navigate('/')}
        onTogglePause={game.togglePause}
        onRestart={game.restartGame}
      />
      <GameBoard
        cards={game.cards}
        columns={settings.columns}
        countdown={game.countdown}
        gameStarted={game.gameStarted}
        isPaused={game.isPaused}
        isChecking={game.isChecking}
        onCardClick={game.handleCardClick}
      />
      {game.isFinished && (
        <GameResultModal
          moves={game.moves}
          elapsedTime={game.elapsedTime}
          onRestart={game.restartGame}
          onBackToHome={() => navigate('/')}
        />
      )}
    </main>
  )
}

export default Game