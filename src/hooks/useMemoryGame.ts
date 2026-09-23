import { useEffect, useReducer } from 'react'
import {
    createInitialState,
    gameReducer,
} from '../reducers/gameReducer'

function useMemoryGame(pairCount: number) {
    // Oyunun bütün state'leri reducer üzerinden yönetilir.
    const [state, dispatch] = useReducer(
        gameReducer,
        pairCount,
        createInitialState,
    )

    const isChecking = state.selectedCardIds.length === 2
    const isFinished =
        state.cards.length > 0 && state.cards.every((card) => card.isMatched)
    //kart dizisi boş değilse ve bütün kartlar eşlenmişse oyun biter

    useEffect(() => {
        // Countdown bittiyse yeni interval oluşturulmaz.
        if (state.countdown === null) return

        const timer = window.setInterval(() => {
            dispatch({ type: 'TICK_COUNTDOWN' })
        }, 1000)

        return () => window.clearInterval(timer)
    }, [state.countdown, state.gameRound])


    useEffect(() => {
        // Oyun başlamadıysa veya bittiyse süre çalışmaz.
        if (!state.gameStarted || isFinished) return

        const timer = window.setInterval(() => {
            dispatch({ type: 'TICK_TIMER' })
        }, 1000)

        return () => window.clearInterval(timer)
    }, [state.gameStarted, isFinished])

    useEffect(() => {
        // İki kart seçilmeden eşleşme kontrolü yapılmaz.
        if (state.selectedCardIds.length !== 2) return

        const [firstCardId, secondCardId] = state.selectedCardIds

        const firstCard = state.cards.find((card) => card.id === firstCardId)
        const secondCard = state.cards.find((card) => card.id === secondCardId)

        const isMatch = firstCard?.pairId === secondCard?.pairId//iki kartın pairId si eşse ismatch true

        const timer = window.setTimeout(() => {
            dispatch({
                type: 'RESOLVE_MATCH',
                firstCardId,
                secondCardId,
            })
        }, isMatch ? 350 : 800)

        return () => window.clearTimeout(timer)
    }, [state.cards, state.selectedCardIds])

    function handleCardClick(cardId: number) {
        dispatch({ type: 'SELECT_CARD', cardId })
    }

    function restartGame() {
        dispatch({ type: 'RESTART_GAME', pairCount })
    }

    return {
        cards: state.cards,
        selectedCardIds: state.selectedCardIds,
        moves: state.moves,
        countdown: state.countdown,
        gameStarted: state.gameStarted,
        elapsedTime: state.elapsedTime,
        isChecking,
        isFinished,
        handleCardClick,
        restartGame,
    }
}
export default useMemoryGame