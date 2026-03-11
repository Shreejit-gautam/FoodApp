const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/user/register', authController.registeruser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutuser)
router.post('/foodpartner/register', authController.registerFoodPartner)
router.post('/foodpartner/login',authController.loginfoodpartner)
router.get('/foodpartner/logout',authController.logoutfoodpartner)
module.exports = router
