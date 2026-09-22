import { type ReactNode } from 'react'
import useMemoryGame from '../hooks/useMemoryGame'
import { GameContext } from './contextValue'

interface GameProviderProps {
  pairCount: number
  children: ReactNode
}

export function GameProvider({ pairCount, children }: GameProviderProps) {
  // Reducer tabanlı oyun hook'unu global erişim için provider'a bağlar.
  const game = useMemoryGame(pairCount)

  return (
    <GameContext.Provider value={game}>
      {children}
    </GameContext.Provider>
  )
}
