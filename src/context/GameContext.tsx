import { createContext, type ReactNode } from 'react'
import useMemoryGame from '../hooks/useMemoryGame'
import type { Difficulty } from '../types/game'

//useMemoryGame hook'unun döndürdüğü tüm veri ve fonksiyon tiplerini otomatik alıyo
export type GameContextValue = ReturnType<typeof useMemoryGame>
//context kanalını burada oluşturuyoruz (artık contextValue.ts ye gerek kalmadı)
export const GameContext = createContext<GameContextValue | null>(null)

interface GameProviderProps {
  pairCount: number
  difficulty: Difficulty
  children: ReactNode
}

export function GameProvider({ pairCount, difficulty, children }: GameProviderProps) {
  // Reducer tabanlı oyun hook'unu global erişim için provider'a bağlar.
  const game = useMemoryGame(pairCount, difficulty)

  return (
    <GameContext.Provider value={game}>
      {children}
    </GameContext.Provider>
  )
}