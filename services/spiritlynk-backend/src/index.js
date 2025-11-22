const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('SpiritLynk Hub Backend API is live 🚀');
});

// API Routes
app.use('/api/v1', require('./routes'));   // ✔ Correct API prefix

// DB Connection + Model Sync
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized successfully');
  } catch (err) {
    console.error('❌ Database connection/sync failed:', err.message);
  }
}

connectDB();

// Start Server
const PORT = process.env.PORT || 3050;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SpiritLynk backend running on port ${PORT}`);
});
