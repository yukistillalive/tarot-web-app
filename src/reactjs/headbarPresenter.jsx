import { observer } from "mobx-react-lite";
import { HeadbarView } from "/src/views/headbarView.jsx";
import { useNavigate } from "react-router-dom";


const Headbar = observer(// observer needed for the presenter to update (its view) when relevant parts of the model change

    function Headbar(props){
        const navigate = useNavigate();
        const photoURL = props.model.photoURL || null;

        return <HeadbarView
            photoURL={photoURL}
            onLogoClick={() => navigate("/")}
            onTutorialClick={() => navigate("/tutorial")}
            onLibraryClick={() => navigate("/library")}
            onHistoryClick={() => navigate("/history")}
            onProfileClick={() => navigate("/profile")}
        />;

    }
);


export { Headbar };
