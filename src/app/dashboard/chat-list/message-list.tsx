import ChatBubble from "@/ui/chat-list/chat-bubble";
import { IMessage } from "@/models/Message";
import { headers } from "next/headers";
import { Suspense } from "react";

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
                organization_phone_number: org_phone,
                user_phone_number: user_phone,
            }),
            cache: 'force-cache',
        });

        if (!req.ok) {
            return (
                <>
                    Error fetching messages
                </>
            )
        }

        const conversation = await req.json().then((res) => res.conversations);
        if (conversation.length > 0) {
            content = (
                <>
                {conversation.map((msg: IMessage) => (
                    <Suspense key={msg._id}>
                        <ChatBubble origin={msg.sender.sender_type}>
                            { msg.content }
                        </ChatBubble>
                    </Suspense>
                    ))
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