const TelegramBot = require('node-telegram-bot-api');
const token = '7286866364:AAH14HiQpD7MglVZ0sR4rJ2EwWwXh5OFFE8'; // Замените на токен вашего бота
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Открыть мини-приложение', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Открыть',
                    web_app: { url: 'https://testfiuggik.vercel.app/' } // Замените на URL вашего мини-приложения
                }]
            ]
        }
    });
});