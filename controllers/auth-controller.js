
const adminModel = require('../models/admin-model');
const pickupModel = require('../models/pickup-model');
const nodemailer = require('nodemailer');

exports.logOut = (req, res, next) => {
    req.session.destroy();
}

//---------------pickup-----------------
exports.getPickupLogin = (req, res, next) => {
    const error = req.flash('adminLoginError')[0];
    const reset = req.flash('resetSuccess')[0];
    const route = "/pickup/login";

    console.log(error);

    res.render('auth/login', {
        pageTitle: "pickup Login",
        isError: error,
        formPath: "/pickup/login",
        reset: reset,
        forgetLink: "/pickup/forgot"
    });
}

exports.postPickupLogin = (req, res, next) => {

    pickupModel.findOne({ email: req.body.email }).then(pickup => {
        if (pickup) {
            if (req.body.password === pickup.password) {
                if (pickup.status === 0) {
                    req.flash('pickupLoginError', 'Successfull login');
                    req.session.pickupData = pickup;
                    return res.redirect('/pickUpHome');
                } else {
                    req.flash('pickupLoginError', 'Password Reset request not completed');
                    return res.redirect('/pickup/login');
                }
            } else {
                req.flash('pickupLoginError', 'Email or Password INCORRECT');
                return res.redirect('/pickup/login');
            }
        } else {
            req.flash('pickupLoginError', 'Email or Password INCORRECT');
            return res.redirect('/pickup/login');
        }
    }).catch(err => {
        console.log(err);
        req.flash('pickupLoginError', 'Email or Password INCORRECT');
    });
}

exports.getpickupForgot = (req, res, next) => {
    const error = req.flash('pickupResetError')[0];
    console.log(error);

    res.render('auth/forgot-password', {
        pageTitle: "pickup Forgot Password",
        formPath: "/pickup/forgot",
        loginLink: "/pickup/login",
        isError: error
    });
}

exports.postpickupForgot = (req, res, next) => {

    pickupModel.findOne({
        email: req.body.email
    }).select('status').then(pickup => {
        console.log('pickup:', pickup);
        if (pickup) {
            pickup.status = 1
            return pickup.save();
        } else {
            req.flash('pickupResetError', 'Email NOT FOUND');
            return res.redirect('/pickup/forgot');
        }
    }).then(async result => {
        console.log('Result:', result);
        const resetLink = '<a href="http://localhost:3000/pickup-reset/' + result._id + '" target="_blank">Reset Password link</a>';
        console.log('Reset Link: ', resetLink);

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "placementproject789@gmail.com", // generated ethereal user
                pass: "sahilraja" // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const body = `
            <h1>Helping Hand</h1>
            <p>Use the link below to reset the password:-</p>` + resetLink;

        let info = await transporter.sendMail({
            from: '"Placement Project" <placementproject789@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Password Reset Request", // Subject line
            html: body
        });

        req.flash('resetSuccess', 'Check your email for reset link(check span too).');
        return res.redirect('/pickup/login');
    }).catch(err => {
        console.log(err);
        req.flash('pickupResetError', 'NETWORK ERROR');
        return res.redirect('/pickup/forgot');
    });

}

exports.getpickupPasswordReset = (req, res, next) => {
    const resetID = req.params.resetID;
    const error = req.flash('pickupLoginError')[0];

    pickupModel.findById(resetID).select("status").then(pickup => {
        if (pickup.status === 1) {
            return res.render('auth/reset-password', {
                pageTitle: "pickup Password Reset",
                isError: error,
                path: "/pickup-reset/" + resetID
            });
        } else {
            return res.status(404).send('Page not found');
        }
    }).catch(err => console.log(err));
}

exports.postpickupPasswordReset = (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const resetID = req.params.resetID;

    pickupModel.findById(resetID).select('status password').then(pickup => {
        if (pickup.status === 1) {
            if (password === confirmPassword) {
                pickup.status = 0;
                pickup.password = password;
                return pickup.save();
            } else {
                req.flash('pickupLoginError', 'Password did not match');
                return res.redirect("/pickup-reset/" + resetID);
            }
        } else {
            return res.status(404).send('Page not found');
        }
    }).then(result => {
        req.flash('resetSuccess', 'Please try logging in with new password');
        return res.redirect('/pickup/login');
    }).catch(err => console.log(err));
}


/** Admin Controllers are bwlow **/

exports.getAdminLogin = (req, res, next) => {
    const error = req.flash('adminLoginError')[0];
    const reset = req.flash('resetSuccess')[0];
    const route = "/admin/login";

    console.log(error);

    res.render('auth/login', {
        pageTitle: "Admin Login",
        isError: error,
        formPath: "/admin/login",
        reset: reset,
        forgetLink: "/admin/forgot"
    });
}

exports.postAdminLogin = (req, res, next) => {

    adminModel.findOne({ email: req.body.email }).then(admin => {
        if (admin) {
            if (req.body.password === admin.password) {
                if (admin.status === 0) {
                    req.flash('adminLoginError', 'Successfull login');
                    req.session.adminData = admin;
                    return res.redirect('/adminDashboard');
                } else {
                    req.flash('adminLoginError', 'Password Reset request not completed');
                    return res.redirect('/admin/login');
                }
            } else {
                req.flash('adminLoginError', 'Email or Password INCORRECT');
                return res.redirect('/admin/login');
            }
        } else {
            req.flash('adminLoginError', 'Email or Password INCORRECT');
            return res.redirect('/admin/login');
        }
    }).catch(err => {
        console.log(err);
        req.flash('adminLoginError', 'Email or Password INCORRECT');
    });
}

exports.getAdminForgot = (req, res, next) => {
    const error = req.flash('adminResetError')[0];
    console.log(error);

    res.render('auth/forgot-password', {
        pageTitle: "Admin Forgot Password",
        formPath: "/admin/forgot",
        loginLink: "/admin/login",
        isError: error
    });
}

exports.postAdminForgot = (req, res, next) => {

    adminModel.findOne({
        email: req.body.email
    }).select('status').then(admin => {
        console.log('Admin:', admin);
        if (admin) {
            admin.status = 1
            return admin.save();
        } else {
            req.flash('adminResetError', 'Email NOT FOUND');
            return res.redirect('/admin/forgot');
        }
    }).then(async result => {
        console.log('Result:', result);
        const resetLink = '<a href="http://localhost:3000/admin-reset/' + result._id + '" target="_blank">Reset Password link</a>';
        console.log('Reset Link: ', resetLink);

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "placementproject789@gmail.com", // generated ethereal user
                pass: "sahilraja" // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const body = `
            <h1>Helping Hand</h1>
            <p>Use the link below to reset the password:-</p>` + resetLink;

        let info = await transporter.sendMail({
            from: '"Placement Project" <placementproject789@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Password Reset Request", // Subject line
            html: body
        });

        req.flash('resetSuccess', 'Check your email for reset link(check span too).');
        return res.redirect('/admin/login');
    }).catch(err => {
        console.log(err);
        req.flash('adminResetError', 'NETWORK ERROR');
        return res.redirect('/admin/forgot');
    });

}

exports.getAdminPasswordReset = (req, res, next) => {
    const resetID = req.params.resetID;
    const error = req.flash('adminLoginError')[0];

    adminModel.findById(resetID).select("status").then(admin => {
        if (admin.status === 1) {
            return res.render('auth/reset-password', {
                pageTitle: "Admin Password Reset",
                isError: error,
                path: "/admin-reset/" + resetID
            });
        } else {
            return res.status(404).send('Page not found');
        }
    }).catch(err => console.log(err));
}

exports.postAdminPasswordReset = (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const resetID = req.params.resetID;

    adminModel.findById(resetID).select('status password').then(admin => {
        if (admin.status === 1) {
            if (password === confirmPassword) {
                admin.status = 0;
                admin.password = password;
                return admin.save();
            } else {
                req.flash('adminLoginError', 'Password did not match');
                return res.redirect("/admin-reset/" + resetID);
            }
        } else {
            return res.status(404).send('Page not found');
        }
    }).then(result => {
        req.flash('resetSuccess', 'Please try logging in with new password');
        return res.redirect('/admin/login');
    }).catch(err => console.log(err));
}
