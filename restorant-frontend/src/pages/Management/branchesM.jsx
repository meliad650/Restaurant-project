import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, Typography, TextField, Button, Grid, Divider, IconButton, List, ListItem, ListItemAvatar, Avatar } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const BranchesManager = () => {
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({
    city: '',
    street: '',
    building_number: '',
    phone: ''
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/branches');
      setBranches(response.data);
    } catch (error) {
      console.error('שגיאה בטעינת הסניפים:', error);
    }
  };

  const handleAddBranch = async () => {
    if (
      !newBranch.city.trim() ||
      !newBranch.street.trim() ||
      !newBranch.phone.trim() ||
      !newBranch.building_number
    ) {
      alert('נא למלא את כל השדות');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/branches', {
        ...newBranch,
        building_number: parseInt(newBranch.building_number)
      });
      setNewBranch({ city: '', street: '', building_number: '', phone: '' });
      fetchBranches();
    } catch (error) {
      console.error('שגיאה בהוספת סניף:', error.response?.data || error);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/branches/${id}`);
      fetchBranches();
    } catch (error) {
      console.error('שגיאה במחיקת סניף:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Card sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>הוספת סניף חדש</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField label="עיר" fullWidth value={newBranch.city} onChange={e => setNewBranch({ ...newBranch, city: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="רחוב" fullWidth value={newBranch.street} onChange={e => setNewBranch({ ...newBranch, street: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="מספר בניין" type="number" fullWidth value={newBranch.building_number} onChange={e => setNewBranch({ ...newBranch, building_number: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="טלפון" fullWidth value={newBranch.phone} onChange={e => setNewBranch({ ...newBranch, phone: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <Button variant="contained" color="success" onClick={handleAddBranch} startIcon={<AddBusinessIcon />}>הוסף</Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>רשימת סניפים</Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {branches.map(branch => (
            <React.Fragment key={branch.id}>
              <ListItem alignItems="center" sx={{ direction: 'rtl', textAlign: 'right', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700}>{branch.city}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <LocationOnIcon sx={{ verticalAlign: 'middle', ml: 0.5 }} fontSize="small" />
                    {branch.street} {branch.building_number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <PhoneIcon sx={{ verticalAlign: 'middle', ml: 0.5 }} fontSize="small" />
                    טלפון: {branch.phone}
                  </Typography>
                </Box>
                <ListItemAvatar sx={{ minWidth: 56, mr: 2, ml: 0 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <AddBusinessIcon fontSize="medium" />
                  </Avatar>
                </ListItemAvatar>
                <IconButton color="error" onClick={() => handleDeleteBranch(branch.id)}><DeleteIcon /></IconButton>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default BranchesManager;
