import connectDB from "@/lib/database";
import Message from "@/models/Message";
import Conversation from "@/models/Conversation";
import { populateDatabase } from "@/lib/actions";

export async function GET() {
    await connectDB();

    const res = await populateDatabase();

    return Response.json({message: res});
}