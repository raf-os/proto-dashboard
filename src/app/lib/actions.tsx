'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@root/auth";
import { AuthError } from "next-auth";
import connectDB from "@/lib/database";
import Message, { IMessage } from "@/models/Message";
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

export async function fetchConversationDetail(params: IConversationRequestParams) {
    // TODO: Implementar funcao final
    return testFetchConversationDetail(params);
}

export async function testFetchConversationDetail(params: IConversationRequestParams) {
    const org_id = params?.organization_id || "1";

    await connectDB();

    try {
        const conversation = await Conversation.aggregate([
            { $match: { 'origin': params.organization_phone, 'user': params.user_phone, } },
            { $project: { 'content': 1 } },
        ]);
        return conversation;
    } catch(e) {
        console.log(e);
        return;
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
            { $project: { 'content': 0 } },
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

    const prototype_messages: IMessage[] = [
        { sender: "user", content: "asdf 1234", },
        { sender: "bot", content: "Acknowleged. Exterminating the human race.", },
    ];

    const prototype_conversation: IConversation = {
        origin: "1",
        user: "1234",
    };

    try {
        const conversation = new Conversation(prototype_conversation);
        prototype_messages.map((msg) => { conversation.content.addToSet(msg) });
        await conversation.save();
        return 'success';
    }
    catch(e) {
        return 'no good';
    }
}