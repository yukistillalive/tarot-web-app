import { Card, Chip } from "@heroui/react";

export function HistoryView(props) {

    if (!props.historyRecords || props.historyRecords.length === 0) {
        return <div className="flex justify-center items-center h-40 text-gray-400">No history yet.</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-6 max-w-3xl mx-auto">
            {props.historyRecords.map(renderRecordACB)}
        </div>
    );

    function renderRecordACB(record) {
        function onClickACB() {
            props.onRecordClicked(record);
        }
        return (
            <Card key={record.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={onClickACB}>
                <div className="flex gap-2 mb-2">
                    <Chip size="sm">{record.date}</Chip>
                    <Chip size="sm" color="secondary" variant="flat">{record.type}</Chip>
                </div>
                <div className="text-sm font-medium mb-3">{record.question}</div>
                <div className="flex flex-wrap gap-3">
                    {record.cards && record.cards.map(renderCardACB)}
                </div>
            </Card>
        );
    }

    function renderCardACB(card) {
        return (
            <div key={card.position} className="flex flex-col items-center w-24 gap-1">
                {card.image ? (
                    <img
                        src={card.image}
                        alt={card.name}
                        className="w-full rounded-md shadow-sm"
                        style={{ transform: card.orientation === "reversed" ? "rotate(180deg)" : "none" }}
                    />
                ) : (
                    <div className="w-full h-32 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        no image
                    </div>
                )}
                <span className="text-xs text-center font-medium leading-tight">{card.name}</span>
                <Chip
                    size="sm"
                    color={card.orientation === "upright" ? "success" : "warning"}
                    variant="flat"
                >
                    {card.orientation === "upright" ? "Upright" : "Reversed"}
                </Chip>
            </div>
        );
    }
}
