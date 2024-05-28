import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "draft",
    },
    orderId: {
      type: mongoose.Types.ObjectId,
      ref: "order",
    },
    carId: {
      type: mongoose.Types.ObjectId,
      ref: "car",
    },
    customerDetails: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    documents: [
      {
        createdBy: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        docLink: String,
        date: { type: Date, default: Date.now() },
      },
    ],
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

export default mongoose.model("Contract", Schema);
