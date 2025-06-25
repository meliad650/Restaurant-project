// import React, { useEffect, useState } from 'react';

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [orderItemsMap, setOrderItemsMap] = useState({});
//   const [menuItemsMap, setMenuItemsMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserID] = useState(null);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetchUserRole();
//   }, []);

//   const fetchUserRole = async () => {
//     try {
//       const res = await fetch('http://localhost:3001/api/users/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       console.log('🧑‍💻 משתמש מחובר:', data);
//       setUserID(data.id);
//     } catch (err) {
//       console.error('שגיאה בשליפת פרטי המשתמש:', err);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchMyOrders();
//     }
//   }, [userId]);

//   const fetchMyOrders = async () => {
//     try {
//       const ordersRes = await fetch(`http://localhost:3001/api/orders/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const ordersData = await ordersRes.json();
//       console.log('📦 הזמנות מהשרת:', ordersData);

//       // טיפול במקרה שבו ordersData הוא מערך של [rows, fields]
//       const cleanOrders = Array.isArray(ordersData[0]) ? ordersData[0] : ordersData;
//       setOrders(cleanOrders);

//       const itemsMap = {};
//       for (const order of cleanOrders) {
//         const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const items = await itemsRes.json();
//         itemsMap[order.id] = items;
//       }
//       console.log('🧾 פריטים לפי הזמנה:', itemsMap);
//       setOrderItemsMap(itemsMap);

//       const menuRes = await fetch('http://localhost:3001/api/menu-items', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const menuData = await menuRes.json();
//       const menuMap = {};
//       menuData.forEach(item => {
//         menuMap[item.id] = item.name;
//       });
//       console.log('📋 פריטי תפריט:', menuMap);
//       setMenuItemsMap(menuMap);

//     } catch (err) {
//       console.error('שגיאה בטעינת ההזמנות:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateTotal = (items) => {
//     return items.reduce((sum, item) => sum + item.quantity * item.price_at_time, 0);
//   };

//   if (loading) return <p>טוען את ההזמנות שלך...</p>;

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>ההזמנות שלי</h2>
//       {orders.length === 0 ? (
//         <p>לא נמצאו הזמנות קודמות</p>
//       ) : (
//         orders.map(order => {
//           const items = orderItemsMap[order.id] || [];
//           const total = calculateTotal(items);

//           return (
//             <div key={order.id || Math.random()} style={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9' }}>
//               <h3>הזמנה מספר #{order.id}</h3>
//               <p><strong>סטטוס:</strong> {order.status}</p>
//               <p><strong>סכום לתשלום:</strong> ₪{total.toFixed(2)}</p>
// <p><strong>תאריך ביצוע ההזמנה:</strong> {new Date(order.created_at).toLocaleString('he-IL')}</p>

//               <h4>מוצרים:</h4>
//               <ul>
//                 {items.map((item, index) => (
//                   <li key={`${item.menu_item_id}-${index}`}>
//                     {menuItemsMap[item.menu_item_id] || 'פריט לא נמצא'} - כמות: {item.quantity}, מחיר יחידה: ₪{item.price_at_time}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItemsMap, setOrderItemsMap] = useState({});
  const [menuItemsMap, setMenuItemsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserID] = useState(null);

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
      console.log('🧑‍💻 משתמש מחובר:', data);
      setUserID(data.id);
    } catch (err) {
      console.error('שגיאה בשליפת פרטי המשתמש:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMyOrders();
    }
  }, [userId]);

  const fetchMyOrders = async () => {
    try {
      const ordersRes = await fetch(`http://localhost:3001/api/orders/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const ordersData = await ordersRes.json();
      console.log('📦 הזמנות מהשרת:', ordersData);

      const cleanOrders = Array.isArray(ordersData[0]) ? ordersData[0] : ordersData;
      setOrders(cleanOrders);

      const itemsMap = {};
      for (const order of cleanOrders) {
        const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const items = await itemsRes.json();
        itemsMap[order.id] = items;
      }
      console.log('🧾 פריטים לפי הזמנה:', itemsMap);
      setOrderItemsMap(itemsMap);

      const menuRes = await fetch('http://localhost:3001/api/menu', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const menuData = await menuRes.json();
      const menuMap = {};
      menuData.forEach(item => {
        menuMap[item.id] = item.name;
      });
      console.log('📋 פריטי תפריט:', menuMap);
      setMenuItemsMap(menuMap);

    } catch (err) {
      console.error('שגיאה בטעינת ההזמנות:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.quantity * item.price_at_time, 0);
  };

  if (loading) return <p>טוען את ההזמנות שלך...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>ההזמנות שלי</h2>
      {orders.length === 0 ? (
        <p>לא נמצאו הזמנות קודמות</p>
      ) : (
        orders.map(order => {
          const items = orderItemsMap[order.id] || [];
          const total = calculateTotal(items);

          // המרת מחרוזת JSON למערך אם צריך
          let sauces = [];
          try {
            const raw = order.selected_sauces;

            if (typeof raw === 'string') {
              const parsed = JSON.parse(raw);
              sauces = Array.isArray(parsed) ? parsed : [];
            } else if (Array.isArray(raw)) {
              sauces = raw;
            } else {
              sauces = [];
            }
          } catch (e) {
            console.warn('⚠️ בעיה בפיענוח רטבים:', order.selected_sauces, e);
            sauces = [];
          }


          return (
            <div key={order.id || Math.random()} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>הזמנה מספר #{order.id}</h3>
              <p><strong>סטטוס:</strong> {order.status}</p>
              <p><strong>סכום לתשלום:</strong> ₪{total.toFixed(2)}</p>
              <p><strong>תאריך ביצוע ההזמנה:</strong> {new Date(order.created_at).toLocaleString('he-IL')}</p>

              <h4>מוצרים:</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={`${item.menu_item_id}-${index}`}>
                    {menuItemsMap[item.menu_item_id] || 'פריט לא נמצא'} - כמות: {item.quantity}, מחיר יחידה: ₪{item.price_at_time}
                  </li>
                ))}
              </ul>

              {sauces.length > 0 && (
                <>
                  <h4>רטבים שנבחרו:</h4>
                  <ul>
                    {sauces.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
