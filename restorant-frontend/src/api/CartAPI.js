// src/api/CartAPI.js

const API_BASE = 'http://localhost:3001/api';

export async function fetchCart(userId) {
  const res = await fetch(`${API_BASE}/cart/${userId}`);
  if (!res.ok) throw new Error('שגיאה בשליפת הסל');
  return await res.json();
}

export async function fetchSauces() {
  const res = await fetch(`${API_BASE}/sauces`);
  if (!res.ok) throw new Error('שגיאה בטעינת רטבים');
  return await res.json();
}

export async function fetchBranches() {
  const res = await fetch(`${API_BASE}/branches`);
  if (!res.ok) throw new Error('שגיאה בטעינת סניפים');
  return await res.json();
}

export async function deleteCartItem(itemId) {
  const res = await fetch(`${API_BASE}/cart/${itemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('שגיאה במחיקת פריט');
}

export async function updateCartItem(itemId, quantity) {
  const res = await fetch(`${API_BASE}/cart/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error('שגיאה בעדכון כמות');
  return await res.json();
}
