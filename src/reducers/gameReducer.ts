import type { CardType } from '../types/game'
import createDeck from '../utils/createDeck'

export interface GameState {
    cards: CardType[]
    selectedCardIds: number[]
    moves: number
    countdown: number | null
    gameStarted: boolean
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
        elapsedTime: 0,
        gameRound: 0,
    }
}

export type GameAction =
    | { type: 'SELECT_CARD'; cardId: number }
    | { type: 'RESOLVE_MATCH'; firstCardId: number; secondCardId: number }//iki kartı karşılaştırıp sonucu uygulama
    | { type: 'CLEAR_SELECTED_CARDS' }//seçimleri temizleme
    | { type: 'TICK_COUNTDOWN' }// geri sayımı azaltma
    | { type: 'START_GAME' }
    | { type: 'TICK_TIMER' }
    | { type: 'RESTART_GAME'; pairCount: number }

export function gameReducer(
    state: GameState,
    action: GameAction,
): GameState {
    switch (action.type) {
        case 'TICK_TIMER':
            // Oyun devam ederken geçen süreyi bir saniye artırır.
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
                }
            }

            // Geri sayım devam ediyorsa değeri bir azaltır.
            return {
                ...state,
                countdown: state.countdown - 1,
            }

        case 'SELECT_CARD': {
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

            // Kartlardan biri bulunamazsa mevcut state'i değiştirmez.
            if (!firstCard || !secondCard) return state

            // Aynı pairId'ye sahip kartlar birbirinin eşidir.
            const isMatch = firstCard.pairId === secondCard.pairId

            return {
                ...state,
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

        case 'CLEAR_SELECTED_CARDS':
            // Eşleşme kontrolü tamamlandıktan sonra geçici seçimleri temizler.
            // Kartların kendisine dokunmaz; eşleşen kartlar açık kalır.
            return {
                ...state,
                selectedCardIds: [],
            }

        case 'START_GAME':
            // Geri sayım tamamlandığında kartların tıklanabilmesini sağlar.
            return {
                ...state,
                gameStarted: true,
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