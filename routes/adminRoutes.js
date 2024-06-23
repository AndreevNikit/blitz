const express = require('express');
const router = express.Router();
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

// Маршрут для доступа к админ-панели, защищенный middleware isAdminMiddleware
router.get('/admin', isAdminMiddleware, (req, res) => {
    // Код для обработки запроса на админ-панель
    res.json({ message: 'Доступ к админ-панели разрешен' });
});

module.exports = router;
