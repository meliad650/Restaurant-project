import React, { useEffect, useState } from 'react';
import {
  fetchCart,
  fetchSauces,
  fetchBranches,
  deleteCartItem,
  updateCartItem
} from '../../api/CartAPI';
import {
  Box, Grid, Card, CardContent, CardMedia, Typography, IconButton, Button, TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [sauces, setSauces] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [notes, setNotes] = useState('');
  const [userId, setUserID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [entrance, setEntrance] = useState('');
  const [phone, setPhone] = useState('');


  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserID();
  }, []);

  const fetchUserID = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUserID(data.id);
      setUserEmail(data.email);
    } catch (err) {
      console.error('iD של המשתמש תפקיד המשתמש:', err);
    }
  };


  useEffect(() => {
    fetchCart(userId)
      .then(data => {
        setCartItems(data);
        const totalPrice = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalPrice);
      })
      .catch(err => console.error(err));

    fetchSauces()
      .then(setSauces)
      .catch(err => console.error(err));

    fetchBranches()
      .then(setBranches)
      .catch(err => console.error(err));
  }, [userId]);

  const handleDelete = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      const deletedItem = cartItems.find(item => item.id === itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      setTotal(prev => prev - (deletedItem.price * deletedItem.quantity));
    } catch (err) {
      console.error(err);
      alert('שגיאה במחיקת פריט');
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
      setCartItems(prev => prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
      const updatedTotal = cartItems.reduce((sum, item) => {
        const quantity = item.id === itemId ? newQuantity : item.quantity;
        return sum + item.price * quantity;
      }, 0);
      setTotal(updatedTotal);
    } catch (err) {
      console.error(err);
      alert('שגיאה בעדכון פריט');
    }
  };

  const handleSauceToggle = (sauceName) => {
    setSelectedSauces(prev => {
      if (prev.includes(sauceName)) {
        return prev.filter(name => name !== sauceName);
      } else if (prev.length < 4) {
        return [...prev, sauceName];
      } else {
        alert('ניתן לבחור עד 4 רטבים בלבד');
        return prev;
      }
    });
  };


  const handleCreateOrder = async () => {
 ס
    if (!userId || !selectedBranch || cartItems.length === 0) {
      alert('יש לוודא שכל השדות מולאו והסל אינו ריק');
      return;
    }

    const address = {
      city,
      street,
      building,
      floor,
      entrance,
      phone,
    };


    const orderData = {
      user_id: userId,
      branch_id: selectedBranch,
      delivery_method: deliveryMethod,
      status: 'התקבלה במערכת',
      notes,
      selected_sauces: selectedSauces, 
      address: {
        city,
        street,
        building,
        floor,
        entrance,
        phone
      },
      total_price: total.toFixed(2),
      created_at: new Date().toISOString(),
      email: userEmail
    };



    try {
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const responseText = await res.text();

      if (!res.ok) {
        console.error(' שגיאת שרת:', res.status);
        throw new Error('שגיאה ביצירת הזמנה');
      }

      const createdOrder = JSON.parse(responseText);

setCartItems([]);
setTotal(0);
setSelectedBranch('');
setDeliveryMethod('pickup');
setNotes('');
setSelectedSauces([]);
setCity('');
setStreet('');
setBuilding('');
setFloor('');
setEntrance('');
setPhone('');

    } catch (err) {
      console.error(' שגיאה בהזמנה:', err);
      alert('אירעה שגיאה בעת שליחת ההזמנה');
    }
  };



  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 3 }}>
      <Typography variant="h4" fontWeight={800} textAlign="center" mb={4}>
        סל הקניות
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 2, mb: 3, borderRadius: 4, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              פריטים בסל
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cartItems.length === 0 ? (
              <Typography color="text.secondary">הסל ריק</Typography>
            ) : (
              cartItems.map(item => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderRadius: 2, bgcolor: '#fafafa' }}>
                  <CardMedia
                    component="img"
                    image={item.image_url || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    sx={{ width: 80, height: 80, borderRadius: 2, mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>{item.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography>כמות:</Typography>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                        inputProps={{ min: 1, style: { width: 60, textAlign: 'center' } }}
                        sx={{ mx: 1 }}
                      />
                    </Box>
                    <Typography variant="body2">מחיר ליחידה: ₪{item.price}</Typography>
                  </Box>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" color="primary" textAlign="left">
              סך הכל לתשלום: ₪{total.toFixed(2)}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, borderRadius: 4, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              פרטי הזמנה
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>בחר סניף</InputLabel>
              <Select
                value={selectedBranch}
                label="בחר סניף"
                onChange={e => setSelectedBranch(e.target.value)}
              >
                <MenuItem value="">-- בחר סניף --</MenuItem>
                {branches.map(branch => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.city}, {branch.street} {branch.building_number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup
                row
                value={deliveryMethod}
                onChange={e => setDeliveryMethod(e.target.value)}
              >
                <FormControlLabel value="pickup" control={<Radio />} label="איסוף עצמי" />
                <FormControlLabel value="delivery" control={<Radio />} label="משלוח" />
              </RadioGroup>
            </FormControl>
            <Box sx={{ mb: 2 }}>
              <Typography fontWeight={700} mb={1}>בחר עד 4 רטבים:</Typography>
              <FormGroup row>
                {sauces.map(sauce => (
                  <FormControlLabel
                    key={sauce.id}
                    control={
                      <Checkbox
                        checked={selectedSauces.includes(sauce.name)}
                        onChange={() => handleSauceToggle(sauce.name)}
                        disabled={
                          !selectedSauces.includes(sauce.name) && selectedSauces.length >= 4
                        }
                      />
                    }
                    label={sauce.name}
                  />
                ))}
              </FormGroup>
            </Box>
            <TextField
              label="הערות ובקשות מיוחדות"
              multiline
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight={700} mb={1}>פרטי אשראי</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField fullWidth label="מספר כרטיס" variant="outlined" sx={{ mb: 1 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="תוקף כרטיס" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="CVV" variant="outlined" />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight={700} mb={1}>כתובת למשלוח</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField fullWidth label="עיר" value={city} onChange={e => setCity(e.target.value)} sx={{ mb: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="רחוב" value={street} onChange={e => setStreet(e.target.value)} sx={{ mb: 1 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="מספר בניין" value={building} onChange={e => setBuilding(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="קומה" value={floor} onChange={e => setFloor(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="כניסה" value={entrance} onChange={e => setEntrance(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="טלפון זמין" value={phone} onChange={e => setPhone(e.target.value)} />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 3, borderRadius: 3, fontWeight: 700, fontSize: 18 }}
              onClick={handleCreateOrder}
            >
              אישור
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
