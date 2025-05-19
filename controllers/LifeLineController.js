const {LifeLine} = require('../models/models');

class LifeLineController {
  async create(req, res) {
    try {
      const { title, description, user_id } = req.body;
      const lifeline = await LifeLine.create({ title, description, user_id });
      res.json(lifeline);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании линии жизни', error });
    }
  }

  async getAll(req, res) {
    try {
      // Получаем user_id из query параметров запроса
      const { userId } = req.query;
  
      // Если userId не передан, возвращаем все линии жизни
      // Если передан, фильтруем по user_id
      const lifelines = userId 
        ? await LifeLine.findAll({ where: { user_id: userId } })  // Фильтрация по user_id
        : await LifeLine.findAll();  // Без фильтрации, если нет userId
  
      res.json(lifelines);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении линий жизни', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const lifeline = await LifeLine.findByPk(id);
      res.json(lifeline || { message: 'Линия жизни не найдена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении линии жизни', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, is_favourite, is_deleted } = req.body;
      const updated = await LifeLine.update({ title, description, is_favourite, is_deleted }, { where: { id } });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении линии жизни', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await LifeLine.destroy({ where: { id } });
      res.json({ message: 'Линия жизни удалена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении линии жизни', error });
    }
  }
}

module.exports = new LifeLineController();
