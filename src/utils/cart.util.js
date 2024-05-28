import crypto from "crypto";
export class CartUtility {
  static findPaymentByMode(data, mode) {
    const payment = data.find((item) => item.mode === mode);
    return payment;
  }

  static hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (value in valuesSoFar) {
        return true;
      }
      valuesSoFar[value] = true;
    }
    return false;
  }

  static containsSoldItems = (cart) => {
    return cart.list.some((item) => item?.shopStockItem?.status === "sold");
  };

  static getAmountToBePaid = async (cart) => {
    return cart?.list
      ?.map(
        (item, _index) =>
          item?.payment?.amount +
          (item?.payment?.amount * item?.payment?.extendedWarranty) / 100
      )
      ?.reduce((total, price) => (total += parseInt(price)), 0);
  };

  static getAmountPaid = async (cart) => {
    return cart?.payment
      ?.map((item, _index) => item?.amount)
      ?.reduce((total, price) => (total += parseInt(price)), 0);
  };

  static checkAmountPaid = async (cart, amountPaid, amountTobePaid) => {
    const isPatialPaymentNotAllowed =
      parseInt(amountPaid) !==
        parseInt(
          amountTobePaid - (amountTobePaid * cart?.discount?.discountPerc) / 100
        ) &&
      !this.findPaymentByMode(cart?.payment, "Macye_Macye") &&
      !this.findPaymentByMode(cart?.payment, "Vuba_Vuba") &&
      cart?.isSubscription !== "subscription"; // allow partial payment for subscription payments

    if (isPatialPaymentNotAllowed) {
      return true;
    }
    return false;
  };

  static generateRandomId = (prefix, length = 13) => {
    return `${prefix || ""}-${crypto.randomBytes(length).toString("hex")}`;
  };
}
