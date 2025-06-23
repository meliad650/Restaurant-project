// 📁 src/pages/AuthPage.jsx
import React, { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    teudat_zehut: '',
    address: '',
    waiter_secret: ''
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

      const data = await res.json();

   if (!isRegistering) {
  // שמירת נתונים ב-localStorage
  localStorage.setItem('userEmail', data.email);
  localStorage.setItem('token', data.token);
  localStorage.setItem('userRole', data.role); // שומר את התפקיד

  // שליפת userId מהטוקן
  try {
    const decoded = JSON.parse(atob(data.token.split('.')[1]));
    localStorage.setItem('userId', decoded.id);
  } catch (err) {
    console.error('בעיה בפענוח הטוקן', err);
  }

  // ניתוב לפי תפקיד
  if (data.role === 'waiter') {
    navigate('/ManagementPage');
  } else {
    navigate('/home');
  }


      } else {
        setMessage(data.message || 'משהו השתבש');
      }
    } catch (err) {
      console.error(err);
      setMessage('שגיאה בשרת');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          {isRegistering ? 'הרשמה למערכת' : 'התחברות'}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegistering && (
            <>
              <label>שם פרטי</label>
              <input type="text" name="first_name" required className="auth-input" onChange={handleChange} />
              <label>תעודת זהות</label>
              <input type="text" name="teudat_zehut" required className="auth-input" onChange={handleChange} />
              <label>כתובת</label>
              <input type="text" name="address" required className="auth-input" onChange={handleChange} />
              <label>סיסמת מלצר (לא חובה)</label>
              <input type="text" name="waiter_secret" className="auth-input" onChange={handleChange} />
            </>
          )}

          <label>אימייל</label>
          <input type="email" name="email" required className="auth-input" onChange={handleChange} />
          <label>סיסמה</label>
          <input type="password" name="password" required className="auth-input" onChange={handleChange} />

          <button type="submit" className="auth-button">
            {isRegistering ? 'הרשמה' : 'התחברות'}
          </button>

          <p className="auth-toggle" onClick={toggleMode}>
            {isRegistering ? 'כבר רשומה? התחברי כאן' : 'אין לך חשבון? הרשמי עכשיו'}
          </p>

          {message && <div className="auth-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}