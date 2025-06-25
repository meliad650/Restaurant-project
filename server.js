require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const branchesRoutes = require('./routes/branchesRoutes');
const cartRoutes = require('./routes/cartRoutes');
const saucesRoutes = require('./routes/saucesRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemsRoutes = require('./routes/orderItemsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const menuItemsRoutes = require('./routes/menu-itemsRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', orderRoutes);
app.use('/api', branchesRoutes);
app.use('/api', cartRoutes);
app.use('/api', saucesRoutes);
app.use('/api', orderItemsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/menu', menuItemsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
