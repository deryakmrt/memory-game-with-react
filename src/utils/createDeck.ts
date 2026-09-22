import type { CardType } from "../types/game";
import { icons } from "../data/icons";
import shuffle from "./shuffle";

//createDeck dışarıdan bir sayı(pairCount) alır ve kart dizisi döndürür.
function createDeck(pairCount: number): CardType[] {
    //seçilen zorluğa göre paircount alınır ve kart ayrılır
    const selectedIcons = icons.slice(0, pairCount)
    //Her ikon için birden fazla sonuç üretir ve hepsini tek diziye toplar.
    const cards: CardType[] = selectedIcons.flatMap((icon, pairId) => [
        //deste kuralları burada belirlenir
        {
            id: pairId * 2,
            pairId,
            icon,
            isFlipped: false,
            isMatched: false
        },
        {
            id: pairId * 2 + 1,
            pairId,
            icon,
            isFlipped: false,
            isMatched: false
        }
    ])
    return shuffle(cards)
}
export default createDeck