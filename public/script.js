document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;

    // Получение данных пользователя из Telegram
    const user = tg.initDataUnsafe.user;
    if (user) {
        document.getElementById('photo').src = user.photo_url;
        document.getElementById('first-name').textContent = user.first_name;
        document.getElementById('last-name').textContent = user.last_name;
        document.getElementById('username').textContent = user.username;

        // Сохранение данных пользователя на сервере
        fetch('http://localhost:3000/save-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                telegram_id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username
            })
        }).then(response => response.json())
          .then(data => {
              console.log('User saved:', data);
          });
    }

    // Обработка нажатий на кнопки
    document.getElementById('button-1').addEventListener('click', () => saveAction(1));
    document.getElementById('button-2').addEventListener('click', () => saveAction(2));
    document.getElementById('button-3').addEventListener('click', () => saveAction(3));
    document.getElementById('button-4').addEventListener('click', () => saveAction(4));

    function saveAction(buttonId) {
        fetch('http://localhost:3000/save-action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user.id,
                action: `Button ${buttonId} clicked`
            })
        }).then(response => response.json())
          .then(data => {
              console.log('Action saved:', data);
          });
    }
});
