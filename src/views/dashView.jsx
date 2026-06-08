import {
    Button,
    TextField,
    Input,
    Label,
    Select,
    SelectTrigger,
    SelectValue,
    SelectIndicator,
    SelectPopover,
    ListBox,
    ListBoxItem,
    PopoverRoot,
    PopoverTrigger,
    PopoverContent,
    PopoverDialog,
} from '@heroui/react';
import TextType from './TextType';

export function DashView(props) {

    return (
        
        <div className="flex flex-col items-center gap-8 p-8">

            <div className="relative w-full max-w-lg min-h-24 flex items-center justify-center py-6">

                <TextType
                    text={["The cards know your fate...", "Ask, and the spirits shall answer...", "Fill in the question,", "Pick a spread type,", "Then get your reading..."]}
                    typingSpeed={90}
                    pauseDuration={2500}
                    showCursor
                    cursorCharacter="_"
                    cursorClassName="text-gray-800"
                    cursorBlinkDuration={0.6}
                    deletingSpeed={40}
                    textColors={["#1f2937", "#1f2937", "#1f2937"]}
                    className="text-2xl font-bold tracking-widest text-center"
                />
                {/* <PopoverRoot>
                    <PopoverTrigger className="absolute top-0 right-0 w-7 h-7 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center cursor-pointer">
                        i
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverDialog className="p-3 text-sm max-w-xs">
                            Fill in the question, pick a spread type, then click Divine to get your reading.
                        </PopoverDialog>
                    </PopoverContent>
                </PopoverRoot> */}
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm">
                <TextField isRequired
                    value={props.divineQuery}
                    onChange={props.onSearchTextChanged}
                    className="w-full"
                >
                    <Label className="text-sm font-medium mb-1 block">Your question</Label>
                    <Input
                        placeholder={props.defaultPrompt}
                        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </TextField>

                <Select isRequired
                    selectedKey={props.divineType || null}
                    onSelectionChange={props.onOptionSelected}
                    className="w-full"
                >
                    <Label className="text-sm font-medium mb-1 block">Spread type</Label>
                    <SelectTrigger className="w-full">
                        <SelectValue>
                            {({ selectedText, isPlaceholder }) => isPlaceholder ? "Choose a type" : selectedText}
                        </SelectValue>
                        <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover>
                        <ListBox>
                            {props.divineTypeOptions.map(type =>
                                <ListBoxItem key={type} id={type} textValue={type}>{type}</ListBoxItem>
                            )}
                        </ListBox>
                    </SelectPopover>
                </Select>

                <Button
                    className="w-full bg-gray-800 text-white hover:bg-gray-700"
                    isDisabled={!props.divineQuery || !props.divineType}
                    onPress={onSearchClickedACB}
                >
                    Get Your Reading
                </Button>
            </div>
        </div>
    );

    function onSearchClickedACB() {
        props.onSearchClicked();
    }
}