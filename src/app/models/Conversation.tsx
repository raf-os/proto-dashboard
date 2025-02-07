import mongoose, { Schema, model } from "mongoose";
import { MessageSchema, IMessage } from "./Message";

export interface IConversation {
    _id?: string;
    organization_id?: string;
    organization_phone_number: string;
    user_id?: string;
    user_phone_number: string;
    date?: Date;
    messages?: IMessage;
};

const ConversationSchema = new Schema<IConversation>({
    organization_id: String,
    organization_phone_number: { type: String, required: true },
    user_id: String,
    user_phone_number: { type: String, required: true },
    date: { type: Date, default: Date.now },
    messages: [MessageSchema],
});

export default mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", ConversationSchema);