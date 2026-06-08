import { observer } from "mobx-react-lite";
import { LibraryView } from "/src/views/libraryView.jsx";
import { SearchFormView } from "/src/views/searchFormView.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCardId } from "/src/cardMap.js";

const Library = observer(
    function Library(props){
        const navigate = useNavigate();
        const [searchQuery, setSearchQuery] = useState("");
        const [searchType, setSearchType] = useState("");

        useEffect(lifecycleACB, []);

        function lifecycleACB() {
            console.log("Library component is born.");
            return function takeDownACB() { console.log("Library component is taken down."); };
        }

        return(
        <>
        <SearchFormView tarotTypeOptions={["Major Arcana", "Wands", "Cups", "Pentacles", "Swords"]}
                        text={searchQuery}
                        type={searchType}
                        onTextChange={setSearchQuery}
                        onTypeChange={setSearchType}
                        onTypeSearch={handlerSearchChangeACB}/>

        <LibraryView allTarots={props.model.allTarots}
                                onDetailsToSee={handlerDetailsToSeeACB}/>
        </>
        )




        function handlerDetailsToSeeACB(tarotObject){
            const cardId = getCardId(tarotObject.name);
            if (!cardId) return;
            navigate(`/details/${cardId}`);
        }

        function handlerSearchChangeACB(){
            props.model.doSearch({query: searchQuery, type: searchType});
        }
    }
);


export { Library };
