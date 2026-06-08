import { observer } from "mobx-react-lite";
import { ResultsView } from "../views/resultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getCardId } from "/src/cardMap.js";
import { useState, useEffect } from "react";

const Results = observer(
    function Results(props) {
        const navigate = useNavigate();
        const { recordId } = useParams();
        const [readingData, setReadingData] = useState(null);
        const [readingError, setReadingError] = useState(null);

        useEffect(lifecycleACB, []);
        useEffect(resolveReadingACB, [props.model.divinePromise.promise]);

        function lifecycleACB() {
            console.log("Results component is born.");
            return function takeDownACB() { console.log("Results component is taken down."); };
        }
        function resolveReadingACB() {
            const promise = props.model.divinePromise.promise;
            if (!promise) return;
            let cancelled = false;
            promise
                .then(function resolvedACB(d) { if (!cancelled) setReadingData(d); })
                .catch(function rejectedACB(e) { if (!cancelled) setReadingError(e); });
            return function cancelACB() { cancelled = true; };
        }
        function onCardClickedACB(card) {
            const cardId = getCardId(card.name);
            if (!cardId) return;
            navigate(`/details/${cardId}`);
        }

        // use processed data from model
        if (readingData) {
            return (
                <ResultsView
                    cards={props.model.cards}
                    positions={props.model.positions}
                    interpretation={props.model.interpretation}
                    error={null}
                    onCardClicked={onCardClickedACB}
                />
            );
        }

        // Reading failed
        if (readingError) {
            return <SuspenseView promise={null} error={readingError} />;
        }

        // Reading in progress (promise set but not resolved yet)
        if (props.model.divinePromise.promise) {
            return <SuspenseView promise={props.model.divinePromise.promise} error={null} />;
        }

        // Restore reading by URL id
        if (recordId) {
            const record = props.model.historyRecords.find(
                function findRecordACB(r) { return String(r.id) === recordId; }
            );
            if (record) {
                return (
                    <ResultsView
                        cards={record.cards}
                        positions={record.positions}
                        interpretation={record.interpretation}
                        error={null}
                        onCardClicked={onCardClickedACB}
                    />
                );
            }
            // historyRecords not yet loaded from Firestore
            if (props.model.historyRecords.length === 0) {
                return <SuspenseView promise={{}} error={null} />;
            }
        }

        return <SuspenseView promise={null} error={null} />;
    }
);

export { Results };
