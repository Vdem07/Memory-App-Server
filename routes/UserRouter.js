const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/Registration',UserController.registration)
router.post('/Login',UserController.login)
router.get('/Auth',authMiddleware, UserController.check)
router.post('/googleAuth', UserController.googleAuth);
router.post('/yandexAuth', UserController.yandexAuth);
router.post('/yandexAuthMobile', UserController.yandexAuthMobile);

module.exports = router