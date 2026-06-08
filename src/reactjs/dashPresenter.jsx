import { observer } from "mobx-react-lite";
import { DashView } from "/src/views/dashView.jsx";



const Dash = observer(// observer needed for the presenter to update (its view) when relevant parts of the model change
     
    function Dash(props){
        const divineTypeOptions = ["Past-Present-Future", "Life Purpose", "Relationship"];
        return (
                <DashView
                    divineTypeOptions={ divineTypeOptions }
                    defaultPrompt="What are you seeking?"
                    divineType={ props.model.divineParam.type }
                    divineQuery={ props.model.divineParam.query }
                    // pass custom events to the view
                    onSearchTextChanged= { onSearchTextChangedACB }
                    onOptionSelected= { onOptionSelectedACB }
                    onSearchClicked= { onSearchClickedACB }
                />
        );

        // custom event handlers
        function onSearchTextChangedACB(input) {
            props.model.setDivineQuery(input);
            console.log("Search text changed:", input);
        }

        function onOptionSelectedACB(option) {
            props.model.setDivineType(option);
            console.log("Option selected:", option);
        }

        function onSearchClickedACB() {
            props.model.startDivination();
            window.location.hash = `#/results/${props.model.currentReadingId}`;
        }
    }
       
);


export { Dash };