import mongoose from "mongoose";

export interface User extends mongoose.Document {
    name: string;
    phone: string;
}

const UserSchema = new mongoose.Schema<User>({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);