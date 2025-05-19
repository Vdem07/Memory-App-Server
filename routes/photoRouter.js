const Router = require('express');
const router = new Router();
const PhotoController = require('../controllers/PhotoController');

router.post('/', PhotoController.create);
router.get('/', PhotoController.getByEvent);
router.delete('/:id', PhotoController.delete);

module.exports = router;
