import ConversationItem from "@/ui/chat-list/conv-item";
import { IConversation } from "@/models/Conversation";
import { headers } from "next/headers";

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
    });

    if (!conversations_request.ok) {
        return (
            <>ERROR LOL</>
        )
    }

    const conversations = await conversations_request.json().then((res) => res.conversations);

    return (
        <>
            {conversations && conversations.map((conversation: IConversation) => (
                <ConversationItem key={ conversation._id } conversation={conversation} />
            ))}

            {conversations.length===0 && "No conversations to display"}
        </>
    )
}  