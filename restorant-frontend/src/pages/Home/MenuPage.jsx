// import React, { useEffect, useState } from 'react';

// export default function MenuPage() {
//   const [menu, setMenu] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/api/menu')
//       .then(res => res.json())
//       .then(data => setMenu(data))
//       .catch(err => console.error('שגיאה:', err));
//   }, []);

//   return (
//     <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
//       {menu.map(item => (
//         <div key={item.id} style={{
//           border: '1px solid #ddd',
//           borderRadius: '8px',
//           padding: '1rem',
//           backgroundColor: '#fff'
//         }}>
//           <h3>{item.name}</h3>
//           <p>{item.description}</p>
//           <p><strong>₪ {Number(item.price).toFixed(2)}</strong></p>
//           {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '100%', borderRadius: '6px' }} />}
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
// import { data } from 'react-router-dom';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
const [userId, setUserID] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error('שגיאה:', err));
  }, []);

const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUserID(data.id);
    } catch (err) {
      console.error('iD של המשתמש תפקיד המשתמש:', err);
    }
  };


  const handleAddToCart = async (itemId) => {
    console.log(userId)
    const quantity = quantities[itemId] || 1;

    if (!userId) return alert('התחבר כדי להוסיף לסל');

    try {
      const response = await fetch('http://localhost:3001/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, menu_item_id: itemId, quantity })
      });

      const result = await response.json();
      if (response.ok) alert('נוסף לסל בהצלחה');
      else alert(result.message || 'שגיאה בהוספה לסל');
    } catch (err) {
      console.error(err);
      alert('שגיאה בחיבור לשרת');
    }
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prev => ({ ...prev, [itemId]: Number(value) }));
  };

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      {menu.map(item => (
        <div key={item.id} style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1rem',
          backgroundColor: '#fff'
        }}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p><strong>₪ {Number(item.price).toFixed(2)}</strong></p>
          {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '100%', borderRadius: '6px' }} />}

          <div style={{ marginTop: '1rem' }}>
            <label>כמות: </label>
            <input
              type="number"
              min="1"
              value={quantities[item.id] || 1}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              style={{ width: '60px', marginLeft: '8px' }}
            />
          </div>

          <button
            style={{ marginTop: '10px', backgroundColor: '#22B362', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
            onClick={() => handleAddToCart(item.id)}
          >
            הוסף לסל
          </button>
        </div>
      ))}
    </div>
  );
}
