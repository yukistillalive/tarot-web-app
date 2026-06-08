import { Avatar, Button } from "@heroui/react";

export function HeadbarView(props){
    const navItems = [
        { label: "Tutorial", onPress: props.onTutorialClick },
        { label: "Library", onPress: props.onLibraryClick },
        { label: "History", onPress: props.onHistoryClick },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:h-16 sm:flex-nowrap sm:px-6 sm:py-0">
                <Button
                    variant="ghost"
                    onPress={props.onLogoClick}
                    className="flex shrink-0 items-center gap-2 rounded-lg px-2 text-gray-950"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
                        T
                    </span>
                    <span className="text-base font-semibold tracking-wide">Tarot</span>
                </Button>

                <nav aria-label="Primary" className="ml-auto flex flex-wrap items-center justify-end gap-1 sm:gap-2">
                    {navItems.map(renderNavItemACB)}

                    <Button
                        variant="ghost"
                        isIconOnly
                        size="sm"
                        onPress={props.onProfileClick}
                        aria-label="Profile"
                        className="h-10 w-10 rounded-full p-0"
                    >
                        <Avatar size="sm" variant="soft" color="accent">
                            <Avatar.Image
                                src={props.photoURL || "https://ui-avatars.com/api/?name=U&background=555&color=fff&size=32"}
                                alt="avatar"
                            />
                            <Avatar.Fallback>U</Avatar.Fallback>
                        </Avatar>
                    </Button>
                </nav>
            </div>
        </header>
    );

    function renderNavItemACB(item) {
        return (
            <Button
                key={item.label}
                variant="ghost"
                size="sm"
                onPress={item.onPress}
                className="rounded-lg px-2 text-sm font-medium text-gray-600 hover:text-gray-950 sm:px-3"
            >
                {item.label}
            </Button>
        );
    }
}
