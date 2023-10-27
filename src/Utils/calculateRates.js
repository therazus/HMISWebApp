export function calculateBB(roomTypeVal, adults, children) {
  const cost = roomTypeVal.price + 2500 * (adults + children * 0.6);
  return cost;
}

export function calculateHB(roomTypeVal, adults, children) {
  const cost = Math.floor(roomTypeVal.price + 5000 * (adults + children * 0.6));
  return cost;
}

export function calculateFB(roomTypeVal, adults, children) {
  const cost = Math.floor(roomTypeVal.price + 7500 * (adults + children * 0.6));
  return cost;
}
