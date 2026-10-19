import mongoose from "mongoose";

type vehicleType = 
"bike" | "car" | "bus" | "truck" | "auto";

interface IVehicle {
    owner: mongoose.Types.ObjectId;
    type: vehicleType;
    vehicleModel: string;
    number: string;
    imageUrl?: string;
    baseFace?: number;
    pricePerKM?: number;
    waitngCharge?: number;
    minFare?: number;
    status:"approved" | "pending" | "rejected";
    description?: string;
    rejectionReason?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const vehicleSchema = new mongoose.Schema<IVehicle>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["bike", "car", "bus", "truck", "auto"],
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    baseFace: {
        type: Number,
        required: false
    },
    pricePerKM: {
        type: Number,
        required: false
    },
    waitngCharge: {
        type: Number,
        required: false
    },
    minFare: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "pending"
    },
    description: {
        type: String,
    },
    rejectionReason: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Vehicle = mongoose.model || mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;