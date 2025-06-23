// require('dotenv').config();
// const mysql = require('mysql2/promise');
// const menuItems = require('./data/menuItemsData');
// const branches = require('./data/branchesData');
// const sauces = require('./data/Sauces'); // ודא שזה הקובץ עם module.exports = [{ id, name }, ...]
// const orders = require('./data/ordersData'); // ודא שזה הקובץ עם module.exports = [{ id, name }, ...]
// const orderItems = require('./data/orderItemsData'); // ודא שזה הקובץ עם module.exports = [{ id, name }, ...]

// (async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       multipleStatements: true
//     });

//     await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
//     await connection.query(`USE ${process.env.DB_NAME}`);
//  await connection.query(`DROP TABLE IF EXISTS order_items`);
//     await connection.query(`DROP TABLE IF EXISTS orders`);

//     const createTablesQuery = `
//       CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         teudat_zehut VARCHAR(20) NOT NULL UNIQUE,
//         email VARCHAR(100) NOT NULL UNIQUE,
//         first_name VARCHAR(100),
//         address TEXT,
//         role ENUM('customer', 'waiter') DEFAULT 'customer'
//       );

//       CREATE TABLE IF NOT EXISTS branches (
//         id INT PRIMARY KEY,
//         city VARCHAR(100),
//         street VARCHAR(100),
//         building_number INT,
//         phone VARCHAR(20)
//       );

//       CREATE TABLE IF NOT EXISTS passwords (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT NOT NULL,
//         password_hash VARCHAR(255) NOT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id)
//       );

//       CREATE TABLE IF NOT EXISTS menu_items (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100),
//         description TEXT,
//         price DECIMAL(10, 2),
//         image_url VARCHAR(255)
//       );

      

//       CREATE TABLE IF NOT EXISTS cart (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT NOT NULL,
//         menu_item_id INT NOT NULL,
//         quantity INT NOT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id),
//         FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
//       );


//  CREATE TABLE IF NOT EXISTS sauces (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100) NOT NULL
// );



//   CREATE TABLE IF NOT EXISTS orders (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     user_id INT,
//     email VARCHAR(100),
//     total_price DECIMAL(10, 2),
//     branch_id INT,
//     delivery_method ENUM('pickup', 'delivery'),
//     status ENUM('במשלוח', 'בטיפול', 'התקבלה במערכת','התקבלה אצל הלקוח','מוכנה לאיסוף') DEFAULT 'pending',
//     notes TEXT,
//     FOREIGN KEY (user_id) REFERENCES users(id),
//     FOREIGN KEY (branch_id) REFERENCES branches(id)
//   );

//   CREATE TABLE IF NOT EXISTS order_items (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     order_id INT,
//     menu_item_id INT,
//     quantity INT,
//     price_at_time DECIMAL(10, 2),
//     FOREIGN KEY (order_id) REFERENCES orders(id),
//     FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
//   );
//     `;

//     await connection.query(createTablesQuery);

//     for (const item of menuItems) {
//       const [exists] = await connection.execute(
//         'SELECT * FROM menu_items WHERE name = ?',
//         [item.name]
//       );
//       if (exists.length === 0) {
//         await connection.execute(
//           'INSERT INTO menu_items (name, description, price, image_url) VALUES (?, ?, ?, ?)',
//           [item.name, item.description, item.price, item.image_url]
//         );
//         console.log(`✅ נוסף לתפריט: ${item.name}`);
//       }
//     }

//     for (const item of sauces) {
//       const [exists] = await connection.execute(
//         'SELECT * FROM sauces WHERE id = ?',
//         [item.id]
//       );
//       if (exists.length === 0) {
//         await connection.execute(
//           'INSERT INTO sauces (id, name) VALUES (?, ?)',
//           [item.id, item.name]
//         );
//         console.log(`✅ רוטב נוסף: ${item.name}`);
//       }
//     }

//     for (const branch of branches) {
//       const [exists] = await connection.execute(
//         'SELECT * FROM branches WHERE id = ?',
//         [branch.id]
//       );
//       if (exists.length === 0) {
//         await connection.execute(
//           'INSERT INTO branches (id, city, street, building_number, phone) VALUES (?, ?, ?, ?, ?)',
//           [branch.id, branch.city, branch.street, branch.building_number, branch.phone]
//         );
//         console.log(`✅ סניף ${branch.city} נוסף`);
//       }
//     }

//         for (const ord of orders) {
//       const [exists] = await connection.execute(
//         'SELECT * FROM orders WHERE id = ?',
//         [ord.id]
//       );
//       if (exists.length === 0) {
//         await connection.execute(
//           'INSERT INTO orders (id, created_at ,user_id ,email,total_price ,branch_id, delivery_method ,status ,notes) VALUES (?, ?, ?, ?, ?,?,?,?,?)',
//           [ord.id,ord.created_at,ord.user_id,ord.email,ord.total_price,ord.branch_id,ord.delivery_method,ord.status,ord.notes]
//         );
//         console.log(`✅ הזמנה ${ord.id} נוסף`);
//       }
//     }

//        for (const item of orderItems) {
//   const [exists] = await connection.execute(
//     'SELECT * FROM order_items WHERE id = ?',
//     [item.id]
//   );
//   if (exists.length === 0) {
//     await connection.execute(
//       'INSERT INTO order_items (id, order_id, menu_item_id, quantity, price_at_time) VALUES (?, ?, ?, ?, ?)',
//       [item.id, item.order_id, item.menu_item_id, item.quantity, item.price_at_time]
//     );
//     console.log(`✅ פריט להזמנה ${item.order_id} נוסף`);
//   }
// }


    
//     console.log("📦 בסיס הנתונים נוצר והוזן בהצלחה.");
//     await connection.end();
//   } catch (err) {
//     console.error("❌ שגיאה במהלך יצירת מסד הנתונים:", err);
//   }
// })();

require('dotenv').config();
const mysql = require('mysql2/promise');
const menuItems = require('./data/menuItemsData');
const branches = require('./data/branchesData');
const sauces = require('./data/Sauces');
const orders = require('./data/ordersData');
const orderItems = require('./data/orderItemsData');

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


    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teudat_zehut VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(100),
        address TEXT,
        role ENUM('customer', 'waiter') DEFAULT 'customer'
      );

      CREATE TABLE IF NOT EXISTS branches (
        id INT PRIMARY KEY,
        city VARCHAR(100),
        street VARCHAR(100),
        building_number INT,
        phone VARCHAR(20)
      );

      CREATE TABLE IF NOT EXISTS passwords (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        description TEXT,
        price DECIMAL(10, 2),
        image_url VARCHAR(255)
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
          'INSERT INTO menu_items (name, description, price, image_url) VALUES (?, ?, ?, ?)',
          [item.name, item.description, item.price, item.image_url]
        );
        console.log(`✅ נוסף לתפריט: ${item.name}`);
      }
    }

    for (const item of sauces) {
      const [exists] = await connection.execute('SELECT * FROM sauces WHERE id = ?', [item.id]);
      if (exists.length === 0) {
        await connection.execute('INSERT INTO sauces (id, name) VALUES (?, ?)', [item.id, item.name]);
        console.log(`✅ רוטב נוסף: ${item.name}`);
      }
    }

    for (const branch of branches) {
      const [exists] = await connection.execute('SELECT * FROM branches WHERE id = ?', [branch.id]);
      if (exists.length === 0) {
        await connection.execute(
          'INSERT INTO branches (id, city, street, building_number, phone) VALUES (?, ?, ?, ?, ?)',
          [branch.id, branch.city, branch.street, branch.building_number, branch.phone]
        );
        console.log(`✅ סניף ${branch.city} נוסף`);
      }
    }

    for (const ord of orders) {
      const [exists] = await connection.execute('SELECT * FROM orders WHERE id = ?', [ord.id]);
      if (exists.length === 0) {
        await connection.execute(
          'INSERT INTO orders (id, created_at, user_id, email, total_price, branch_id, delivery_method, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [ord.id, ord.created_at, ord.user_id, ord.email, ord.total_price, ord.branch_id, ord.delivery_method, ord.status, ord.notes]
        );
        console.log(`✅ הזמנה ${ord.id} נוספה`);
      }
    }

    for (const item of orderItems) {
      const [exists] = await connection.execute('SELECT * FROM order_items WHERE id = ?', [item.id]);
      if (exists.length === 0) {
        await connection.execute(
          'INSERT INTO order_items (id, order_id, menu_item_id, quantity, price_at_time) VALUES (?, ?, ?, ?, ?)',
          [item.id, item.order_id, item.menu_item_id, item.quantity, item.price_at_time]
        );
        console.log(`✅ פריט להזמנה ${item.order_id} נוסף`);
      }
    }

    console.log("📦 בסיס הנתונים נוצר והוזן בהצלחה.");
    await connection.end();
  } catch (err) {
    console.error("❌ שגיאה במהלך יצירת מסד הנתונים:", err);
  }
})();
