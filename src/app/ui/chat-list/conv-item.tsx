'use client';

import { useSearchParams } from "next/navigation";

export default function ConversationItem({conversation}: {conversation: any}) {
    return (
        <div key={ conversation._id } className="w-full h-14 px-2 py-4 border-b border-b-gray-400 overflow-hidden cursor-pointer">
            { conversation.user }
        </div>
    )
}