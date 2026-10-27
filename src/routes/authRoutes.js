const express = require('express');
const router = express.Router();
const { register, login, searchUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/search', auth, searchUsers); // Qidiruv funksiyasi

module.exports = router;