const API_BASE = 'http://localhost:3001/api';

export const fetchBranches = async () => {
  const response = await fetch(`${API_BASE}/branches`);
  if (!response.ok) throw new Error('שגיאה בשליפת סניפים');
  return response.json();
};

export const createBranch = async (branch) => {
  const response = await fetch(`${API_BASE}/branches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(branch)
  });
  if (!response.ok) throw new Error('שגיאה בהוספת סניף');
  return response.json();
};

export const deleteBranch = async (id) => {
  const response = await fetch(`${API_BASE}/branches/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('שגיאה במחיקת סניף');
  return response.json();
};
