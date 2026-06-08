export function ApiTestView(props) {

    if (props.error) {
        return <div>Error: {props.error}</div>;
    }

    if (!props.cards || props.cards.length === 0) {
        return <div>No data yet. Trigger a divination first.</div>;
    }

    return (
        <div>
            <h2>API Test</h2>
            <ul>
                {props.cards.map(renderCardACB)}
            </ul>
            <p><strong>Interpretation:</strong> {props.interpretation}</p>
        </div>
    );

    function renderCardACB(card) {
        return (
            <li key={card.position}>
                #{card.position} {card.name} ({card.orientation})
                <br />
                <img src={"/tarot-images/" + card.image} alt={card.name} width="80" />
            </li>
        );
    }
}
