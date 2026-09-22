import { createContext } from 'react'
import type { GameContextValue } from './gameContextTypes'

export const GameContext = createContext<GameContextValue | null>(null)
//Bu dosyada context’in kendisi oluşturulur