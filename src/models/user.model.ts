import mongoose from "mongoose";

interface IUser{
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
    mobile?: string
    role: "user" | "deliveryBoy" | "admin"
    isEmailVerified?: boolean
    otp?: string
    otpExpiresAt?: Date
    createdAt?: Date
    updatedAt?: Date
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    mobile: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "deliveryBoy", "admin"],
        default: "user"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        required: false
    },
    otpExpiresAt: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;