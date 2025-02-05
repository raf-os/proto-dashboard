import { NextRequest, NextResponse } from "next/server";
import { fetchConversations } from "@/lib/actions";

export const revalidate = 60;

export async function POST(request: Request) {
    const rBody = await request.json();

    const conversations = await fetchConversations(rBody);
    if (!conversations) {
        console.log("error, dumbass");
        return Response.json({
            status: 'error',
            message: 'Error fetching conversations.',
        });
    }

    return Response.json({ conversations });
}