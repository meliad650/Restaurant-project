import React, { useEffect, useState } from 'react';
import './CartPage.css';
import {
  fetchCart,
  fetchSauces,
  fetchBranches,
  deleteCartItem,
  updateCartItem
} from '../../api/CartAPI';

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
    console.log('📌 בדיקת userId:', userId);
    console.log('📌 סניף נבחר:', selectedBranch);
    console.log('📌 פריטים בסל:', cartItems);

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

    console.log('📦 כתובת שנאספה מהשדות:', address);

    const orderData = {
      user_id: userId,
      branch_id: selectedBranch,
      delivery_method: deliveryMethod,
      status: 'התקבלה במערכת',
      notes,
      selected_sauces: selectedSauces, // בלי stringify
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


    console.log('📤 נתונים שנשלחים לשרת:', orderData);

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
      console.log('📨 תגובת השרת הגולמית:', responseText);

      if (!res.ok) {
        console.error('❌ שגיאת שרת:', res.status);
        throw new Error('שגיאה ביצירת הזמנה');
      }

      const createdOrder = JSON.parse(responseText);
      console.log('✅ הזמנה שנשמרה:', createdOrder);

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
      console.error('❌ שגיאה בהזמנה:', err);
      alert('אירעה שגיאה בעת שליחת ההזמנה');
    }
  };



  return (
    <div className="cart-page" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', overflowX: 'hidden' }}>
      <div className="cart-container">
        <div className="middle-section">
          <h3>סך הכל לתשלום: ₪{total.toFixed(2)}</h3>

          <div className="branch-selection">
            <h4>בחר סניף לאיסוף:</h4>
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
              <option value="">-- בחר סניף --</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>
                  {branch.city}, {branch.street} {branch.building_number}
                </option>
              ))}
            </select>
          </div>

          <div className="delivery-method">
            <label>
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              איסוף עצמי
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryMethod === 'delivery'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              משלוח
            </label>
          </div>

          <div className="sauce-selection">
            <h4>בחר עד 3 רטבים:</h4>
            <div className="sauce-list">
              {sauces.map(sauce => (
                <label key={sauce.id}>
                  <input
                    type="checkbox"
                    checked={selectedSauces.includes(sauce.name)}
                    onChange={() => handleSauceToggle(sauce.name)}
                  />
                  {sauce.name}
                </label>
              ))}

            </div>
          </div>

          <div className="notes-box">
            <h4>הערות ובקשות מיוחדות:</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="כתוב כאן כל בקשה מיוחדת להזמנה שלך..."
              rows="4"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
            />
          </div>
        </div>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <img
                src={item.image_url || 'https://via.placeholder.com/80'}
                alt={item.name}
                className="cart-item-img"
              />
              <div>
                <h4>{item.name}</h4>
                <p>
                  כמות:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="cart-item-input"
                  />
                </p>
                <p>מחיר ליחידה: ₪{item.price}</p>
              </div>
            </div>
            <button className="cart-remove-button" onClick={() => handleDelete(item.id)}>הסר</button>
          </div>
        ))}
        <div className="payment-section">
          <h2>פרטי אשראי:</h2>
          <input type="text" placeholder="מספר כרטיס" />
          <div className="credit-details">
            <input type="text" placeholder="תוקף כרטיס" />
            <input type="text" placeholder="CVV" />
          </div>

          <h3>כתובת למשלוח</h3>
          <input type="text" placeholder="עיר" value={city} onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="רחוב" value={street} onChange={(e) => setStreet(e.target.value)} />
          <input type="text" placeholder="מספר בניין" value={building} onChange={(e) => setBuilding(e.target.value)} />
          <input type="text" placeholder="קומה" value={floor} onChange={(e) => setFloor(e.target.value)} />
          <input type="text" placeholder="כניסה" value={entrance} onChange={(e) => setEntrance(e.target.value)} />
          <input type="text" placeholder="טלפון זמין" value={phone} onChange={(e) => setPhone(e.target.value)} />


          <button className="confirm-button" onClick={handleCreateOrder}>אישור</button>
        </div>
      </div>
    </div>
  );
}
