const Router = require('express');
const router = new Router();
const EventController = require('../controllers/LifeLineEventController');

router.post('/', EventController.create);
router.get('/', EventController.getAll);
router.get('/:id', EventController.getById);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.delete);

module.exports = router;
