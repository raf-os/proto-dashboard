import connectDB from "@/lib/database";
import { populateDatabase } from "@/lib/actions";

export async function GET() {
    await connectDB();

    const res = await populateDatabase();

    return Response.json({message: res});
}