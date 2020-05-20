const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbSessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');

const DATABASE_URI = "mongodb+srv://web-app:sample-pass@svm-software-solutions-mt2zs.mongodb.net/donationManagementDB";

const publicRoutes = require('./routes/public-routes');
const authRoutes = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin-routes');
const pickupRoutes = require('./routes/pickUp-routes');
const app = express();
const sessionStore = new mongodbSessionStore({
    uri: DATABASE_URI,
    collection: 'session',
    expires: 100 * 60 * 60 * 24 // setting session life for 24 hours in the database 
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/donation-pics');
    },
    filename: (req, file, cb) => {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('donationImage'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "ThisIsSomeLongString", saveUninitialized: false, resave: false, store: sessionStore }));
app.use(flash());
app.use(publicRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(pickupRoutes);
app.use('/', (req, res, next) => {
    res.status(404).send("<h1>Page Not Found</h1>");
})

mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    app.listen(3000, () => {
        console.log('server running at port 3000.....');
    });
}).catch(err => {
    console.log(err);
});

mongoose.set('useFindAndModify', false);