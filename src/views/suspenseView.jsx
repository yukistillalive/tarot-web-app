import { Alert, AlertIndicator, AlertTitle, AlertDescription } from "@heroui/react";

export function SuspenseView(props) {
    if (!props.promise) {
        return null;
    }

    if (props.error) {
        return (
            <div className="flex justify-center p-8">
                <Alert status="error" className="max-w-md">
                    <AlertIndicator />
                    <div>
                        <AlertTitle>Something went wrong</AlertTitle>
                        <AlertDescription>{props.error.toString()}</AlertDescription>
                    </div>
                </Alert>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 p-16">
            {/* 🔮 bouncing up and down */}
            <div className="text-4xl animate-bounce">🔮</div>
            {/* // "FATE IS ABOUT TO BE REVEALED" pulsing in and out */}
            <p className="text-lg font-semibold tracking-widest uppercase animate-pulse text-center">
                Fate is about to be revealed 
            </p>
            {/* Three dots bouncing in sequence (staggered with animationDelay) */}
            <div className="flex gap-2"> 
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
        </div>
    );
}
