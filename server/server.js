const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./auth');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Отдача статических файлов из папки public
app.use('/auth', authRouter); // Маршрут для обработки авторизации

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});