'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function ConversationItem({conversation}: {conversation: any}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const viewConversation = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('client', term);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div
            key={ conversation._id }
            className="w-full h-14 px-2 py-4 border-b border-b-gray-400 overflow-hidden cursor-pointer"
            onClick={() => viewConversation(conversation.user)}
        >
            { conversation.user }
        </div>
    )
}