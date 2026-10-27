require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const socketHandler = require('./src/socket/socketHandler');

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_URL, credentials: true },
});
app.set('io', io);

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);

app.use((req, res) => res.status(404).json({ message: 'Маршрут не найден' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Ошибка сервера' });
});

socketHandler(io);

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
// server.js ichiga qo'shing
app.use('/api/reels', require('./src/routes/reelRoutes'));
// app.use('/api/auth', require('./src/routes/authRoutes')); // Bu allaqachon bor