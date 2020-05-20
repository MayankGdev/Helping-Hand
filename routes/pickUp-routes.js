const router = require('express').Router();
const pickUpController = require('../controllers/pickUp-controller');

router.get('/PickUpHome',pickUpController.getPickUpDashboard);
router.get('/pickUpProfile',pickUpController.getPickUpProfile);
router.get('/pickUp/donatonView:donationID',pickUpController.getDonationView);
router.get('/pickup/donationApproval:donationID',pickUpController.geDonationApproval);
router.post('/pickup/donationApproval/:donationID',pickUpController.postDonationApproval);
router.get('/pickup/donationRemove/:donationID',pickUpController.postDonationRemove);
router.get('/pickup/upcomingDonations',pickUpController.getDonationList);
router.get('/pickup/history',pickUpController.getHisory);
router.get('/pickup/logOut',pickUpController.PickUpLogOut);

module.exports = router;