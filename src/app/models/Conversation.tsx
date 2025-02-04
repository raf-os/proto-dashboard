import mongoose, { Schema, model } from "mongoose";

const CommentSchema = new Schema({

});

const ConversationSchema = new Schema({
    origin: String,
    user: String,
    date: { type: Date, default: Date.now },
    content: [{
        sender: String,
        content: String,
        timestamp: { type: Date, default: Date.now }
    }]
});