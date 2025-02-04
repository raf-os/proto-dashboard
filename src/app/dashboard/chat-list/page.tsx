import ConversationItem from "@/ui/chat-list/conv-item";
import ChatBubble from "@/ui/chat-list/chat-bubble";
import ConversationFilter from "@/ui/chat-list/filter";

export default async function ChatListPage(props: {
    searchParams?: Promise<{
        origin?: string;
        instance?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const origin = searchParams?.origin || "1";

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <ConversationFilter />

            <div className="section-table flex-1 flex-row gap-4 overflow-hidden">
                <div className="flex flex-0 w-64 bg-white">
                    <ConversationItem />
                </div>

                <div className="flex flex-col flex-1 p-4 gap-4 bg-white overflow-x-hidden overflow-y-scroll">
                    <ChatBubble origin="bot">
                        Sample bot message
                    </ChatBubble>

                    <ChatBubble origin="user">
                        Sample user message
                    </ChatBubble>
                </div>
            </div>
        </div>
    )
}