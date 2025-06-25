
import React, { useEffect, useState } from 'react';

export default function OrdersM() {
  const [orders, setOrders] = useState([]);
  const [orderItemsMap, setOrderItemsMap] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [editStatusId, setEditStatusId] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const statusOptions = [
    'התקבלה במערכת',
    'בטיפול',
    'במשלוח',
    'מוכנה לאיסוף',
    'התקבלה אצל הלקוח'
  ];

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserRole();
    fetchAllData();
  }, []);

  const fetchUserRole = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setUserRole(data.role);
    } catch (err) {
      console.error('❗ שגיאה בשליפת תפקיד המשתמש:', err);
    }
  };

  const filteredOrders = orders.filter(order =>
    (!selectedStatus || order.status === selectedStatus) &&
    (!selectedBranchId || order.branch_id === parseInt(selectedBranchId))
  );

  const fetchAllData = async () => {
    try {
      const [ordersRes, menuItemsRes, branchesRes] = await Promise.all([
        fetch('http://localhost:3001/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/menu'),
        fetch('http://localhost:3001/api/branches'),
      ]);

      const [ordersData, menuItemsData, branchesData] = await Promise.all([
        ordersRes.json(),
        menuItemsRes.json(),
        branchesRes.json(),
      ]);

      setOrders(ordersData);
      setMenuItems(menuItemsData);
      setBranches(branchesData);

      const itemsMap = {};
      for (const order of ordersData) {
        const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const items = await itemsRes.json();
        itemsMap[order.id] = items;
      }

      setOrderItemsMap(itemsMap);
    } catch (err) {
      console.error('שגיאה בקבלת נתונים:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    if (userRole !== 'waiter' && userRole !== 'manager') {
      alert('רק מלצרים ומנהלים יכולים לעדכן סטטוס הזמנה');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        alert('הסטטוס עודכן בהצלחה');
        fetchAllData();
        setEditStatusId(null);
      } else {
        alert('אירעה שגיאה בעדכון הסטטוס');
      }
    } catch (err) {
      console.error('שגיאה בעדכון סטטוס:', err);
    }
  };


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('he-IL', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  const getBranchName = (id) => {
    const branch = branches.find(b => b.id === id);
    return branch
      ? `${branch.city}, ${branch.street} ${branch.building_number}`
      : `סניף ${id}`;
  };

  const formatDeliveryPhone = (addressField) => {
    try {
      const phone = typeof addressField === 'string'
        ? JSON.parse(addressField)
        : addressField;
      return `${phone.phone}`
    } catch (err) {
      console.error('שגיאה בפירוק כתובת:', err);
      return '---';
    }
  };

  const formatDeliveryAddress = (addressField) => {
    try {
      const address = typeof addressField === 'string'
        ? JSON.parse(addressField)
        : addressField;

      if (!address) {
        return '---';
      }

      return `${address.city}, ${address.street} ${address.building}, קומה ${address.floor}`;
    } catch (err) {
      console.error('שגיאה בפירוק כתובת:', err);
      return '---';
    }
  };


  const getMenuItemName = (id) => {
    const item = menuItems.find(i => i.id === id);
    return item ? item.name : `#${id}`;
  };



  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label><strong>סינון לפי סטטוס:</strong> </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{ marginRight: '10px', padding: '6px' }}
        >
          <option value=''>הכל</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button onClick={() => setSelectedStatus('')}>איפוס סינון</button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label><strong>סינון לפי סניף:</strong> </label>
        <select
          value={selectedBranchId}
          onChange={(e) => setSelectedBranchId(e.target.value)}
          style={{ marginRight: '10px', padding: '6px' }}
        >
          <option value=''>כל הסניפים</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>
              {getBranchName(branch.id)}
            </option>
          ))}
        </select>
        <button onClick={() => setSelectedBranchId('')}>איפוס סינון</button>
      </div>

      <h2>ניהול הזמנות</h2>
      {loading ? (
        <p>טוען הזמנות...</p>
      ) : (
        filteredOrders.map((order) => (
          <div key={order.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '20px',
            padding: '16px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>הזמנה מספר #{order.id}</h3>
            <p><strong>תאריך:</strong> {formatDate(order.created_at)}</p>
            <p><strong>סטטוס:</strong> {order.status}</p>
            <p><strong>סוג משלוח:</strong> {order.delivery_method === 'delivery' ? 'שליח עד הבית' : 'איסוף עצמי'}</p>
            {order.delivery_method === 'delivery' && (
              <p><strong>כתובת למשלוח:</strong> {formatDeliveryAddress(order.address)}</p>
            )}
            {order.delivery_method === 'pickup' && (
              <p><strong>סניף:</strong> {getBranchName(order.branch_id)}</p>
            )}
            <p><strong>טלפון:</strong> {formatDeliveryPhone(order.address)}</p>
            <p><strong>הערות ובקשות:</strong> {order.notes}</p>
            <h4>פריטים בהזמנה:</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>מוצר</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>כמות</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>מחיר</th>
                </tr>
              </thead>
              <tbody>
                {(orderItemsMap[order.id] || []).map(item => (
                  <tr key={item.id}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{getMenuItemName(item.menu_item_id)}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.quantity}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>₪{item.price_at_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(userRole === 'waiter' || userRole === 'manager') && (
              editStatusId === order.id ? (
                <div style={{ marginTop: '10px' }}>
                  <select
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    defaultValue={order.status}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <button
                  style={{ marginTop: '10px' }}
                  onClick={() => setEditStatusId(order.id)}
                >
                  עדכן סטטוס
                </button>
              )
            )}
          </div>
        ))
      )}
    </div>
  );
}
