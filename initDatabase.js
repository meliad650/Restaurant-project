
require('dotenv').config();
const mysql = require('mysql2/promise');
const menuItems = require('./data/menuItemsData');
const branches = require('./data/branchesData');
const sauces = require('./data/Sauces');
const orders = require('./data/ordersData');
const orderItems = require('./data/orderItemsData');
const Order = require('./models/orderModel');
const Users = require('./data/usersData');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      multipleStatements: true
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);
 await connection.query(`DROP TABLE IF EXISTS order_items`);
 await connection.query(`DROP TABLE IF EXISTS orders`);
 await connection.query(`DROP TABLE IF EXISTS sauces`);
 await connection.query(`DROP TABLE IF EXISTS cart`);
 await connection.query(`DROP TABLE IF EXISTS menu_items`);
 await connection.query(`DROP TABLE IF EXISTS branches`);
 await connection.query(`DROP TABLE IF EXISTS passwords`);
 await connection.query(`DROP TABLE IF EXISTS users`);
 
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teudat_zehut VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(100),
        address TEXT,
        role ENUM('customer', 'waiter','manager') DEFAULT 'customer',
        password TEXT
      );

      CREATE TABLE IF NOT EXISTS branches (
id INT AUTO_INCREMENT PRIMARY KEY,
        city VARCHAR(100),
        street VARCHAR(100),
        building_number INT,
        phone VARCHAR(20),
        status ENUM('לא קיים','פעיל') DEFAULT 'פעיל'

      );

  

      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        description TEXT,
        price DECIMAL(10, 2),
        image_url VARCHAR(255),
        status ENUM('לא קיים','פעיל') DEFAULT 'פעיל'
      );

      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        menu_item_id INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
      );

      CREATE TABLE IF NOT EXISTS sauces (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );

     CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  email VARCHAR(100),
  total_price DECIMAL(10, 2),
  branch_id INT,
  delivery_method ENUM('pickup', 'delivery'),
  status ENUM('במשלוח', 'בטיפול', 'התקבלה במערכת', 'התקבלה אצל הלקוח', 'מוכנה לאיסוף') DEFAULT 'התקבלה במערכת',
  notes TEXT,
  selected_sauces TEXT, 
   address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id)
);


      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        menu_item_id INT,
        quantity INT,
        price_at_time DECIMAL(10, 2),
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
      );
     
    `;

    await connection.query(createTablesQuery);

    for (const item of menuItems) {
      const [exists] = await connection.execute('SELECT * FROM menu_items WHERE name = ?', [item.name]);
      if (exists.length === 0) {
        await connection.execute(
          'INSERT INTO menu_items (name, description, price, image_url,status) VALUES (?, ?, ?, ?,?)',
          [item.name, item.description, item.price, item.image_url,item.status]
        );
        console.log(` נוסף לתפריט: ${item.name}`);
      }
    }

    for (const item of sauces) {
      const [exists] = await connection.execute('SELECT * FROM sauces WHERE id = ?', [item.id]);
      if (exists.length === 0) {
        await connection.execute('INSERT INTO sauces (id, name) VALUES (?, ?)', [item.id, item.name]);
        console.log(` רוטב נוסף: ${item.name}`);
      }
    }

    for (const branch of branches) {
      const [exists] = await connection.execute('SELECT * FROM branches WHERE id = ?', [branch.id]);
      if (exists.length === 0) {
        await connection.execute(
          'INSERT INTO branches (id, city, street, building_number, phone,status) VALUES (?,?, ?, ?, ?, ?)',
          [branch.id, branch.city, branch.street, branch.building_number, branch.phone,branch.status]
        );
        console.log(` סניף ${branch.city} נוסף`);
      }
    }

 for (const user of Users) {
  const [exists] = await connection.execute('SELECT * FROM users WHERE teudat_zehut = ?', [user.teudat_zehut]);
  if (exists.length === 0) {
    await connection.execute(
      'INSERT INTO users (teudat_zehut, email, first_name, address, role, password) VALUES (?, ?, ?, ?, ?, ?)',
      [user.teudat_zehut, user.email, user.first_name, user.address, user.role, user.password]
    );
    console.log(` משתמש ${user.first_name} נוסף`);
  } else {
    console.log(` המשתמש ${user.first_name} כבר קיים`);
  }
}


    for (const ord of orders) {
  await   Order.create(ord.user_id,ord.email,ord.total_price,ord.branch_id,ord.delivery_method,ord.status,ord.notes,ord.selected_sauces,ord.address);
    }

    for (const item of orderItems) {
      const [exists] = await connection.execute('SELECT * FROM order_items WHERE id = ?', [item.id]);
      if (exists.length === 0) {
        await connection.execute(
          'INSERT INTO order_items (id, order_id, menu_item_id, quantity, price_at_time) VALUES (?, ?, ?, ?, ?)',
          [item.id, item.order_id, item.menu_item_id, item.quantity, item.price_at_time]
        );
        console.log(` פריט להזמנה ${item.order_id} נוסף`);
      }
    }

    console.log(" בסיס הנתונים נוצר והוזן בהצלחה.");
    await connection.end();
  } catch (err) {
    console.error("שגיאה במהלך יצירת מסד הנתונים:", err);
  }
})();


