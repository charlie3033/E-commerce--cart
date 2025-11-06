const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_BASE}/api/cart`);
  return res.json();
}

export async function addToCart(productId, qty=1) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId:productId, qty:qty })
  });
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${API_BASE}/api/cart/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function checkout(payload) {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
