import { useContext } from 'react'
import { GameContext } from './GameContext'

export function useGame() {
  const game = useContext(GameContext)

  if (!game) {
    throw new Error('useGame hook\'u GameProvider sarmalı içinde kullanılmalıdır!')
  }

  return game
}