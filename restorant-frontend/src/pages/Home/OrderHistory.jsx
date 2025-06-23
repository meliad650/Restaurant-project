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
      setUserID(data.id);
    } catch (err) {
      console.error('iD של המשתמש תפקיד המשתמש:', err);
    }
  };





  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      // קבלת כל ההזמנות של המשתמש שמחובר
      const ordersRes = await fetch(`http://localhost:3001/api/orders/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const ordersData = await ordersRes.json();
      setOrders(ordersData);

      // שליפת כל הפריטים לכל הזמנה
      const itemsMap = {};
      for (const order of ordersData) {
        const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const items = await itemsRes.json();
        itemsMap[order.id] = items;
      }
      setOrderItemsMap(itemsMap);

      // שליפת כל מוצרי התפריט (למיפוי שם)
      const menuRes = await fetch('http://localhost:3001/api/menu-items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const menuData = await menuRes.json();
      const menuMap = {};
      menuData.forEach(item => {
        menuMap[item.id] = item.name;
      });
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

          return (
            <div key={order.id} style={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9' }}>
              <h3>הזמנה מספר #{order.id}</h3>
              <p><strong>סטטוס:</strong> {order.status}</p>
              <p><strong>סכום לתשלום:</strong> ₪{total.toFixed(2)}</p>

              <h4>מוצרים:</h4>
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                    {menuItemsMap[item.menu_item_id]} - כמות: {item.quantity}, מחיר יחידה: ₪{item.price_at_time}
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}
