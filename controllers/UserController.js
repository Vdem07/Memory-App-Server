const { User } = require('../models/models'); // Импорт модели User
const bcrypt = require('bcrypt'); // Для хэширования пароля
const jwt = require('jsonwebtoken'); // Для работы с JWT

// Функция для генерации JWT
const generateJwt = (id, name, role, email) => {
  return jwt.sign(
    { id, name, role, email }, 
    process.env.SECRET_KEY, 
    { expiresIn: '24h' } // Время действия токена
  );
}

class UserController {

  // Регистрация через Google
  async googleAuth(req, res) {
    try {
      const { token } = req.body;

      // ✅ Получаем данные пользователя с помощью access_token
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`);
    const userData = await response.json();

    const email = String(userData.email);;
    const name =  String(userData.name);
    const sub =  String(userData.sub);


      let user = await User.findOne({ where: { email } });

      // Хэшируем пароль
      const password_hash = await bcrypt.hash(sub, 10);

      if (!user) {
        user = await User.create({ name, email, password_hash: password_hash });
      }

      const jwtToken = generateJwt(user.id, user.name, user.role, user.email);

      // ✅ Возвращаем наш JWT и данные пользователя
      return res.json({ token: jwtToken, user });
    } catch (error) {
      console.error("Ошибка Google авторизации:", error);
      return res.status(500).json({ message: "Ошибка при авторизации через Google" });
    }
  }

  // Регистрация через Яндекс

async yandexAuth(req, res) {
  try {
    const { token } = req.body;
    const response = await fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`);
    const userData = await response.json();
    
    const email = String(userData.default_email);
    const name = String(userData.real_name || "Яндекс Пользователь");
    const sub = String(userData.id);
    
    let user = await User.findOne({ where: { email } });
    const password_hash = await bcrypt.hash(sub, 10);
    
    if (!user) {
      user = await User.create({ name, email, password_hash: password_hash });
    }
    
    const jwtToken = generateJwt(user.id, user.name, user.role, user.email);
    return res.json({ token: jwtToken, user });
  } catch (error) {
    console.error("Ошибка Яндекс авторизации:", error);
    return res.status(500).json({ message: "Ошибка при авторизации через Яндекс" });
  }
}

async yandexAuthMobile(req, res) {
  try {
      const { id, mail, name, surname, birthday, photo } = req.body;  // Получаем данные пользователя

      if (!id || !mail) {
          return res.status(400).json({ message: "Некорректные данные от Яндекса" });
      }

      const email = String(mail);
      const fullName = name && surname ? `${name} ${surname}` : name || "Яндекс Пользователь";
      const sub = String(id);

      let user = await User.findOne({ where: { email } });
      const password_hash = await bcrypt.hash(sub, 10);

      if (!user) {
          user = await User.create({ name: fullName, email, password_hash: password_hash });
      }

      const jwtToken = generateJwt(user.id, user.name, user.role, user.email);
      return res.json({ token: jwtToken, user });
  } catch (error) {
      console.error("Ошибка Яндекс авторизации:", error);
      return res.status(500).json({ message: "Ошибка при авторизации через Яндекс" });
  }
}


  async registration(req, res) {

    const { name, role, email, password } = req.body;

     // Проверка на наличие обязательных полей
     if (!name || !email || !password) {
      return res.status(400).json({ message: 'Пожалуйста, введите имя, email или пароль' });
    }

    // Проверка, существует ли пользователь с таким email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хэшируем пароль
    const password_hash = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const user = await User.create({ name, role, email, password_hash });

    // Генерируем JWT
    const token = generateJwt(user.id, user.name, user.role, user.email);
    return res.json({token});
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Проверка на ввод email и пароля
      if (!email || !password) {
        return res.status(400).json({ message: 'Введите email и пароль' });
      }

      // Поиск пользователя в базе данных
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Пользователь с таким email не найден' });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверный пароль' });
      }

      // Генерация токена
      const token = generateJwt(user.id, user.name, user.role, user.email);

      return res.json({ token });
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      res.status(500).json({ message: 'Ошибка авторизации', error });
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.name, req.user.role, req.user.email);
    return res.json({token});
  }
}

module.exports = new UserController();
