document.addEventListener('DOMContentLoaded', function () {
    const tg = window.Telegram.WebApp;

    // Элементы профиля
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const username = document.getElementById('username');
    const photo = document.getElementById('photo');

    // Кнопки
    const button1 = document.getElementById('button-1');
    const button2 = document.getElementById('button-2');
    const button3 = document.getElementById('button-3');
    const button4 = document.getElementById('button-4');

    // Проверяем, авторизован ли пользователь
    if (tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        // Заполняем данные профиля
        firstName.textContent = user.first_name || 'Не указано';
        lastName.textContent = user.last_name || 'Не указано';
        username.textContent = user.username ? `@${user.username}` : 'Не указано';
        photo.src = user.photo_url || '';
    } else {
        // Если пользователь не авторизован
        firstName.textContent = 'Не авторизован';
        lastName.textContent = '';
        username.textContent = '';
    }

    // Обработчики для кнопок
    button1.addEventListener('click', function () {
        tg.showAlert('Вы нажали кнопку 1');
    });

    button2.addEventListener('click', function () {
        tg.showAlert('Вы нажали кнопку 2');
    });

    button3.addEventListener('click', function () {
        tg.showAlert('Вы нажали кнопку 3');
    });

    button4.addEventListener('click', function () {
        tg.showAlert('Вы нажали кнопку 4');
    });
});
