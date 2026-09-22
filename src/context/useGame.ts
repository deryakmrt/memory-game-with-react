import { useContext } from 'react'
import { GameContext } from './contextValue'

export function useGame() {
  const game = useContext(GameContext)

  if (!game) {
    throw new Error('useGame, GameProvider içinde kullanılmalıdır.')
  }

  return game
}