import { useNavigate } from 'react-router-dom';
import { difficultySettings } from '../data/difficultySettings'

function Home() {
  const navigate = useNavigate()
  return (
    <main className="home-page">
      <div className="home-shell">
        <p className="eyebrow">Eşleştir • Hatırla • Ustalaş</p>
        <h1>Memory Game</h1>
        <p className="home-intro">Bir zorluk seç ve hafızanı test et.</p>
        <div className="difficulty-list">
        {/* difficultysetting nesnesini key-value çiftlerine çevirir.
            value: easy, medium, hard
            difficulty: ilgili label ve detail bilgileri */}
        {Object.entries(difficultySettings).map(([value, difficulty]) => (
          <button
            key={value}
            type="button"
            onClick={() => navigate(`/game/${value}`)} //seçilen zorluğa göre adres
          >
            <span>{difficulty.label}</span>
            <small>{difficulty.detail}</small>
          </button>
        ))}
        </div>
      </div>
    </main>
  );
}
export default Home;
