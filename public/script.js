document.addEventListener('DOMContentLoaded', function() {
    const loginDiv = document.getElementById('login');
    const profileDiv = document.getElementById('profile');
    const loginButton = document.getElementById('login-button');
    const profileButton = document.getElementById('profile-button');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const username = document.getElementById('username');
    const photo = document.getElementById('photo');

    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;

    // Показываем кнопку входа, если пользователь не авторизован
    if (!tg.initDataUnsafe.user) {
        loginDiv.style.display = 'block';
    } else {
        // Если пользователь уже авторизован, показываем профиль
        showProfile(tg.initDataUnsafe.user);
    }

    // Обработчик нажатия на кнопку входа
    loginButton.addEventListener('click', function() {
        tg.expand(); // Расширяем приложение на весь экран
        tg.showPopup({
            title: 'Авторизация',
            message: 'Вы уверены, что хотите войти через Telegram?',
            buttons: [
                {id: 'yes', type: 'ok'},
                {id: 'no', type: 'close'}
            ]
        }, function(buttonId) {
            if (buttonId === 'yes') {
                tg.sendData(JSON.stringify({action: 'login'}));
                showProfile(tg.initDataUnsafe.user);
            }
        });
    });

    // Функция для отображения профиля
    function showProfile(user) {
        loginDiv.style.display = 'none';
        profileDiv.style.display = 'block';
        profileButton.style.display = 'block';

        firstName.textContent = user.first_name;
        lastName.textContent = user.last_name || '';
        username.textContent = user.username || '';
        photo.src = user.photo_url || '';
    }

    // Обработчик нажатия на кнопку профиля
    profileButton.addEventListener('click', function() {
        tg.showAlert('Это ваш профиль!');
    });
});
