# 🌐 **תפריט והזמנות NewDely** 🍟🌭🍗

ברוכים הבאים לאתר שבניתי!  
האתר מציג מידע על החנות **ניו-דלי**, כולל:
- הצגת התפריט וההזמנות בצד הלקוח  
- ניהול החנות וההזמנות בצד המנהל והמלצר  
הכל בעיצוב מודרני, נוח לשימוש וטעינה מהירה.

📸 **צילומי מסך מהאתר**:  
[Google Drive - Screenshots](https://drive.google.com/drive/folders/1sPaQOzypzglnA9pe0EbQs5rtjbdyryfC?usp=sharing)

---

## ✨ **תכונות עיקריות**

- 🔹 טעינה מהירה  
- 🔹 ניווט קל ונוח  
- 🔹 הבטחת פרטיות ובטיחות לכניסת מנהל וכניסת לקוח  
- 🔹 ממשק משתמש מודרני ונעים לעין עם **Material UI**  
- 🔹 ארכיטקטורה מופרדת (**Frontend / Backend**) – קוד נקי וקל לתחזוקה  
- 🔹 שימוש בבסיס נתונים רלציוני (**MySQL**) – גמישות בניהול מידע  

---

## 🛠️ **טכנולוגיות בשימוש**

### **Front-end**
- React.js  
- CSS3  
- MUI (Material UI)

### **Back-end**
- Node.js  
- Express.js

### **Database**
- MySQL

### **כלים נוספים**
- REST API  
- npm  
- Git & GitHub  

---

## 🚀 **התקנה מקומית**

```bash
git clone https://github.com/username/restaurant.git
cd restaurant
npm install
npm start
```

---

## 🚀 **הוראות התקנה והרצה**

כדי להפעיל את הפרויקט במלואו (שרת ולקוח), בצעו את הצעדים הבאים:

### 1. שיבוט הפרויקט

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. התקנת תלויות ל-Backend

```bash
cd restaurant
npm install
```

### 3. הרצת ה-Backend

```bash
nodemon server.js
```

### 4. התקנת תלויות ל-Frontend

```bash
cd restorant-frontend
npm install
```

### 5. הרצת ה-Frontend

```bash
npm run dev
```

---

## 📁 **מבנה הפרויקט**

```
restaurant/
├── .env
├── server.js
├── db.js
├── package.json
├── initDatabase.js
├── controllers/
│   ├── authController.js
│   ├── branchesController.js
│   ├── cartController.js
│   └── ...
├── models/
│   ├── usersModel.js
│   ├── menuItemsModel.js
│   └── ...
├── middleware/
│   ├── authenticateToken.js
│   └── authMiddleware.js
├── data/
│   ├── usersData.js
│   ├── ordersData.js
│   └── ...
├── restorant-frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── public/
```

---

## 🙋‍♀️ **יוצרת**

המערכת נבנתה על ידי **מיכל אליעד**.  
מוזמנים ליצור קשר או להשאיר ⭐ אם אהבתם את הפרויקט.
