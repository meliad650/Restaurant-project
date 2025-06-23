import React, { useState, useEffect } from 'react';
import OrdersM from './oredersM';
import MenuM from './menuM';
import BranchesM from './branchesM';

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('שגיאה בבדיקת משתמש');
          setUserRole('unauthorized');
          return;
        }

        const data = await res.json();
        setUserRole(data.role);
      } catch (err) {
        console.error('שגיאה:', err);
        setUserRole('unauthorized');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [token]);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersM />;
      case 'menu':
        return <MenuM />;
      case 'branches':
        return <BranchesM />;
      default:
        return null;
    }
  };


  if (userRole !== 'waiter') {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>אין לך הרשאה לצפות בעמוד זה</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>ברוכים הבאים לממשק הניהול</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('orders')}>ניהול הזמנות</button>
        <button onClick={() => setActiveTab('menu')}>ניהול תפריט</button>
        <button onClick={() => setActiveTab('branches')}>ניהול סניפים</button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        {renderContent()}
      </div>
    </div>
  );
}
