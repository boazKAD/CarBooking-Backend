import { Model } from "mongoose";
import crypto from "crypto";
export const generateID = async function () {
  const prefix = "PO";
  const toDay = new Date().toISOString().substr(0, 10).replace(/-/g, "");
  const count = await Model.countDocuments();
  const suffix = count.toString().padStart(5, "0");
  return `${prefix}-${toDay}-${suffix}`;
};

// const generateID = async function () {
//     const prefix = "PO";
//     const toDay = new Date();
//     // .toISOString().substr(0, 10).replace(/-/g, "");
//     const day = toDay.getDate().toString().padStart(2, "0");
//     const month = (toDay.getMonth() + 1).toString().padStart(2, "0");
//     const year = toDay.getFullYear().toString().substr(-2);
//     const date = `${day}${month}${year}`;
//     const count = await myModel.countDocuments();
//     const suffix = count.toString().padStart(2, "0");
//     return `${prefix}${date}${suffix}`;
// };
export function generateOTP(length) {
  const buffer = crypto.randomBytes(length);
  const otp = parseInt(buffer.toString("hex"), 16).toString().slice(0, length);
  return otp;
}
