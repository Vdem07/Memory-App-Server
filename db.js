const { Sequelize } = require('sequelize');

// Создаем экземпляр Sequelize для подключения к базе данных
module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Отключаем SQL-логи в консоли (по желанию)
  });