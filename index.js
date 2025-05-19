require('dotenv').config();
const express = require('express');
const cors = require('cors');
const CookieParser = require('cookie-parser');
const sequelize = require('./db');

const models = require('./models/models')

const router = require('./routes/index')

const fileUpload = require('express-fileupload')

const path = require('path')

const app = express();
app.use(cors({ origin: '*' }));
app.use(CookieParser());
app.use(express.json())
// app.use(express.static(path.resolve(__dirname, 'static')))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(fileUpload())
app.use('/api', router)

const PORT = process.env.PORT || 5000;

// Проверка подключения к базе данных
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Успешное подключение к базе данных через Sequelize');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    process.exit(1); // Завершить процесс при ошибке
  }
};

// Пример маршрута для выполнения запроса
// app.get('/test-db', async (req, res) => {
//   try {
//     const [results, metadata] = await sequelize.query('SELECT NOW()');
//     res.json({ time: results[0].now });
//   } catch (e) {
//     console.error('Ошибка при выполнении запроса:', e);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

app.get('/', (req, res) => {
  res.status(200).json({message: "Working!"})
})

const start = async () => {
  try {
    await connectDB(); // Подключение к базе данных
    app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
  } catch (e) {
    console.log('Ошибка при запуске сервера:', e);
  }
};

start();
