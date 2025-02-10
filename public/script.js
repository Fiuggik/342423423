document.addEventListener('DOMContentLoaded', function() {
    const profileDiv = document.getElementById('profile');
    const profileButton = document.getElementById('profile-button');
    const subscribeButton = document.getElementById('subscribe-button');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const username = document.getElementById('username');
    const photo = document.getElementById('photo');

    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;

    // Проверяем, авторизован ли пользователь
    if (tg.initDataUnsafe.user) {
        // Если авторизован, показываем профиль
        showProfile(tg.initDataUnsafe.user);
    }

    // Функция для отображения профиля
    function showProfile(user) {
        profileDiv.style.display = 'block';
        profileButton.style.display = 'block';
        subscribeButton.style.display = 'block';

        firstName.textContent = user.first_name;
        lastName.textContent = user.last_name || '';
        username.textContent = user.username || '';
        photo.src = user.photo_url || '';
    }

    // Обработчик нажатия на кнопку профиля
    profileButton.addEventListener('click', function() {
        tg.showAlert('Это ваш профиль!');
    });

    // Обработчик нажатия на кнопку подписки
    subscribeButton.addEventListener('click', function() {
        // Открываем платежное окно Telegram
        tg.showInvoice({
            title: 'Подписка',
            description: 'Оформите подписку за платные звезды Telegram XTR.',
            currency: 'XTR',
            prices: [
                { label: '1 месяц', amount: '500' }, // Пример цены: $5.00
                { label: '3 месяца', amount: '1200' }, // Пример цены: $12.00
            ],
            payload: JSON.stringify({ subscription: 'xtr' }), // Уникальный идентификатор платежа
        }, function(invoiceStatus) {
            if (invoiceStatus === 'paid') {
                tg.showAlert('Подписка успешно оформлена!');
            } else {
                tg.showAlert('Оплата не завершена.');
            }
        });
    });
});
