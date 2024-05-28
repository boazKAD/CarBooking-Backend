import mongoose from "mongoose";
const Schema = new mongoose.Schema(
    {
      isActive: {
        type: Boolean,
        default: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        default: "active",
      },
      customerDetails: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      carDetails: {
        type: mongoose.Types.ObjectId,
        ref: "carModel",
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
  export default mongoose.model("OrderModel", Schema);