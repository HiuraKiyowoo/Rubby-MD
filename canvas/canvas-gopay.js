export async function renderPaymentCanvas() {
  return Buffer.alloc(0)
}

export function parseQrisDetails(qris) {
  return { amount: 0, merchant: 'Merchant' }
}

export default { renderPaymentCanvas, parseQrisDetails }
