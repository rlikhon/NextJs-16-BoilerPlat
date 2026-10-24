import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {    
    name: string;
    email: string;
    password: string;
    mobile?: string;
    role: "user" | "partner" | "admin";
    isEmailVerified?: boolean;
    otp?: string;
    otpExpiresAt?: Date;    
    partnerOnBoardingSteps?: number;
    mobileNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    mobile: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "partner", "admin"], 
        default: "user"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    partnerOnBoardingSteps: {
        type: Number,
        min: 0,
        max: 8,
        default: 0
    },
    mobileNumber: {
        type: String,
        required: false
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

const User = models.User || model<IUser>("User", userSchema);

export default User;
