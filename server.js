const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const chatbotRoutes = require('./routes/chatbot');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reservas', require('./routes/reservas'));
app.use('/api', chatbotRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

