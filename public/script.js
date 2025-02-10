// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Показываем кнопку "Профиль" и данные пользователя
function showProfile() {
    const user = tg.initDataUnsafe.user; // Данные пользователя

    if (user) {
        // Заполняем данные профиля
        document.getElementById('first-name').textContent = user.first_name;
        document.getElementById('last-name').textContent = user.last_name || 'Не указано';
        document.getElementById('username').textContent = user.username || 'Не указано';
        document.getElementById('photo').src = user.photo_url || '';

        // Показываем блок профиля и кнопку
        document.getElementById('profile').style.display = 'block';
        document.getElementById('profile-button').style.display = 'block';
    } else {
        alert('Данные пользователя не найдены.');
    }
}

// Обработчик кнопки "Профиль"
document.getElementById('profile-button').addEventListener('click', () => {
    showProfile();
});

// Показываем профиль сразу после загрузки, если пользователь авторизован
tg.ready(); // Говорим Telegram, что приложение готово
showProfile();
