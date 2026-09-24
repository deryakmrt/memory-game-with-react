import type { CardType } from "../types/game";

interface CardProps{
	card: CardType
	onClick: () => void
	disabled: boolean 
	isPaused?: boolean
}

function Card({card,onClick,disabled,isPaused=false}: CardProps){
	const isVisible = card.isFlipped && !isPaused || card.isMatched //kart çevrilmişse veya eşleşmişse görünsün
	return(
		<button
		type="button"
		onClick={onClick}//butona tıklanınca gelen fonksiyonu çalıştır
		disabled={disabled}
		className={`card ${isVisible ? 'card--flipped' : ''}`}
		aria-label={isVisible ? `Kart ${card.icon}` : 'Kapalı kart'}
		>
		<span className="card__face card__face--front">{card.icon}</span>
		<span className="card__face card__face--back">?</span>
		</button>
		
	)
}
export default Card