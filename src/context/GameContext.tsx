import { createContext, type ReactNode } from 'react'
import useMemoryGame from '../hooks/useMemoryGame'

//useMemoryGame hook'unun döndürdüğü tüm veri ve fonksiyon tiplerini otomatik alıyo
export type GameContextValue = ReturnType<typeof useMemoryGame>
//context kanalını burada oluşturuyoruz (artık contextValue.ts ye gerek kalmadı)
export const GameContext = createContext<GameContextValue | null>(null)

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
