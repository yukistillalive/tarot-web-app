import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectIndicator,
    SelectPopover,
    ListBox,
    ListBoxItem,
    Label,
    TextField,
    Input,
    Button,
} from '@heroui/react';

export function SearchFormView (props){
    return(
        //"__SearchForm__"
        //evt.target.value就是这个value
     
        <div className="search-form">
            <TextField 
                    value={props.text || ""}
                    onChange={setSearchTextACB}
                    className="w-80"
                    aria-label="text"
                >
                    
                    <Input
                        placeholder="Search cards..."
                        className="w-80"
                    />
            </TextField>
            <Select 
                    selectedKey={props.type || null}
                    onSelectionChange={setSearchTypeACB}
                    className="w-40"
                    aria-label="Tarot type"
                >
                    
                    <SelectTrigger className="w-full">
                        <SelectValue>
                        {({ selectedText, isPlaceholder }) => isPlaceholder ? "All types" : selectedText}
                        </SelectValue>
                        <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover>
                        <ListBox>
                            <ListBoxItem id="" textValue="All types">All types</ListBoxItem>
                            {props.tarotTypeOptions.map(tarotTypeTableRowCB)}
                        </ListBox>
                    </SelectPopover>
                </Select>
            <Button
                    className="w-40 bg-gray-800 text-white hover:bg-gray-700"
                    
                    onPress={searchNowACB}
                >
                    Search
            </Button>
           

        </div>


    )

    //array rendering
    function tarotTypeTableRowCB(optionString){
        return <ListBoxItem key={optionString} id={optionString} textValue={optionString}>{optionString}</ListBoxItem>
    }

    //fire custom events
    function setSearchTextACB(value){
        console.log("text changed:", value)
        props.onTextChange(value)
        
    }

    function setSearchTypeACB(key){
        
        props.onTypeChange(key ?? "")
    }

    function searchNowACB(){
        props.onTypeSearch()
    }

    


}