import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenuM = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });
  const [updatePrices, setUpdatePrices] = useState({});

  // טוען את כל המוצרים עם טעינת הקומפוננטה
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/menu');
      setMenuItems(response.data);
    } catch (err) {
      console.error('שגיאה בקבלת המוצרים', err);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:3001/api/menu', newItem);
      setNewItem({ name: '', description: '', price: '', image_url: '' });
      fetchMenuItems();
    } catch (err) {
      console.error('שגיאה בהוספת מוצר', err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/menu/${id}`);
      fetchMenuItems();
    } catch (err) {
      coסnsole.error('שגיאה במחיקת מוצר', err);
    }
  };

  const handleUpdatePrice = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/menu/${id}`, {
        price: updatePrices[id]
      });
      setUpdatePrices((prev) => ({ ...prev, [id]: '' }));
      fetchMenuItems();
    } catch (err) {
      console.error('שגיאה בעדכון מחיר', err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>הוספת מוצר חדש</h2>
      <input
        placeholder="שם"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        placeholder="תיאור"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        placeholder="מחיר"
        type="number"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <input
        placeholder="קישור לתמונה"
        value={newItem.image_url}
        onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
      />
      <button onClick={handleAddItem}>הוסף</button>

      <h2 style={{ marginTop: '2rem' }}>רשימת מוצרים</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <strong>{item.name}</strong> ID: {item.id}{' ,'}מחיר: {item.price} ₪

            <button onClick={() => handleDeleteItem(item.id)}>מחק</button>
            <div style={{ marginTop: '0.5rem' }}>
              <input
                type="number"
                placeholder="מחיר חדש"
                value={updatePrices[item.id] || ''}
                onChange={(e) =>
                  setUpdatePrices({ ...updatePrices, [item.id]: e.target.value })
                }
              />
              <button onClick={() => handleUpdatePrice(item.id)}>עדכן מחיר</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuM;
