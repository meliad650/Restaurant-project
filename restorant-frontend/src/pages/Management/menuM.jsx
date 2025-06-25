import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Divider, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MenuM = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });
  const [updatePrices, setUpdatePrices] = useState({});

  // טוען את כל המוצרים עם טעינת הקומפוננטה
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/menu');
      setMenuItems(response.data);
    } catch (err) {
      console.error('שגיאה בקבלת המוצרים', err);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:3001/api/menu', newItem);
      setNewItem({ name: '', description: '', price: '', image_url: '' });
      fetchMenuItems();
    } catch (err) {
      console.error('שגיאה בהוספת מוצר', err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/menu/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error('שגיאה במחיקת מוצר', err);
    }
  };

  const handleUpdatePrice = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/menu/${id}`, {
        price: updatePrices[id]
      });
      setUpdatePrices((prev) => ({ ...prev, [id]: '' }));
      fetchMenuItems();
    } catch (err) {
      console.error('שגיאה בעדכון מחיר', err);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
      <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>הוספת מוצר חדש</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField label="שם" fullWidth value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="תיאור" fullWidth value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="מחיר" type="number" fullWidth value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="קישור לתמונה" fullWidth value={newItem.image_url} onChange={e => setNewItem({ ...newItem, image_url: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <Button variant="contained" color="success" onClick={handleAddItem} startIcon={<AddIcon />}>הוסף</Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>רשימת מוצרים</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {menuItems.map(item => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card sx={{ mb: 2, p: 2, borderRadius: 3, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography fontWeight={700}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">ID: {item.id} | מחיר: {item.price} ₪</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    type="number"
                    size="small"
                    label="מחיר חדש"
                    value={updatePrices[item.id] || ''}
                    onChange={e => setUpdatePrices({ ...updatePrices, [item.id]: e.target.value })}
                    sx={{ width: 100 }}
                  />
                  <IconButton color="primary" onClick={() => handleUpdatePrice(item.id)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDeleteItem(item.id)}><DeleteIcon /></IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default MenuM;
