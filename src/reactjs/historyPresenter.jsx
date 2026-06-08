import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { HistoryView } from "/src/views/historyView.jsx";



const History = observer(// observer needed for the presenter to update (its view) when relevant parts of the model change

    function History(props){
        const navigate = useNavigate();
        return (
            <HistoryView
                historyRecords={ props.model.historyRecords }
                onRecordClicked={ onRecordClickedACB }
            />
        );

        function onRecordClickedACB(record) {
            navigate(`/results/${record.id}`);
        }
    }
);


export { History };