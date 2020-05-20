const express = require('express');
const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/adminDashboard', adminController.getDashboardAdmin);
router.get('/pickupRegistration', adminController.getpickupRegister);
router.post('/pickupRegistration', adminController.postpickupRegister);
router.get('/adminprofile',adminController.getadminProfile);
router.get('/admin/logout', adminController.postLogout);
router.get('/admin/donar',adminController.getDonarPage);
router.get('/admin_donor/:donor',adminController.getDonarviewPage);
router.get('/admin/donation',adminController.getDonationPage);
router.get('/admin_donation/:donation',adminController.getDonationviewPage);

module.exports = router;