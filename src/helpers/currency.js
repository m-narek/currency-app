export const convertCurrency = (amount, rate, symbol) => {
  if (isNaN(Number(amount)) || isNaN(Number(rate))) {    
    return `0 ${symbol ?? ""}`;
  }
  const convertedAmount = amount * rate;
  
  return `${parseFloat(convertedAmount.toFixed(2))} ${symbol ?? ""}`;
}