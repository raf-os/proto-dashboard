import mongoose from "mongoose";

export enum UserPermissions {
    Guest = 1 << 0,
    Client = 1 << 1,
    Operator = 1 << 2,
    SysAdmin = 1 << 3,
}

export interface IUser {
    _id?: string;
    name: string;
    password: string;
    verified: boolean;
    permissions: UserPermissions;
    organizations?: string[];
}

const UserSchema = new mongoose.Schema<IUser>({
    name: { type: String, unique: true, },
    password: String,
    verified: { type: Boolean, default: false },
    organizations: [String],
    permissions: { type: Number, default: 1 },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);