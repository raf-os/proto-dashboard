import ConversationItem from "@/ui/chat-list/conv-item";
import { IConversation } from "@/models/Conversation";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function ConversationList({ org_phone }: { org_phone: string; }) {
    const host = await headers().then((res) => res.get("host"));
    const protocol = process?.env.NODE_ENV==="development"?"http":"https";
    const conversations_request = await fetch(`${protocol}://${host}/api/test/fetch-conversations/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            organization_phone_number: org_phone,
        }),
        cache: 'force-cache',
    });

    if (!conversations_request.ok) {
        return (
            <>Error fetching conversation list</>
        )
    }

    const conversations = await conversations_request.json().then((res) => res.conversations);

    return (
        <>
            {conversations && conversations.map((conversation: IConversation) => (
                <Suspense key={ conversation._id }>
                    <ConversationItem conversation={conversation} />
                </Suspense>
            ))}

            {conversations.length===0 && "No conversations to display"}
        </>
    )
}  