import "/src/style.css"

export function LibraryView(props){
    
    //return <div>LibraryView 已经渲染出来了！</div>;
    return(
        <div className="LibraryView">
            {props.allTarots.map(LibraryDisplayCB)}
        </div>
        
       
    )

    function LibraryDisplayCB(result){

        function clickInterestTarotACB(){
            props.onDetailsToSee(result);
        }

        return <div onClick={clickInterestTarotACB} key={result.name} className="card-item">
                   <img src={result.image} height="150" ></img>
                   <div className="lcard-name">{result.name}</div>
               </div>
    }

    



}
