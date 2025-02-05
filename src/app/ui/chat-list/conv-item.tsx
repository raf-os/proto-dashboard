'use client';

import { useSearchParams } from "next/navigation";
import { IConversation } from "@/models/Conversation";

export default function ConversationItem({conversation}: {conversation: IConversation}) {
    return (
        <div className="w-full h-14 px-2 py-4 border-b border-b-gray-400 overflow-hidden cursor-pointer">
            { conversation.user }
        </div>
    )
}