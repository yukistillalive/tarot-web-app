import { observer } from "mobx-react-lite";
import { ApiTestView } from "../views/apiTestView.jsx";

const ApiTest = observer(
    function ApiTest(props) {
        return (
            <ApiTestView
                cards={props.model.cards}
                positions={props.model.positions}
                interpretation={props.model.interpretation}
                error={props.model.error}
            />
        );
    }
);

export { ApiTest };
