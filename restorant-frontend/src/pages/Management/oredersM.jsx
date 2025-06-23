// // // import React, { useEffect, useState } from 'react';

// // // export default function OrdersM() {
// // //   const [orders, setOrders] = useState([]);
// // //   const [orderItemsMap, setOrderItemsMap] = useState({});
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchOrdersAndItems = async () => {
// // //       try {
// // //         const res = await fetch('http://localhost:3001/api/orders');
// // //         const ordersData = await res.json();
// // //         setOrders(ordersData);

// // //         // שליפת פריטים לכל הזמנה
// // //         const itemsMap = {};
// // //         for (const order of ordersData) {
// // //           const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`);
// // //           const items = await itemsRes.json();
// // //           itemsMap[order.id] = items;
// // //         }

// // //         setOrderItemsMap(itemsMap);
// // //       } catch (err) {
// // //         console.error('שגיאה בקבלת נתונים:', err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchOrdersAndItems();
// // //   }, []);

// // //   const formatDate = (isoDate) => {
// // //     const date = new Date(isoDate);
// // //     return date.toLocaleString('he-IL', {
// // //       dateStyle: 'short',
// // //       timeStyle: 'short',
// // //     });
// // //   };

// // //   return (
// // //     <div style={{ padding: '20px' }}>
// // //       <h2>ניהול הזמנות</h2>
// // //       {loading ? (
// // //         <p>טוען הזמנות...</p>
// // //       ) : (
// // //         orders.map((order) => (
// // //           <div key={order.id} style={{
// // //             border: '1px solid #ccc',
// // //             borderRadius: '8px',
// // //             marginBottom: '20px',
// // //             padding: '16px',
// // //             backgroundColor: '#f9f9f9'
// // //           }}>
// // //             <h3>הזמנה מספר #{order.id}</h3>
// // //             <p><strong>תאריך:</strong> {formatDate(order.created_at)}</p>
// // //             <p><strong>סניף:</strong> סניף מספר {order.branch_id}</p>
// // //             <p><strong>כתובת למשלוח:</strong> {order.notes || '---'}</p>
// // //             <p><strong>סטטוס:</strong> {order.status}</p>
// // //             <p><strong>סוג משלוח:</strong> {order.delivery_method === 'delivery' ? 'שליח עד הבית' : 'איסוף עצמי'}</p>

// // //             <h4>פריטים בהזמנה:</h4>
// // //             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// // //               <thead>
// // //                 <tr>
// // //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מוצר</th>
// // //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>כמות</th>
// // //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מחיר</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {(orderItemsMap[order.id] || []).map(item => (
// // //                   <tr key={item.id}>
// // //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>#{item.menu_item_id}</td>
// // //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.quantity}</td>
// // //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>₪{item.price_at_time}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // import  React, { useEffect, useState } from 'react';

// // // export default function OrdersM() {
// // //   const [orders, setOrders] = useState([]);
// // //   const [orderItemsMap, setOrderItemsMap] = useState({});
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedStatus, setSelectedStatus] = useState('');

// // //   const statusOptions = [
// // //     'הכל',
// // //     'התקבלה במערכת',
// // //     'בטיפול',
// // //     'במשלוח',
// // //     'מוכנה לאיסוף',
// // //     'התקבלה אצל הלקוח'
// // //   ];

// // //   useEffect(() => {
// // //     const fetchOrdersAndItems = async () => {
// // //       try {
// // //         const res = await fetch('http://localhost:3001/api/orders');
// // //         const ordersData = await res.json();
// // //         setOrders(ordersData);

// // //         const itemsMap = {};
// // //         for (const order of ordersData) {
// // //           const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`);
// // //           const items = await itemsRes.json();
// // //           itemsMap[order.id] = items;
// // //         }

// // //         setOrderItemsMap(itemsMap);
// // //       } catch (err) {
// // //         console.error('שגיאה בקבלת נתונים:', err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchOrdersAndItems();
// // //   }, []);

// // //   const formatDate = (isoDate) => {
// // //     const date = new Date(isoDate);
// // //     return date.toLocaleString('he-IL', {
// // //       dateStyle: 'short',
// // //       timeStyle: 'short',
// // //     });
// // //   };

// // //   // סינון ההזמנות לפי סטטוס נבחר
// // //   const filteredOrders = selectedStatus
// // //     ? orders.filter(order => order.status === selectedStatus)
// // //     : orders;

// // //   return (
// // //     <div style={{ padding: '20px' }}>
// // //       <div style={{ marginBottom: '20px' }}>
// // //         <label><strong>סינון לפי סטטוס:</strong> </label>
// // //         <select
// // //           value={selectedStatus}
// // //           onChange={(e) => setSelectedStatus(e.target.value)}
// // //           style={{ marginRight: '10px', padding: '6px' }}
// // //         >
// // //           {statusOptions.map(status => (
// // //             <option key={status} value={status === 'הכל' ? '' : status}>
// // //               {status}
// // //             </option>
// // //           ))}
// // //         </select>
// // //         <button onClick={() => setSelectedStatus('')}>איפוס סינון</button>
// // //       </div>

// // //       <h2>ניהול הזמנות</h2>
// // //       {loading ? (
// // //         <p>טוען הזמנות...</p>
// // //       ) : filteredOrders.length === 0 ? (
// // //         <p>לא נמצאו הזמנות מתאימות</p>
// // //       ) : (
// // //         filteredOrders.map((order) => (
// // //           <div key={order.id} style={{
// // //             border: '1px solid #ccc',
// // //             borderRadius: '8px',
// // //             marginBottom: '20px',
// // //             padding: '16px',
// // //             backgroundColor: '#f9f9f9'
// // //           }}>
// // //             <h3>הזמנה מספר #{order.id}</h3>
// // //             <p><strong>תאריך:</strong> {formatDate(order.created_at)}</p>
// // //             <p><strong>סניף:</strong> סניף מספר {order.branch_id}</p>
// // //             <p><strong>כתובת למשלוח:</strong> {order.notes || '---'}</p>
// // //             <p><strong>סטטוס:</strong> {order.status}</p>
// // //             <p><strong>סוג משלוח:</strong> {order.delivery_method === 'delivery' ? 'שליח עד הבית' : 'איסוף עצמי'}</p>

// // //             <h4>פריטים בהזמנה:</h4>
// // //             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// // //               <thead>
// // //                 <tr>
// // //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מוצר</th>
// // //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>כמות</th>
// // //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מחיר</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {(orderItemsMap[order.id] || []).map(item => (
// // //                   <tr key={item.id}>
// // //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>#{item.menu_item_id}</td>
// // //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.quantity}</td>
// // //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>₪{item.price_at_time}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import React, { useEffect, useState } from 'react';

// // export default function OrdersM() {
// //   const [orders, setOrders] = useState([]);
// //   const [orderItemsMap, setOrderItemsMap] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [selectedStatus, setSelectedStatus] = useState('');
// //   const [editStatusId, setEditStatusId] = useState(null); // מזהה של הזמנה שנערך

// //   const statusOptions = [
// //     'התקבלה במערכת',
// //     'בטיפול',
// //     'במשלוח',
// //     'מוכנה לאיסוף',
// //     'התקבלה אצל הלקוח'
// //   ];

// //   useEffect(() => {
// //     fetchOrdersAndItems();
// //   }, []);

// //   const fetchOrdersAndItems = async () => {
// //     try {
// //       const res = await fetch('http://localhost:3001/api/orders');
// //       const ordersData = await res.json();
// //       setOrders(ordersData);

// //       const itemsMap = {};
// //       for (const order of ordersData) {
// //         const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`);
// //         const items = await itemsRes.json();
// //         itemsMap[order.id] = items;
// //       }

// //       setOrderItemsMap(itemsMap);
// //     } catch (err) {
// //       console.error('שגיאה בקבלת נתונים:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleStatusUpdate = async (orderId, newStatus) => {
// //     try {
// //       const res = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ status: newStatus })
// //       });

// //       if (res.ok) {
// //         alert('הסטטוס עודכן בהצלחה');
// //         fetchOrdersAndItems(); // רענון נתונים
// //         setEditStatusId(null); // סיום עריכה
// //       } else {
// //         alert('אירעה שגיאה בעדכון הסטטוס');
// //       }
// //     } catch (err) {
// //       console.error('שגיאה בעדכון סטטוס:', err);
// //     }
// //   };

// //   const formatDate = (isoDate) => {
// //     const date = new Date(isoDate);
// //     return date.toLocaleString('he-IL', {
// //       dateStyle: 'short',
// //       timeStyle: 'short',
// //     });
// //   };

// //   const filteredOrders = selectedStatus
// //     ? orders.filter(order => order.status === selectedStatus)
// //     : orders;

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <div style={{ marginBottom: '20px' }}>
// //         <label><strong>סינון לפי סטטוס:</strong> </label>
// //         <select
// //           value={selectedStatus}
// //           onChange={(e) => setSelectedStatus(e.target.value)}
// //           style={{ marginRight: '10px', padding: '6px' }}
// //         >
// //           <option value=''>הכל</option>
// //           {statusOptions.map(status => (
// //             <option key={status} value={status}>{status}</option>
// //           ))}
// //         </select>
// //         <button onClick={() => setSelectedStatus('')}>איפוס סינון</button>
// //       </div>

// //       <h2>ניהול הזמנות</h2>
// //       {loading ? (
// //         <p>טוען הזמנות...</p>
// //       ) : (
// //         filteredOrders.map((order) => (
// //           <div key={order.id} style={{
// //             border: '1px solid #ccc',
// //             borderRadius: '8px',
// //             marginBottom: '20px',
// //             padding: '16px',
// //             backgroundColor: '#f9f9f9'
// //           }}>
// //             <h3>הזמנה מספר #{order.id}</h3>
// //             <p><strong>תאריך:</strong> {formatDate(order.created_at)}</p>
// //             <p><strong>סניף:</strong> סניף מספר {order.branch_id}</p>
// //             <p><strong>כתובת למשלוח:</strong> {order.notes || '---'}</p>
// //             <p><strong>סטטוס:</strong> {order.status}</p>
// //             <p><strong>סוג משלוח:</strong> {order.delivery_method === 'delivery' ? 'שליח עד הבית' : 'איסוף עצמי'}</p>

// //             <h4>פריטים בהזמנה:</h4>
// //             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// //               <thead>
// //                 <tr>
// //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מוצר</th>
// //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>כמות</th>
// //                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מחיר</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {(orderItemsMap[order.id] || []).map(item => (
// //                   <tr key={item.id}>
// //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>#{item.menu_item_id}</td>
// //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.quantity}</td>
// //                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>₪{item.price_at_time}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             {/* כפתור עריכה ו-Select */}
// //             {editStatusId === order.id ? (
// //               <div style={{ marginTop: '10px' }}>
// //                 <select
// //                   onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
// //                   defaultValue={order.status}
// //                 >
// //                   {statusOptions.map(status => (
// //                     <option key={status} value={status}>{status}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             ) : (
// //               <button
// //                 style={{ marginTop: '10px' }}
// //                 onClick={() => setEditStatusId(order.id)}
// //               >
// //                 עדכן סטטוס
// //               </button>
// //             )}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from 'react';

// export default function OrdersM() {
//   const [orders, setOrders] = useState([]);
//   const [orderItemsMap, setOrderItemsMap] = useState({});
//   const [menuItems, setMenuItems] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [editStatusId, setEditStatusId] = useState(null);

//   const statusOptions = [
//     'התקבלה במערכת',
//     'בטיפול',
//     'במשלוח',
//     'מוכנה לאיסוף',
//     'התקבלה אצל הלקוח'
//   ];

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       const [ordersRes, menuItemsRes, branchesRes] = await Promise.all([
//         fetch('http://localhost:3001/api/orders'),
//         fetch('http://localhost:3001/api/menu-items'),
//         fetch('http://localhost:3001/api/branches'),
//       ]);

//       const [ordersData, menuItemsData, branchesData] = await Promise.all([
//         ordersRes.json(),
//         menuItemsRes.json(),
//         branchesRes.json(),
//       ]);

//       setOrders(ordersData);
//       setMenuItems(menuItemsData);
//       setBranches(branchesData);

//       const itemsMap = {};
//       for (const order of ordersData) {
//         const itemsRes = await fetch(`http://localhost:3001/api/order-items/${order.id}`);
//         const items = await itemsRes.json();
//         itemsMap[order.id] = items;
//       }

//       setOrderItemsMap(itemsMap);
//     } catch (err) {
//       console.error('שגיאה בקבלת נתונים:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       const res = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus })
//       });

//       if (res.ok) {
//         alert('הסטטוס עודכן בהצלחה');
//         fetchAllData();
//         setEditStatusId(null);
//       } else {
//         alert('אירעה שגיאה בעדכון הסטטוס');
//       }
//     } catch (err) {
//       console.error('שגיאה בעדכון סטטוס:', err);
//     }
//   };

//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleString('he-IL', {
//       dateStyle: 'short',
//       timeStyle: 'short',
//     });
//   };

//   const getBranchName = (id) => {
//     const branch = branches.find(b => b.id === id);
//     return branch ? branch.name : `סניף ${id}`;
//   };

//   const getMenuItemName = (id) => {
//     const item = menuItems.find(i => i.id === id);
//     return item ? item.name : `#${id}`;
//   };

//   const filteredOrders = selectedStatus
//     ? orders.filter(order => order.status === selectedStatus)
//     : orders;

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <label><strong>סינון לפי סטטוס:</strong> </label>
//         <select
//           value={selectedStatus}
//           onChange={(e) => setSelectedStatus(e.target.value)}
//           style={{ marginRight: '10px', padding: '6px' }}
//         >
//           <option value=''>הכל</option>
//           {statusOptions.map(status => (
//             <option key={status} value={status}>{status}</option>
//           ))}
//         </select>
//         <button onClick={() => setSelectedStatus('')}>איפוס סינון</button>
//       </div>

//       <h2>ניהול הזמנות</h2>
//       {loading ? (
//         <p>טוען הזמנות...</p>
//       ) : (
//         filteredOrders.map((order) => (
//           <div key={order.id} style={{
//             border: '1px solid #ccc',
//             borderRadius: '8px',
//             marginBottom: '20px',
//             padding: '16px',
//             backgroundColor: '#f9f9f9'
//           }}>
//             <h3>הזמנה מספר #{order.id}</h3>
//             <p><strong>תאריך:</strong> {formatDate(order.created_at)}</p>
//             <p><strong>סניף:</strong> {getBranchName(order.branch_id)}</p>
//             <p><strong>כתובת למשלוח:</strong> {order.notes || '---'}</p>
//             <p><strong>סטטוס:</strong> {order.status}</p>
//             <p><strong>סוג משלוח:</strong> {order.delivery_method === 'delivery' ? 'שליח עד הבית' : 'איסוף עצמי'}</p>

//             <h4>פריטים בהזמנה:</h4>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr>
//                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מוצר</th>
//                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>כמות</th>
//                   <th style={{ border: '1px solid #ccc', padding: '8px' }}>מחיר</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(orderItemsMap[order.id] || []).map(item => (
//                   <tr key={item.id}>
//                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>{getMenuItemName(item.menu_item_id)}</td>
//                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.quantity}</td>
//                     <td style={{ border: '1px solid #ccc', padding: '8px' }}>₪{item.price_at_time}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {editStatusId === order.id ? (
//               <div style={{ marginTop: '10px' }}>
//                 <select
//                   onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
//                   defaultValue={order.status}
//                 >
//                   {statusOptions.map(status => (
//                     <option key={status} value={status}>{status}</option>
//                   ))}
//                 </select>
//               </div>
//             ) : (
//               <button
//                 style={{ marginTop: '10px' }}
//                 onClick={() => setEditStatusId(order.id)}
//               >
//                 עדכן סטטוס
//               </button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

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

  const fetchAllData = async () => {
    try {
      const [ordersRes, menuItemsRes, branchesRes] = await Promise.all([
        fetch('http://localhost:3001/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:3001/api/menu-items'),
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
    if (userRole !== 'waiter') {
      alert('רק מלצרים יכולים לעדכן סטטוס הזמנה');
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
    return branch ? branch.name : `סניף ${id}`;
  };

  const getMenuItemName = (id) => {
    const item = menuItems.find(i => i.id === id);
    return item ? item.name : `#${id}`;
  };

  const filteredOrders = selectedStatus
    ? orders.filter(order => order.status === selectedStatus)
    : orders;

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
            <p><strong>סניף:</strong> {getBranchName(order.branch_id)}</p>
            <p><strong>כתובת למשלוח:</strong> {order.notes || '---'}</p>
            <p><strong>סטטוס:</strong> {order.status}</p>
            <p><strong>סוג משלוח:</strong> {order.delivery_method === 'delivery' ? 'שליח עד הבית' : 'איסוף עצמי'}</p>

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

            {userRole === 'waiter' && (
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
