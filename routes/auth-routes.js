const express = require('express');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.get('/admin/login', authController.getAdminLogin);

router.post('/admin/login', authController.postAdminLogin);

router.get('/pickup/login', authController.getPickupLogin);

router.post('/pickup/login', authController.postPickupLogin);

router.get('/admin-reset/:resetID', authController.getAdminPasswordReset);

router.post('/admin-reset/:resetID', authController.postAdminPasswordReset);

router.get('/admin/forgot', authController.getAdminForgot);

router.post('/admin/forgot', authController.postAdminForgot);


router.get('/pickup-reset/:resetID', authController.getpickupPasswordReset);

router.post('/pickup-reset/:resetID', authController.postpickupPasswordReset);

router.get('/pickup/forgot', authController.getpickupForgot);

router.post('/pickup/forgot', authController.postpickupForgot);

module.exports = router;