'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IConversation } from "@/models/Conversation";
import { cn, formatPhoneNumber } from "@lib/utils";

export default function ConversationItem({conversation}: {conversation: IConversation}) {
    const searchParams = useSearchParams();

    const org_phone = searchParams.get("origin") || "1";
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
            className={cn(
                "flex w-full h-14 px-2 py-4 border-b border-b-gray-400 overflow-hidden cursor-pointer",
                (org_phone==conversation.organization_phone_number && user_phone==conversation.user_phone_number) && "bg-blue-400",
            )}
            onClick={() => viewConversation(conversation.user_phone_number)}
        >
            { formatPhoneNumber(conversation.user_phone_number) }
        </div>
    )
}