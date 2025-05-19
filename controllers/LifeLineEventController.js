const {LifeLineEvent} = require('../models/models');

class LifeLineEventController {
  async create(req, res) {
    try {
      const { title, description, event_date, lifeline_id } = req.body;

      // Создаем новое событие
      const event = await LifeLineEvent.create({ title, description, event_date, lifeline_id });
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании события', error });
    }
  }

  async getAll(req, res) {
    try {
      const { lifelineId } = req.query; // Получаем параметр из query строки (если он есть)
      
      // Если lifelineId передан, фильтруем по нему, иначе получаем все события
      const conditions = lifelineId ? { where: { lifeline_id: lifelineId } } : {};
      
      const events = await LifeLineEvent.findAll(conditions); // Получаем события по условиям
      res.json(events); // Возвращаем данные
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении событий', error });
    }
  }
  

  async getById(req, res) {
    try {
      const { id } = req.params;
      const event = await LifeLineEvent.findByPk(id);
      res.json(event || { message: 'Событие не найдено' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении события', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, event_date, is_favourite, is_deleted } = req.body;
      const updated = await LifeLineEvent.update({ title, description, event_date, is_favourite, is_deleted }, { where: { id } });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении события', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await LifeLineEvent.destroy({ where: { id } });
      res.json({ message: 'Событие удалено' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении события', error });
    }
  }
}

module.exports = new LifeLineEventController();
