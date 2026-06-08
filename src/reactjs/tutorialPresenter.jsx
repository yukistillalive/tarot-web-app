import { observer } from "mobx-react-lite";
import { TutorialView } from "/src/views/tutorialView.jsx";



const Tutorial = observer(// observer needed for the presenter to update (its view) when relevant parts of the model change
     
    function Tutorial(){

            return <TutorialView />;      
    } 
);


export { Tutorial };