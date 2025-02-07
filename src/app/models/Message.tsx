import mongoose, { Schema, model } from "mongoose";

export interface ISender {
    sender_id?: string;
    sender_type: string;
};

export interface IMessage {
    _id?: string;
    sender: ISender;
    content: string;
    timestamp?: Date;    
};

export const SenderSchema = new Schema<ISender>({
    sender_id: String,
    sender_type: {type: String, required: true},
}, {
    _id: false,
});

export const MessageSchema = new Schema<IMessage>({
    sender: SenderSchema,
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);