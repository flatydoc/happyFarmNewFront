export const formatNumber = (num: number): string => {
  num = parseInt(num.toFixed(0));

  if (num >= 1000000) {
    const millionPart = Math.floor(num / 1000000);
    const thousandPart = Math.floor((num % 1000000) / 1000).toString();
    return `${millionPart},${thousandPart}M`;
  } else if (num >= 10000) {
    const wholePart = Math.floor(num / 1000);
    let decimalPart = ((num % 1000) / 100).toFixed(0);
    decimalPart = decimalPart.slice(0, 3);
    return `${wholePart},${decimalPart}K`;
  } else {
    return num.toString();
  }
};

export const formatBalance = (num: number) => {
  let formattedNum = num.toLocaleString("en-US");
  formattedNum = formattedNum.replace(/\.\d+/, "");
  return formattedNum;
};
