import type { Difficulty, DifficultySettings } from '../types/game'

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
	easy: {
		label: 'Kolay',
		detail: '4x4',
		pairCount: 8,
		columns: 4,
	},
	medium: {
		label: 'Orta',
		detail: '5x5',
		pairCount: 12,
		columns: 5,
	},
	hard: {
		label: 'Zor',
		detail: '6x6',
		pairCount: 18,
		columns: 6,
	},
}
