import mongoose from "mongoose";

const paymentPlanSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    weekly: {
      type: Number,
    },
    monthly: {
      type: Number,
    },
    daily: {
      type: Number,
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
export default mongoose.model("paymentPlan", paymentPlanSchema);
