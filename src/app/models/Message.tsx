import mongoose, { Schema, model } from "mongoose";

export interface IMessage {
    _id?: string;
    sender: string;
    content: string;
    timestamp?: Date;    
}

export const MessageSchema = new Schema<IMessage>({
    sender: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);