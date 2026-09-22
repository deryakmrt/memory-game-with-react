export type Difficulty = 'easy' | 'medium' | 'hard'

export type CardType = {
  id: number
  pairId: number
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

export type DifficultySettings = {
  label: string
  detail: string
  pairCount: number
  columns: number
}