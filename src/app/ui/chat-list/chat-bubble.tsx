import clsx from "clsx";

export default function ChatBubble({origin, children}: {origin?: string; children: React.ReactNode;}) {
    return(
        <div
            className={clsx(
                origin=='user' && "bg-green-400 self-end text-right",
                origin=='bot' && "bg-gray-400 self-start",
                (origin!='user' && origin!='bot') && "bg-red-400",
                "p-2 w-3/4 rounded-lg",
            )}
        >
            {children}
        </div>
    )
}