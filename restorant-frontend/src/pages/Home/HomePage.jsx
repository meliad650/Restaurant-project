// קובץ: src/pages/HomePage.jsx
import React, { useState } from 'react';
import MenuPage from '../Home/MenuPage';
import Branches from '../Home/Branches';
import Cart from '../Home/Cart';
import OrderHistory from '../Home/OrderHistory';
import '../AuthPage.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('menu');

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuPage />;
      case 'branches':
        return <Branches />;
      case 'cart':
        return <Cart />;
      case 'history':
        return <OrderHistory />;
      default:
        return <MenuPage />;
    }
  };

  return (
    <div>
      <nav className="nav-tabs">
        {['menu', 'branches', 'cart', 'history'].map(tab => (
          <button
            key={tab}
            className="tab-button"
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'menu' && 'תפריט'}
            {tab === 'branches' && 'סניפים'}
            {tab === 'cart' && 'סל הקניות'}
            {tab === 'history' && 'היסטורית הזמנות'}
          </button>
        ))}
      </nav>
      <div style={{ padding: '20px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
