export function calculateTotalPrice(array) {
  const total = array.reduce((acc, curr) => {
    const { price, quantity } = curr;
    return acc + (price * quantity);
  }, 0);
  return total.toFixed(2).replace('.', ',');
}

export function calculateTotalPriceToNumber(array) {
  const total = array.reduce((acc, curr) => {
    const { price, quantity } = curr;
    return acc + (price * quantity);
  }, 0);
  return total.toFixed(2);
}
