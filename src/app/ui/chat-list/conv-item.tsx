'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IConversation } from "@/models/Conversation";
import clsx from "clsx";

export default function ConversationItem({conversation}: {conversation: IConversation}) {
    const searchParams = useSearchParams();

    const org_phone = searchParams.get("origin");
    const user_phone = searchParams.get("client");

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
            className={clsx(
                "w-full h-14 px-2 py-4 border-b border-b-gray-400 overflow-hidden cursor-pointer",
                (org_phone==conversation.origin && user_phone==conversation.user) && "bg-blue-400",
            )}
            onClick={() => viewConversation(conversation.user)}
        >
            { conversation.user }
        </div>
    )
}