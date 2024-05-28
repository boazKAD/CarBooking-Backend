
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "in"
    },
    brand: {
        type: String,
    },
    model: {
        type: String
    },
    type: {
        type: String
    },
    location: {
        type: String,
    },
    transimission: String,
    engine: String,
    color:String,
    image:String,
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    paymentPlanId: {
        type: mongoose.Types.ObjectId,
        ref: "paymentPlan",
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

const Car = mongoose.model('CarModel', carSchema);

export default Car;
