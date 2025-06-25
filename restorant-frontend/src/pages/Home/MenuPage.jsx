import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userId, setUserID] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error('שגיאה:', err));
  }, []);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUserID(data.id);
    } catch (err) {
      console.error('iD של המשתמש תפקיד המשתמש:', err);
    }
  };

  const handleAddToCart = async (itemId) => {
    const quantity = quantities[itemId] || 1;

    if (!userId) return alert('התחבר כדי להוסיף לסל');

    try {
      const response = await fetch('http://localhost:3001/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, menu_item_id: itemId, quantity })
      });

      const result = await response.json();
      if (response.ok) alert('נוסף לסל בהצלחה');
      else alert(result.message || 'שגיאה בהוספה לסל');
    } catch (err) {
      console.error(err);
      alert('שגיאה בחיבור לשרת');
    }
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prev => ({ ...prev, [itemId]: Number(value) }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3} justifyContent="center">
        {menu.map(item => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={item.id} sx={{ display: 'flex' }}>
            <Card sx={{ width: '100%', minWidth: 240, maxWidth: 320, height: 370, display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 4, mx: 'auto' }}>
              {item.image_url && (
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image_url}
                  alt={item.name}
                  sx={{ objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <Typography gutterBottom variant="h6" component="div" fontWeight={700} textAlign="center">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ minHeight: 40 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary" textAlign="center" sx={{ mt: 1 }}>
                    ₪ {Number(item.price).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <TextField
                    type="number"
                    size="small"
                    label="כמות"
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    value={quantities[item.id] || 1}
                    onChange={e => handleQuantityChange(item.id, e.target.value)}
                    sx={{ width: 80, mx: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}
                    onClick={() => handleAddToCart(item.id)}
                  >
                    הוסף לסל
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
