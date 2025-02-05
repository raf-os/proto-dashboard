import { fetchConversationDetail } from "@/lib/actions";

export const revalidate = 60;

export async function POST(request: Request) {
    const rBody = await request.json();

    const conversations = await fetchConversationDetail(rBody);
    if (!conversations) {
        return Response.json({
            status: 'error',
            message: 'Error fetching conversations.',
        });
    }

    return Response.json({ conversations });
}