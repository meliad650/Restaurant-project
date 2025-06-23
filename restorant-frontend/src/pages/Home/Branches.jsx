import React, { useEffect, useState } from 'react';
import { fetchBranches } from '../../API/branchesApi';

export default function Branches() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches()
      .then(data => setBranches(data))
      .catch(err => console.error('שגיאה:', err));
  }, []);

  return (
    <div>
      <h2>רשימת סניפים</h2>
      <ul>
        {branches.map(branch => (
          <li key={branch.id} style={{ marginBottom: '10px' }}>
            <strong>{branch.city}</strong> - {branch.street} {branch.building_number} | טלפון: {branch.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
