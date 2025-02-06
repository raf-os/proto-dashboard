import ConversationList from "./conversation-list";
import MessageList from "./message-list";
import ConversationFilter from "@/ui/chat-list/filter";
import { Suspense } from "react";

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
                <div className="flex flex-col flex-0 w-64 bg-white">
                    <Suspense>
                        <ConversationList org_phone={origin} />
                    </Suspense>
                </div>

                <div className="flex flex-col flex-grow justify-end flex-shrink-0 p-4 gap-4 bg-white overflow-x-hidden overflow-y-scroll">
                    <Suspense>
                        <MessageList org_phone={origin} user_phone={ searchParams?.client } />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}