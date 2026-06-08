import { observer } from "mobx-react-lite";
import { DetailsView } from "/src/views/detailsView.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCardDetails } from "/src/cardSource.js";

const Details = observer(
    function Details(props) {
        const { cardId } = useParams();
        const [cardData, setCardData] = useState(null);
        const [loading, setLoading] = useState(false);
        const [cardError, setCardError] = useState(null);

        useEffect(lifecycleACB, []);
        useEffect(fetchCardACB, [cardId]);

        function lifecycleACB() {
            console.log("Details component is born.");
            return function takeDownACB() { console.log("Details component is taken down."); };
        }
        function fetchCardACB() {
            if (!cardId) return;
            let cancelled = false;
            setLoading(true);
            setCardData(null);
            setCardError(null);
            getCardDetails(cardId)
                .then(function resolvedACB(data) {
                    if (!cancelled) {
                        setCardData(data);
                        setLoading(false);
                    }
                })
                .catch(function rejectedACB(err) {
                    if (!cancelled) {
                        setCardError(err.message || String(err));
                        setLoading(false);
                    }
                });
            return function cancelACB() { cancelled = true; };
        }

        return (
            <DetailsView
                cardData={cardData}
                loading={loading}
                error={cardError}
                cardId={cardId}
                cardImage={props.model.getCardImage(cardId)}
            />
        );
    }
);

export { Details };
