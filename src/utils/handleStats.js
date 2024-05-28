export function fillMissingDates(data) {
  // Get all unique dates from all data arrays
  const allDates = Array.from(
    new Set(data.flatMap((item) => Object.keys(item.data)))
  ).sort();

  // For each item in the data array, check if any dates are missing and set them to zero
  const filledData = data.map((item) => {
    const filledData = {};
    allDates.forEach((date) => {
      filledData[date] = item.data[date] || 0;
    });
    return { ...item, data: filledData };
  });

  return filledData;
}

export function sortByDate(salesByQty) {
  salesByQty.forEach((item) => {
    const sortedData = Object.fromEntries(
      Object.entries(item.data).sort((a, b) => b[1] - a[1])
    );
    item.data = sortedData;
  });
  return salesByQty;
}
