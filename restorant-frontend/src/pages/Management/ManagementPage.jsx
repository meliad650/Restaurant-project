import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Toolbar } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

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
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setUserRole('unauthorized');
          return;
        }
        const data = await res.json();
        setUserRole(data.role);
      } catch (err) {
        setUserRole('unauthorized');
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
  }, [token]);

  const allTabs = [
    { key: 'orders', label: 'ניהול הזמנות', icon: <ListAltIcon sx={{ mr: 1 }} /> },
    { key: 'menu', label: 'ניהול תפריט', icon: <RestaurantMenuIcon sx={{ mr: 1 }} /> },
    { key: 'branches', label: 'ניהול סניפים', icon: <StoreMallDirectoryIcon sx={{ mr: 1 }} /> },
  ];
  const activeTabIdx = allTabs.findIndex(tab => location.pathname.includes(tab.key));
  const visibleTabs = userRole === 'manager' ? allTabs : allTabs.filter(tab => tab.key === 'orders');

  if (loading) return null;
  if (userRole !== 'manager' && userRole !== 'waiter') {
    return (
      <Box sx={{ p: 4, color: 'red', textAlign: 'center' }}>
        <h2>אין לך הרשאה לצפות בעמוד זה</h2>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f9f7f3', overflowX: 'hidden' }}>
      <AppBar position="fixed" color="inherit" elevation={2} sx={{ zIndex: 1201, width: '100vw', left: 0 }}>
        <Toolbar sx={{ justifyContent: 'center', bgcolor: '#fff', minHeight: 70 }}>
          <Tabs
            value={activeTabIdx === -1 ? 0 : activeTabIdx}
            onChange={(_, idx) => navigate(`/ManagementPage/${allTabs[idx].key}`)}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            sx={{ width: '100vw', maxWidth: '100vw' }}
          >
            {visibleTabs.map((tab, idx) => (
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
}
