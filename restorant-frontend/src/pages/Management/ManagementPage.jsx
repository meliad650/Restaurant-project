import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function ManagementPage() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
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

  const allTabs = [
    { key: 'orders', label: 'ניהול הזמנות' },
    { key: 'menu', label: 'ניהול תפריט' },
    { key: 'branches', label: 'ניהול סניפים' },
  ];

  const activeTab = location.pathname.split('/')[2] || 'orders';

  if (loading) return null;

  if (userRole !== 'manager' && userRole !== 'waiter') {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>אין לך הרשאה לצפות בעמוד זה</h2>
      </div>
    );
  }

  // פילטר לפי תפקיד
  const visibleTabs =
    userRole === 'manager'
      ? allTabs
      : allTabs.filter(tab => tab.key === 'orders');

  return (
    <div style={{ padding: '20px' }}>
      <h2>ברוך הבא</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {visibleTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => navigate(`/ManagementPage/${tab.key}`)}
            style={{
              fontWeight: activeTab === tab.key ? 'bold' : 'normal',
              backgroundColor: activeTab === tab.key ? '#eee' : 'white',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <Outlet />
      </div>
    </div>
  );
}
