const { Photo } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class PhotoController {
  async create(req, res) {
    try {
      const { event_id } = req.query;
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: 'Файл не был загружен' });
      }

      const file = req.files.file;
      const filename = uuid.v4() + path.extname(file.name);
      const description = Buffer.from(file.name, 'binary').toString('utf8');
      const uploadPath = path.resolve(__dirname, '..', 'uploads');

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      file.mv(path.join(uploadPath, filename), async (err) => {
        if (err) {
          return res.status(500).json({ message: 'Ошибка при сохранении файла', error: err });
        }

        const photo = await Photo.create({ url: filename, event_id, description: description });
        res.json({ id: photo.id, url: `/uploads/${filename}`, description: photo.description });
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении фото', error });
    }
  }

  async getByEvent(req, res) {
    try {
      const { event_id } = req.query;
      const photos = await Photo.findAll({ where: { event_id } });

      const formattedPhotos = photos.map(photo => ({
        id: photo.id,
        url: `/uploads/${photo.url}`,
        description: photo.description
      }));

      res.json(formattedPhotos);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении фото', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const photo = await Photo.findOne({ where: { id } });

      if (!photo) {
        return res.status(404).json({ message: "Фото не найдено" });
      }

      const filePath = path.resolve(__dirname, '..', 'uploads', photo.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await Photo.destroy({ where: { id } });
      res.json({ message: 'Фото удалено' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении фото', error });
    }
  }
}

module.exports = new PhotoController();

