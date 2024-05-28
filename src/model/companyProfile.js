
import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    companyNames: {
        type: String,
    },
    logo: {
        type: String
    },
    companyTin: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    deletedBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },

},
    { timestamps: true }
);

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);

export default CompanyProfile;
