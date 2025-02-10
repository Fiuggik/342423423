// Пример использования Telegram Mini Apps API
window.Telegram.WebApp.ready();

// Отправка данных в бота
function sendDataToBot(data) {
    window.Telegram.WebApp.sendData(JSON.stringify(data));
}