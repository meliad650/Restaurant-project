import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BranchesManager = () => {
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({
    city: '',
    street: '',
    building_number: '',
    phone: ''
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/branches');
      setBranches(response.data);
    } catch (error) {
      console.error('שגיאה בטעינת הסניפים:', error);
    }
  };

  const handleAddBranch = async () => {
    if (
      !newBranch.city.trim() ||
      !newBranch.street.trim() ||
      !newBranch.phone.trim() ||
      !newBranch.building_number
    ) {
      alert('נא למלא את כל השדות');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/branches', {
        ...newBranch,
        building_number: parseInt(newBranch.building_number)
      });
      setNewBranch({ city: '', street: '', building_number: '', phone: '' });
      fetchBranches();
    } catch (error) {
      console.error('שגיאה בהוספת סניף:', error.response?.data || error);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/branches/${id}`);
      fetchBranches();
    } catch (error) {
      console.error('שגיאה במחיקת סניף:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2>ניהול סניפים</h2>

      <h3>הוספת סניף חדש</h3>
      <div>
        <input
          placeholder="עיר"
          value={newBranch.city}
          onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
        />
        <input
          placeholder="רחוב"
          value={newBranch.street}
          onChange={(e) => setNewBranch({ ...newBranch, street: e.target.value })}
        />
        <input
          placeholder="מספר בניין"
          type="number"
          value={newBranch.building_number}
          onChange={(e) =>
            setNewBranch({ ...newBranch, building_number: parseInt(e.target.value) || 0 })
          }
        />
        <input
          placeholder="טלפון"
          value={newBranch.phone}
          onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
        />
        <button onClick={handleAddBranch}>הוסף סניף</button>
      </div>

      <h3 style={{ marginTop: '2rem' }}>רשימת סניפים</h3>
      <ul>
        {branches.map((branch) => (
          <li key={branch.id} style={{ marginBottom: '1rem' }}>
            <strong>{branch.city}, {branch.street} {branch.building_number}</strong> | טלפון: {branch.phone}
            <button onClick={() => handleDeleteBranch(branch.id)}>מחק</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchesManager;
