import { cn } from "@lib/utils";

export default function ChatBubble({origin, children}: {origin?: string; children: React.ReactNode;}) {
    return(
        <div
            className={cn(
                "bg-red-400 p-2 max-w-3/4 rounded-lg",
                { "bg-green-300 self-end text-right": origin === 'user' },
                { "bg-gray-300 self-start": origin === 'chatbot' },
            )}
        >
            {children}
        </div>
    )
}