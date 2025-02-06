import ChatBubble from "@/ui/chat-list/chat-bubble";
import { IMessage } from "@/models/Message";
import { headers } from "next/headers";

export default async function MessageList({ org_phone, user_phone }: { org_phone: string; user_phone?: string}) {
    let content = null;
    if (user_phone) {
        const host = await headers().then((res) => res.get("host"));
        const protocol = process?.env.NODE_ENV==="development"?"http":"https";
        const req = await fetch(`${protocol}://${host}/api/test/fetch-conversation-detail/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                organization_phone: org_phone,
                user_phone: user_phone,
            }),
        });

        if (!req.ok) {
            return (
                <>
                    ERROR LOL
                </>
            )
        }

        const conversation = await req.json().then((res) => res.conversations);
        if (conversation.length > 0) {
            content = (
                <>
                {conversation[0].content.map((msg: IMessage) => (
                    <ChatBubble key={msg._id} origin={msg.sender}>
                        { msg.content }
                    </ChatBubble>))
                }
                </>
            );
        }
    }

    return (
        <>
            { content }
        </>
    )
}