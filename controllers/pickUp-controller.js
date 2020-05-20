const donationModel = require('../models/donation-model');
const donorModel = require('../models/donor-model');

exports.getPickUpDashboard = async (req,res,next) =>{
    const totalDonation = await donationModel.find();
    const upcomingDonations = await donationModel.find({ $and: [{accepted:false}, {pickUpDateAndTime : {$gte : new Date()}}]});
    const totalDonors = await donorModel.find();
    const totalAccepted = await donationModel.find({accepted:true});
    const donationData = await donationModel.find({ $and: [{accepted:false}, {pickUpDateAndTime : {$gte : new Date()}}]}).populate('donorId');
    const historyData = await donationModel.find({accepted:true}).populate('donorId');;
    res.render('pickup/pickUpDashboard',{
        pageTitle: 'Home',
        pickUpInfo: req.session.pickupData,
        total: totalDonation.length,
        upcoming: upcomingDonations.length,
        donor: totalDonors.length,
        accepted: totalAccepted.length,
        donation: donationData,
        history: historyData
    });
    console.log(totalDonation.length);
    console.log(totalDonation);
}

exports.getPickUpProfile = async (req,res,next) =>{
    res.render('pickup/pickUpProfile',{
        pageTitle: 'Profile',
        pickUpInfo: req.session.pickupData
    });
}

exports.getDonationView = async (req,res,next) =>{
    const donationData = await donationModel.findOne({_id:req.params.donationID}).populate('donorId');
    res.render('pickup/donationView',{
        pageTitle: 'Donation View',
        pickUpInfo: req.session.pickupData,
        donation: donationData
    });
}

exports.geDonationApproval = async (req,res,next) =>{
    const donationData = await donationModel.findOne({_id:req.params.donationID}).populate('donorId');
    res.render('pickup/donationApproval',{
        pageTitle: 'Donation Approval',
        pickUpInfo: req.session.pickupData,
        donation: donationData
    });
}

exports.postDonationApproval = async (req,res,next) =>{
    const arr = [];
    console.log("body: "+req.body.chbx);
    var checkboxArr = req.body.chbx;
    if(Array.isArray(checkboxArr)){
      console.log("true");
    }else{
      checkboxArr = [checkboxArr];
      console.log(checkboxArr);
    }
    console.log("chbx",checkboxArr);
    if( typeof checkboxArr[0] === 'undefined'){
        console.log('empty :');
    }else{
        const donationData = await donationModel.findOne({_id:req.params.donationID});
        const keys = Object.values(donationData.donation);
        for(let item of keys){
            for(let id of checkboxArr){
                if(id == item.name){
                    arr.push(item);
                }
            }
        }
        console.log(arr);
        donationData.accepted = true;
        donationData.donation = arr;
        donationData.pickedBy = req.session.pickupData._id;
        donationData.save();
        res.redirect('/pickup/upcomingDonations');
    }
    
    
}

exports.postDonationRemove = async (req,res,next) =>{
    console.log(req.params.donationID);
    const donationData = await donationModel.findOneAndDelete({_id:req.params.donationID});
    console.log(donationData);
    res.redirect('/pickup/upcomingDonations');
}

exports.getDonationList = async (req,res,next) =>{
    const donationData = await donationModel.find({ $and: [{accepted:false}, {pickUpDateAndTime : {$gte : new Date()}}]}).populate('donorId');
    res.render('pickup/upcomDonationList',{
        pageTitle: "Upcoming Donations",
        pickUpInfo: req.session.pickupData,
        donation: donationData
    });
}

exports.getHisory = async (req,res,next) =>{
    const donationData = await donationModel.find({accepted:true}).populate('donorId');;
    res.render('pickup/history',{
        pageTitle: "History",
        pickUpInfo: req.session.pickupData,
        donation: donationData
    });
}

exports.PickUpLogOut = async (req,res,next) =>{
    req.session.destroy();
    res.redirect('/');
}