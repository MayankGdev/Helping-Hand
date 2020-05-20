const addressModel = require('../models/address').Model;
const pickupModel = require('../models/pickup-model');
const DonorModel = require('../models/donor-model');
const DonationModel = require('../models/donation-model');
const fdate = require('../utils/date');

exports.getDashboardAdmin = async (req, res, next) => {
  const donations = await DonationModel.find().populate('donorId');
  const donors = await DonorModel.find();
  const pickup = await pickupModel.find();
  const upcomingDonations = await DonationModel.find({ $and: [{ accepted: false }, { pickUpDateAndTime: { $gte: new Date() } }] });
  res.render("admin/dashboard", {
    pageTitle: "dashboard",
    adminInfo: req.session.adminData,
    donations: donations,
    donors: donors,
    donationLength: donations.length,
    donorsLength: donors.length,
    upcomingdonlength: upcomingDonations.length,
    pickuplen: pickup.length,
    active: true
  });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/admin/login");
};
exports.getpickupRegister = (req, res, next) => {
  res.render("admin/pickupRegistration", {
    pageTitle: "Pickup Registration",
    adminInfo: req.session.adminData,
    active: true
  });
}
exports.getadminProfile = (req, res, next) => {
  res.render("admin/adminProfile", {
    pageTitle: "Admin Profile",
    adminInfo: req.session.adminData,
    fodate: fdate.getFormattedDate(req.session.adminData.joinedOn),
    active: true
  });
}
exports.postpickupRegister = (req, res, next) => {
  const Address = new addressModel({
    addressLineOne: req.body.address1,
    addressLineTwo: req.body.address2,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode
  });
  const pickup = new pickupModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.Phone,
    password: req.body.password,


    address: Address
  });
  pickup.save();
  res.redirect('/adminDashboard');
}

exports.getDonarPage = async (req, res, next) => {
  const donors = await DonorModel.find();
  res.render('admin/donorList', {
    pageTitle: "Donors List",
    adminInfo: req.session.adminData,
    donors: donors,
    active: true

  });
}
exports.getDonarviewPage = async (req, res, next) => {
  const donor = await DonorModel.findById(req.params.donor);
  res.render('admin/viewDonor', {
    pageTitle: "Donor Profile",
    adminInfo: req.session.adminData,
    donor: donor,
    active: true
  });
}
exports.getDonationPage = async (req, res, next) => {
  const donations = await DonationModel.find().populate('donorId');

  res.render('admin/donationlist', {
    pageTitle: "Donation List",
    adminInfo: req.session.adminData,
    donations: donations,
    active: true
  });
}
exports.getDonationviewPage = async (req, res, next) => {
  const donation = await DonationModel.findById(req.params.donation).populate('donorId');
  res.render('admin/viewDonation', {
    pageTitle: "View Donation",
    adminInfo: req.session.adminData,
    donation: donation,
    fodate: fdate.getFormattedDate(donation.pickUpDateAndTime),
    active: true
  });
}