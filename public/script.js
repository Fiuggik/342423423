// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Элементы DOM
const firstNameElement = document.getElementById('first-name');
const lastNameElement = document.getElementById('last-name');
const usernameElement = document.getElementById('username');
const photoElement = document.getElementById('photo');
const profileButton = document.getElementById('profile-button');
const requestsList = document.getElementById('requests-list');
const createRequestButton = document.getElementById('create-request-button');

// Массив для хранения заявок (в реальном приложении данные будут храниться на сервере)
let requests = [];

// Функция для отображения данных профиля
function showProfile() {
    const user = tg.initDataUnsafe.user; // Получаем данные пользователя

    if (user) {
        firstNameElement.textContent = user.first_name || 'Не указано';
        lastNameElement.textContent = user.last_name || 'Не указано';
        usernameElement.textContent = user.username ? `@${user.username}` : 'Не указано';
        photoElement.src = user.photo_url || ''; // URL фото профиля
    } else {
        alert('Данные пользователя недоступны.');
    }
}

// Функция для отображения заявок
function showRequests() {
    requestsList.innerHTML = ''; // Очищаем список перед обновлением

    if (requests.length === 0) {
        requestsList.innerHTML = '<p>Заявок пока нет.</p>';
        return;
    }

    requests.forEach((request, index) => {
        const requestElement = document.createElement('div');
        requestElement.className = 'request-item';
        requestElement.innerHTML = `
            <p><strong>Заявка #${index + 1}</strong></p>
            <p><strong>Маршрут:</strong> ${request.route}</p>
            <p><strong>Описание:</strong> ${request.description}</p>
            <p><strong>Статус:</strong> ${request.status}</p>
        `;
        requestsList.appendChild(requestElement);
    });
}

// Функция для создания новой заявки
function createRequest() {
    const route = 'Москва - Московская область'; // Пример маршрута
    const description = prompt('Введите описание груза:'); // Запрашиваем описание у пользователя

    if (description) {
        const newRequest = {
            route: route,
            description: description,
            status: 'Новая', // Статус заявки
        };
        requests.push(newRequest); // Добавляем заявку в массив
        showRequests(); // Обновляем список заявок
    }
}

// Обработчик нажатия на кнопку "Профиль"
profileButton.addEventListener('click', () => {
    showProfile();
});

// Обработчик нажатия на кнопку "Создать заявку"
createRequestButton.addEventListener('click', () => {
    createRequest();
});

// Инициализация приложения
tg.ready(); // Сообщаем Telegram, что приложение готово к использованию
showRequests(); // Показываем заявки при загрузке страницы
