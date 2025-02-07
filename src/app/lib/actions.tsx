'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@root/auth";
import { AuthError } from "next-auth";
import connectDB from "@/lib/database";
import { IMessage, ISender } from "@/models/Message";
import Conversation, { IConversation } from "@/models/Conversation";
import { IConversationListRequestParams, IConversationRequestParams } from "@/lib/defs";

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
            { $match: { 'origin': params.organization_phone_number, 'user': params.user_phone_number, } },
            { $unwind: "$content" },
            { $replaceRoot: { newRoot: "$content" } },
            { $sort: { timestamp: -1 } }
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

    //await Message.deleteMany({});
    await Conversation.deleteMany({});

    const sender_human: ISender = {
        sender_type: "user",
    }
    const sender_bot: ISender = {
        sender_type: "chatbot",
    }

    const prototype_messages: IMessage[][] = [
        [
        { sender: sender_human, content: "Write me a romance novel between Shrek and Shadow the Hedgehog.", },
        { sender: sender_bot, content: "Acknowleged. Exterminating the human race.", },
        ], [
        { sender: sender_bot, content: "hello yes", },
        ]
    ];

    const prototype_conversation: IConversation[] = [{
        organization_phone_number: "1",
        user_phone_number: "1234",
    },{
        organization_phone_number: "1",
        user_phone_number: "2345",
    }];

    try {
        await prototype_conversation.forEach(async (value, index) => {
            const conversation = new Conversation(value);
            prototype_messages[index].map((msg) => { conversation.messages.addToSet(msg) });
            await conversation.save();
        });
        return 'success';
    }
    catch(e) {
        console.log(e);
        return 'no good';
    }
}