import mongoose from "mongoose";

interface IPartnerBank {
    owner: mongoose.Types.ObjectId;
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    routingNumber: string;
    mobileNUmber: string;
    status:"not_added" | "added" | "verified";
    createdAt?: Date;
    updatedAt?: Date;
}

const partnerBankSchema = new mongoose.Schema<IPartnerBank>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    routingNumber: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["not_added", "added", "verified"],
        default: "not_added"
    }
}, {timestamps: true});

const PartnerBank = mongoose.model || mongoose.models.PartnerBank || mongoose.model<IPartnerBank>("PartnerBank", partnerBankSchema);

export default PartnerBank;