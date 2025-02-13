const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Подключение к базе данных SQLite
const db = new sqlite3.Database('./database.db');

// Создание таблицы для пользователей
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_id INTEGER UNIQUE,
        first_name TEXT,
        last_name TEXT,
        username TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS actions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        action TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

// Эндпоинт для сохранения данных пользователя
app.post('/save-user', (req, res) => {
    const { telegram_id, first_name, last_name, username } = req.body;

    db.run(`INSERT INTO users (telegram_id, first_name, last_name, username) VALUES (?, ?, ?, ?)`,
        [telegram_id, first_name, last_name, username], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
});

// Эндпоинт для сохранения действий пользователя
app.post('/save-action', (req, res) => {
    const { user_id, action } = req.body;

    db.run(`INSERT INTO actions (user_id, action) VALUES (?, ?)`,
        [user_id, action], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
