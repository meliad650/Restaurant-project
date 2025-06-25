import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Divider, MenuItem, Select, InputLabel, FormControl, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';

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
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>סינון הזמנות</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>סטטוס</InputLabel>
              <Select
                value={selectedStatus}
                label="סטטוס"
                onChange={e => setSelectedStatus(e.target.value)}
                startAdornment={<FilterAltIcon />}
              >
                <MenuItem value=''>הכל</MenuItem>
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>סניף</InputLabel>
              <Select
                value={selectedBranchId}
                label="סניף"
                onChange={e => setSelectedBranchId(e.target.value)}
                startAdornment={<FilterAltIcon />}
              >
                <MenuItem value=''>כל הסניפים</MenuItem>
                {branches.map(branch => (
                  <MenuItem key={branch.id} value={branch.id}>{getBranchName(branch.id)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Button variant="outlined" color="primary" onClick={() => { setSelectedStatus(''); setSelectedBranchId(''); }}>איפוס סינון</Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>ניהול הזמנות</Typography>
        <Divider sx={{ mb: 2 }} />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} sx={{ mb: 3, p: 2, borderRadius: 3, boxShadow: 1 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>הזמנה מספר #{order.id}</Typography>
              <Box sx={{ mb: 1 }}>
                <Typography><b>תאריך:</b> {formatDate(order.created_at)}</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography><b>סטטוס:</b> {order.status}</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography><b>סוג משלוח:</b> {order.delivery_method === 'delivery' ? 'שליח עד הבית' : 'איסוף עצמי'}</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography><b>טלפון:</b> {formatDeliveryPhone(order.address)}</Typography>
              </Box>
              {order.delivery_method === 'delivery' && (
                <Box sx={{ mb: 1 }}>
                  <Typography><b>כתובת למשלוח:</b> {formatDeliveryAddress(order.address)}</Typography>
                </Box>
              )}
              {order.delivery_method === 'pickup' && (
                <Box sx={{ mb: 1 }}>
                  <Typography><b>סניף:</b> {getBranchName(order.branch_id)}</Typography>
                </Box>
              )}
              <Box sx={{ mb: 1 }}>
                <Typography><b>הערות ובקשות:</b> {order.notes}</Typography>
              </Box>
              <Typography fontWeight={700} mt={2}>פריטים בהזמנה:</Typography>
              <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>מוצר</TableCell>
                      <TableCell>כמות</TableCell>
                      <TableCell>מחיר</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(orderItemsMap[order.id] || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{getMenuItemName(item.menu_item_id)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₪{item.price_at_time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {(userRole === 'waiter' || userRole === 'manager') && (
                editStatusId === order.id ? (
                  <FormControl sx={{ mt: 1, minWidth: 180 }}>
                    <Select
                      value={order.status}
                      onChange={e => handleStatusUpdate(order.id, e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    sx={{ mt: 1, fontWeight: 700 }}
                    onClick={() => setEditStatusId(order.id)}
                  >
                    עדכן סטטוס
                  </Button>
                )
              )}
            </Card>
          ))
        )}
      </Card>
    </Box>
  );
}
