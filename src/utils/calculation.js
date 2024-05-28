export const getTotalPriceOfCartItem = (list) => {
  return list
    ?.map(
      (item, _index) =>
        item?.payment?.amount +
        (item?.payment?.amount * item?.payment?.extendedWarranty) / 100
    )
    ?.reduce((total, price) => (total += parseInt(price)), 0);
};

export const arrayToObject = (array) => {
  const object = {};

  for (const pair of array) {
    const [key, value] = pair;
    object[key] = value;
  }

  return object
}