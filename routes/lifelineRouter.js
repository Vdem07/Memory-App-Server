const Router = require('express');
const router = new Router();
const LifeLineController = require('../controllers/LifeLineController');

router.post('/', LifeLineController.create);
router.get('/', LifeLineController.getAll);
router.get('/:id', LifeLineController.getById);
router.put('/:id', LifeLineController.update);
router.delete('/:id', LifeLineController.delete);

module.exports = router;
