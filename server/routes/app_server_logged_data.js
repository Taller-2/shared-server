const router = require('express').Router()
const appServerLoggedDataController = require('../controllers/app_server_logged_data')
const authUtils = require('../middlewares/auth')
router.use(authUtils.requireAuth)

router.get('/', appServerLoggedDataController.makeAnalysis)
module.exports = router
