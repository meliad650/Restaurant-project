import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../AuthPage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: 'menu', label: 'תפריט' },
    { key: 'branches', label: 'סניפים' },
    { key: 'cart', label: 'סל הקניות' },
    { key: 'history', label: 'היסטורית הזמנות' },
  ];

  const activeTab = location.pathname.split('/')[2] || 'menu';

  return (
    <div>
      <nav className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => navigate(`/home/${tab.key}`)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
