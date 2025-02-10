const express = require('express');
const router = express.Router();

router.post('/auth', (req, res) => {
    const userData = req.body;
    console.log('Данные пользователя:', userData);
    // Здесь вы можете сохранить данные пользователя в базе данных
    res.sendStatus(200);
});

module.exports = router;