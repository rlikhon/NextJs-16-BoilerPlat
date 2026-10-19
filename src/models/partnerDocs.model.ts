import mongoose from "mongoose";

interface IPartnerDocs {
    owner: mongoose.Types.ObjectId;
    nidImageUrl: string;
    drivingLicenseImageUrl: string;    
    status:"approved" | "pending" | "rejected";    
    rejectionReason?: string;    
    createdAt?: Date;
    updatedAt?: Date;
}

const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    nidImageUrl: {
        type: String,
        required: true
    },
    drivingLicenseImageUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "pending"
    },
    rejectionReason: {
        type: String,
    }
}, {timestamps: true});

const PartnerDocs = mongoose.model || mongoose.models.PartnerDocs || mongoose.model<IPartnerDocs>("PartnerDocs", partnerDocsSchema);

export default PartnerDocs;