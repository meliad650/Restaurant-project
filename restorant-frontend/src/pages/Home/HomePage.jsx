import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Toolbar } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const tabs = [
  { key: 'menu', label: 'תפריט', icon: <RestaurantMenuIcon sx={{ mr: 1 }} /> },
  { key: 'branches', label: 'סניפים', icon: <StoreMallDirectoryIcon sx={{ mr: 1 }} /> },
  { key: 'cart', label: 'סל הקניות', icon: <ShoppingCartIcon sx={{ mr: 1 }} /> },
  { key: 'history', label: 'היסטורית הזמנות', icon: <HistoryEduIcon sx={{ mr: 1 }} /> },
];

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = tabs.findIndex(tab => location.pathname.includes(tab.key));

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f9f7f3', overflowX: 'hidden' }}>
      <AppBar position="fixed" color="inherit" elevation={2} sx={{ zIndex: 1201, width: '100vw', left: 0 }}>
        <Toolbar sx={{ justifyContent: 'center', bgcolor: '#fff', minHeight: 70 }}>
          <Tabs
            value={activeTab === -1 ? 0 : activeTab}
            onChange={(_, idx) => navigate(`/home/${tabs[idx].key}`)}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            sx={{ width: '100vw', maxWidth: '100vw' }}
          >
            {tabs.map((tab, idx) => (
              <Tab
                key={tab.key}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={{ fontWeight: 700, fontSize: 18, flex: 1, minWidth: 0 }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      {/* Spacer for fixed AppBar */}
      <Box sx={{ height: { xs: 80, md: 90 } }} />
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: { xs: 1, md: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomePage;
