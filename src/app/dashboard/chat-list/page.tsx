import ConversationList from "./conversation-list";
import MessageList from "./message-list";
import ConversationFilter from "@/ui/chat-list/filter";

export default async function ChatListPage(props: {
    searchParams?: Promise<{
        origin?: string;
        client?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const origin = searchParams?.origin || "1";

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <ConversationFilter />

            <div className="section-table flex-1 flex-row gap-4 overflow-hidden">
                <ConversationList org_phone={origin} />

                <MessageList org_phone={origin} user_phone={ searchParams?.client } />
            </div>
        </div>
    )
}