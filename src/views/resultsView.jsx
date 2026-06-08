import "/src/style.css";
import { TiltCard } from "./TiltCard.jsx";

export function ResultsView(props) {
    if (props.error) return <div className="results-error">{props.error}</div>;
    if (!props.cards || props.cards.length === 0) return null;

    return (
        <div className="results-view">
            <h2 className="results-title">Fate has been revealed...</h2>
            <div className="tarot-cards-container">
                {props.cards.map(renderCardACB)}
            </div>
            <div className="tarot-interpretation">
                <h3 className="results-title">interpretation</h3>
                <p>{props.interpretation}</p>
            </div>
        </div>
    );

    function renderCardACB(card) {
        function onClickACB() {
            props.onCardClicked(card);
        }
        return (
            <div key={card.position} className={card.cardId ? "tarot-card-link" : ""} onClick={onClickACB}>
                <TiltCard className="tarot-card">
                    <img
                        className="card-image"
                        src={card.image}
                        alt={card.name}
                        style={{ transform: card.orientation === "reversed" ? "rotate(180deg)" : "none" }}
                    />
                    <div className="card-name">{card.name}</div>
                    <div className={`card-orientation ${card.orientation}`}>
                        {card.orientation === "upright" ? "☼ Upright" : "☽ Reversed"}
                    </div>
                </TiltCard>
            </div>
        );
    }
}
