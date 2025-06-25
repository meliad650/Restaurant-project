import './AuthPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Alert
} from '@mui/material';
import {
  PersonAddAlt as PersonAddAltIcon,
  Badge as BadgeIcon,
  Home as HomeIcon,
  Key as KeyIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon
} from '@mui/icons-material';

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    teudat_zehut: '',
    address: '',
    secret: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setMessage('');
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    try {
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const contentType = res.headers.get('Content-Type') || '';
      const isJson = contentType.includes('application/json');
      const data = isJson ? await res.json() : {};
      if (!res.ok) {
        setMessage(data.message || 'שגיאה בעת השליחה');
        return;
      }
      if (!isRegistering) {
        if (!data.token || !data.email || !data.role) {
          setMessage('חסרים נתונים בתשובת השרת');
          return;
        }
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        try {
          const decoded = JSON.parse(atob(data.token.split('.')[1]));
          if (decoded?.id) {
            localStorage.setItem('userId', decoded.id);
          }
        } catch (err) {}
        if (data.role === 'waiter' || data.role === 'manager') {
          navigate('/ManagementPage');
        } else {
          navigate('/home/menu');
        }
      } else {
        setMessage(data.message || 'ההרשמה הצליחה');
        setIsRegistering(false);
      }
    } catch (err) {
      setMessage('שגיאה בשרת או חיבור לא תקין');
    }
  };

  return (
    <Box className="auth-bg">
      <Box className="auth-center">
        <Card className="auth-card">
          <Typography variant="h4" fontWeight={800} textAlign="center" mb={3} color="primary">
            {isRegistering ? 'הרשמה למערכת' : 'התחברות'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
              {isRegistering && (
                <>
                  <Grid item xs={12} style={{ width: '100%' }}>
                    <TextField
                      label="שם פרטי"
                      name="first_name"
                      required
                      fullWidth
                      onChange={handleChange}
                      InputProps={{ startAdornment: <InputAdornment position="start"><PersonAddAltIcon /></InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: '100%' }}>
                    <TextField
                      label="תעודת זהות"
                      name="teudat_zehut"
                      required
                      fullWidth
                      onChange={handleChange}
                      InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: '100%' }}>
                    <TextField
                      label="כתובת"
                      name="address"
                      required
                      fullWidth
                      onChange={handleChange}
                      InputProps={{ startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: '100%' }}>
                    <TextField
                      label="סיסמת מלצר / מנהל (לא חובה)"
                      name="secret"
                      fullWidth
                      onChange={handleChange}
                      InputProps={{ startAdornment: <InputAdornment position="start"><KeyIcon /></InputAdornment> }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} style={{ width: '100%' }}>
                <TextField
                  label="אימייל"
                  name="email"
                  type="email"
                  required
                  fullWidth
                  onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} style={{ width: '100%' }}>
                <TextField
                  label="סיסמה"
                  name="password"
                  type="password"
                  required
                  fullWidth
                  onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} style={{ width: '100%' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={isRegistering ? <PersonAddAltIcon /> : <LoginIcon />}
                  className="auth-btn"
                >
                  {isRegistering ? 'הרשמה' : 'התחברות'}
                </Button>
              </Grid>
              <Grid item xs={12} style={{ width: '100%' }}>
                <Button
                  onClick={toggleMode}
                  color="secondary"
                  fullWidth
                  className="auth-toggle-btn"
                >
                  {isRegistering ? 'כבר רשומה? התחבי כאן' : 'אין לך חשבון? הרשמי עכשיו'}
                </Button>
              </Grid>
              {message && (
                <Grid item xs={12} style={{ width: '100%' }}>
                  <Alert severity={message.includes('שגיאה') ? 'error' : 'success'}>{message}</Alert>
                </Grid>
              )}
            </Grid>
          </form>
        </Card>
      </Box>
    </Box>
  );
}
