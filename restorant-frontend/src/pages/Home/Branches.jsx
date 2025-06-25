import React, { useEffect, useState } from 'react';
import { fetchBranches } from '../../API/branchesApi';
import { Card, CardContent, Typography, Box, Avatar, Stack, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';

export default function Branches() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches()
      .then(data => setBranches(data))
      .catch(err => console.error('שגיאה:', err));
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f9f7f3' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" fontWeight={800} textAlign="center" mb={4}>
          רשימת סניפים
        </Typography>
        <Card sx={{ borderRadius: 5, boxShadow: 4, p: 2, bgcolor: '#f5f5fa', maxWidth: 700, mx: 'auto' }}>
          <List>
            {branches.map(branch => (
              <React.Fragment key={branch.id}>
                <ListItem alignItems="center" sx={{ direction: 'rtl', textAlign: 'right', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                      {branch.city}
                    </Typography>
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
                      <BusinessIcon fontSize="medium" />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Card>
      </Box>
    </Box>
  );
}
