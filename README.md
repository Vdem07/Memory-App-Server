# Серверная часть проекта "Классификатор событий учебной и производственной деятельности"

Серверная часть веб-приложения для создания и управления событиями, связанными с учебной и производственной деятельностью. Реализована на Node.js с использованием Express и PostgreSQL, с ORM-библиотекой Sequelize для удобной работы с базой данных.

## ⚙️ Основные функции

- Регистрация и авторизация пользователей (JWT и OAuth)
- Работа с пользовательскими профилями
- Создание, редактирование и удаление тематических групп
- Управление событиями: описание, даты, вложения
- Добавление в избранное
- Защищённый доступ к данным

## 🧰 Технологии

- **Node.js + Express.js** – сервер и маршрутизация
- **PostgreSQL** – база данных
- **Sequelize ORM** – взаимодействие с БД
- **JWT** – токены для аутентификации
- **OAuth2** – вход через внешние сервисы

## 📁 Установка и запуск

```bash
git clone https://github.com/Vdem07/Memory-App-Server.git
cd Memory-App-Server
npm install
npm start
```

## ⚙️ Переменные окружения

Создайте файл `.env` в корне проекта со следующим содержимым:

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
```

## 🛠️ Миграции и работа с БД

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 📃 Лицензия

Проект распространяется под MIT лицензией.
