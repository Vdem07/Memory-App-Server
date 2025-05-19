const Router = require('express')
const router = new Router()

const UserRouter = require('./UserRouter')
const lifelineRouter = require('./lifelineRouter');
const lifelineEventRouter = require('./lifelineEventRouter');
const photoRouter = require('./photoRouter');
// const videoRouter = require('./videoRouter');
// const fileRouter = require('./fileRouter');
// const favoriteLifeLineRouter = require('./favoriteLifeLineRouter');
// const deletedLifeLineRouter = require('./deletedLifeLineRouter');


router.use('/User', UserRouter)
router.use('/LifeLine', lifelineRouter)
router.use('/LifeLineEvent', lifelineEventRouter)
router.use('/Photo', photoRouter)
// router.use('/Video', videoRouter)
// router.use('/File', fileRouter)
// router.use('/favoriteLifeLines', favoriteLifeLineRouter);
// router.use('/deletedLifeLines', deletedLifeLineRouter);

module.exports = router