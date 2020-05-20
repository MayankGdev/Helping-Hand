const router = require('express').Router();

const publicController = require('../controllers/public-controller');

router.get('/', publicController.getIndexPage);

router.get('/make-donation', publicController.getMakeDonation);

router.post('/add-donation-item', publicController.postAddDonationItem);

router.get('/remove-donation-item/:index', publicController.getRemoveDonationItem);

router.get('/donor-details', publicController.getDonorDetailsPage);

router.post('/register-donor', publicController.postRegisterDonor);

router.get('/donation-summary/:donationId', publicController.getDonationSummary);

module.exports = router;