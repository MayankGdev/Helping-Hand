const AddressModel = require('../models/address').Model;
const DonationItemModel = require('../models/donation-item').Model;
const DonationModel = require('../models/donation-model');
const DonorModel = require('../models/donor-model');

getDateFromToday = (days) => {
    const currentDate = new Date();
    return currentDate.setDate(currentDate.getDate() + days);
}

exports.getIndexPage = (req, res, next) => {
    res.render('public/index');
}

exports.getMakeDonation = (req, res, next) => {
    const donationTable = req.session.donationTable;
    res.render('public/select-donation-item', {
        donationArray: donationTable
    });
}

exports.postAddDonationItem = (req, res, next) => {
    let table = req.session.donationTable;
    if (table) {
        table.push({ name: req.body.name, quantity: req.body.quantity });
    } else {
        table = [];
        table.push({ name: req.body.name, quantity: req.body.quantity })
        req.session.donationTable = table;
    }
    req.session.donationTable = table;
    res.redirect('/make-donation');
}

exports.getRemoveDonationItem = (req, res, next) => {
    const donationTable = req.session.donationTable;
    donationTable.splice(req.params.index, 1);
    req.session.donationTable = donationTable;

    if (donationTable.length < 1) {
        req.session.destroy();
    }
    res.redirect('/make-donation');

}

exports.getDonorDetailsPage = (req, res, next) => {
    if (req.session.donationTable) {
        res.render('public/donor-details');
    } else {
        res.redirect('/invalid-page');
    }
}

exports.postRegisterDonor = async (req, res, next) => {
    const image = req.file;
    try {
        if (!image) {
            throw new Error('Please select a valid image');
        }

        let donor = await DonorModel.findOne({ email: req.body.email });
        if (!donor) {
            donor = new DonorModel(req.body);
            donor.address = new AddressModel(req.body);
            donor = await donor.save();
        }

        const donationItems = [];
        req.session.donationTable.map(item => {
            donationItems.push(new DonationItemModel(item));
        })

        let donation = new DonationModel({
            donationPic: image.filename,
            donorId: donor._id,
            donation: donationItems,
            pickUpDateAndTime: getDateFromToday(7)
        });
        donation = await donation.save();

        await req.session.destroy();

        return res.redirect(`/donation-summary/${donation._id}`);
    } catch (err) {
        return res.render('public/donor-details', { msg: err });
    }
}

exports.getDonationSummary = async (req, res, next) => {
    const donationID = req.params.donationId;
    const donation = await DonationModel.findById(donationID).populate('donorId');
    console.log('donation id: ', donationID);
    console.log('Donation Details: ', donation);

    if (donation) {
        return res.render('public/donation-summary', { donation });
    } else {
        return res.redirect('/page-not-found');
    }
}