const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Import libs
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
app.set('views', path.join(__dirname, '/src/views'));

// Config libs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/master_layout');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/learning').then(data => {
    console.log('Connected Mongodb successfully!');
}).catch(err => {
    console.log(`Error happened when connecting mongodb: ${err}`);
});
app.use('/public' , express.static(path.join(__dirname, '/src/public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
// const userRoute = require('./routes/user.route');
const testApi = require('./src/routes/testapi.route');
const adminRoute = require('./src/routes/admin.route');

// Use routes
app.use('/api/test', testApi);
app.use('/admincp', adminRoute);

app.get('/', (req, res) => {
    const query = req.query;
    res.render('admin/view_users');
})

// app.get('/admincp/', (req, res) => {
//     res.render('admin/dashboard');
// })

app.listen(port, () => {
    console.log(`Server is starting at port ${port}`);
})