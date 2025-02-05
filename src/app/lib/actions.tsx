'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@root/auth";
import { AuthError } from "next-auth";
import connectDB from "@/lib/database";
import Message from "@/models/Message";
import Conversation, { IConversation } from "@/models/Conversation";
import { HydratedDocument } from "mongoose";

interface IConversationListRequestParams {
    organization_id?: string;
    organization_phone: string;
}

interface IConversationRequestParams {
    user_phone: string;
    organization_phone: string;
    organization_id?: string;
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Unknown error occured.';
            }
        }
        throw error;
    }
}

export async function fetchConversations(params: IConversationListRequestParams) {
    // TODO: Implementar funcao final
    return testFetchConversations(params);
}

async function testFetchConversations(params: IConversationListRequestParams) {
    const origin = params?.organization_phone || "1";

    await connectDB();

    try {
        const conversations = await Conversation.aggregate([
            { $match: { 'origin': origin } },
            { $sort: { 'date': -1 } },
        ]);
        return conversations;
    } catch(e) {
        console.log(e);
        return;
    }
}

export async function populateDatabase() {
    // TEST FUNCTION, ERASE WHEN DONE!!
    await connectDB();

    await Message.deleteMany({});
    await Conversation.deleteMany({});

    const prototype_conversation: IConversation = {
        origin: "1",
        user: "1234",
    }

    try {
        await Conversation.create(prototype_conversation);
        return 'success';
    }
    catch(e) {
        return 'no good';
    }
}