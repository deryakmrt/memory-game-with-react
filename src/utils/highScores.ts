import type { Difficulty } from "../types/game";

export type BestRecord = {
    elapsedTime: number
    moves: number
    date: string
}

export type HighScores = Partial<Record<Difficulty, BestRecord>>

const STORAGE_KEY = 'high_score'

export function loadHighScores(): HighScores{
    try{
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : {}
    }
    catch{
        return {}
    }
}

export function saveHighScore (scores: HighScores) : void{
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
    } catch (error) {
    console.error('Rekor kaydedilemedi: ', error)        
    }
}