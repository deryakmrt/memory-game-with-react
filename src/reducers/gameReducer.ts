import type { CardType } from '../types/game'
import createDeck from '../utils/createDeck'

export interface GameState {
    cards: CardType[]
    selectedCardIds: number[]
    moves: number
    countdown: number | null
    gameStarted: boolean
    isPaused: boolean
    elapsedTime: number
    gameRound: number
}

export function createInitialState(pairCount: number): GameState {
    return {
        cards: createDeck(pairCount),
        selectedCardIds: [],
        moves: 0,
        countdown: 3,
        gameStarted: false,
        isPaused: false,
        elapsedTime: 0,
        gameRound: 0,
    }
}

export type GameAction =
    | { type: 'SELECT_CARD'; cardId: number }
    | { type: 'RESOLVE_MATCH'; firstCardId: number; secondCardId: number }//iki kartı karşılaştırıp sonucu uygulama
    | { type: 'TICK_COUNTDOWN' }// geri sayımı azaltma
    | { type: 'TICK_TIMER' }
    | { type: 'TOGGLE_PAUSE' }
    | { type: 'RESTART_GAME'; pairCount: number }

export function gameReducer(
    state: GameState,
    action: GameAction,
): GameState {
    switch (action.type) {
        case 'TICK_TIMER':
            // Oyun devam ederken geçen süreyi bir saniye artırır.
            if (!state.gameStarted || state.isPaused) return state

            return {
                ...state,
                elapsedTime: state.elapsedTime + 1,
            }

        case 'TICK_COUNTDOWN':
            // Geri sayım bittiyse sayacı kapatır ve oyunu başlatır.
            if (state.countdown === null || state.countdown <= 1) {
                return {
                    ...state,
                    countdown: null,
                    gameStarted: true,
                    isPaused: false,
                }
            }
            // Geri sayım devam ediyorsa değeri bir azaltır.
            return {
                ...state,
                countdown: state.countdown - 1,
            }

        case 'SELECT_CARD': {
            const card = state.cards.find((currentCard) => currentCard.id === action.cardId)

            if (!state.gameStarted
                || state.isPaused
                || state.selectedCardIds.length >= 2
                || !card
                || card.isMatched
                || card.isFlipped
            ) {
                return state
            }

            // Daha önce seçilen kartların yanına yeni kartın ID'sini ekler.
            const selectedCardIds = [...state.selectedCardIds, action.cardId]

            return {
                ...state,
                // Sadece tıklanan kartı açık hale getirir.
                cards: state.cards.map((card) =>
                    card.id === action.cardId
                        ? { ...card, isFlipped: true }
                        : card,
                ),
                // Yeni seçilen kartı seçili kartlar listesine kaydeder.
                selectedCardIds,
                // İki kart seçildiyse bir hamle tamamlanmış olur.
                moves:
                    selectedCardIds.length === 2
                        ? state.moves + 1
                        : state.moves,
            }
        }

        case 'RESOLVE_MATCH': {
            // Seçilen iki kartı kart dizisinin içinden bulur.
            const firstCard = state.cards.find(
                (card) => card.id === action.firstCardId,
            )
            const secondCard = state.cards.find(
                (card) => card.id === action.secondCardId,
            )

            const hasSelectedCards =
                state.selectedCardIds.length === 2 &&
                state.selectedCardIds.includes(action.firstCardId) &&
                state.selectedCardIds.includes(action.secondCardId)

            // Yalnızca o anda seçili olan iki farklı kart çözülebilir.
            if (
                !hasSelectedCards ||
                action.firstCardId === action.secondCardId ||
                !firstCard ||
                !secondCard
            ) {
                return state
            }

            // Aynı pairId'ye sahip kartlar birbirinin eşidir.
            const isMatch = firstCard.pairId === secondCard.pairId

            return {
                ...state,
                selectedCardIds: [],
                // Eşleşen kartları açık ve eşleşmiş bırakır.
                // Eşleşmeyen kartları tekrar kapatır.
                cards: state.cards.map((card) => {
                    const isSelectedCard =
                        card.id === action.firstCardId ||
                        card.id === action.secondCardId

                    if (!isSelectedCard) return card

                    return {
                        ...card,
                        isFlipped: isMatch,
                        isMatched: isMatch,
                    }
                }),
            }
        }

        case 'TOGGLE_PAUSE':
            if (!state.gameStarted) return state

            return {
                ...state,
                isPaused: !state.isPaused,
            }

        case 'RESTART_GAME':
            // Yeni bir deste ve başlangıç değerleri oluşturur.
            return {
                ...createInitialState(action.pairCount),
                // Yeni tur başladığı için countdown effect'ini yeniden tetikler.
                gameRound: state.gameRound + 1,
            }

        default:
            // Tanınmayan action gelirse mevcut state'i korur.
            return state
    }
}