import mongoose, { Schema, model } from "mongoose";
import { MessageSchema, IMessage } from "./Message";

export interface IConversation {
    _id?: string;
    origin: string;
    user: string;
    date?: Date;
    content?: IMessage;
}

const ConversationSchema = new Schema<IConversation>({
    origin: String,
    user: String,
    date: { type: Date, default: Date.now },
    content: [MessageSchema],
});

export default mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", ConversationSchema);