const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Import libs
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

// Config libs
app.set('view engine', 'ejs');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/learning').then(data => {
    console.log('Connected Mongodb successfully!');
}).catch(err => {
    console.log(`Error happened when connecting mongodb: ${err}`);
});
app.use('/public' , express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
// const userRoute = require('./routes/user.route');
const testApi = require('./routes/testapi.route');

// Use routes
app.use('/api/test', testApi);

app.get('/', (req, res) => {
    const query = req.query
    res.render('index', {
        query
    });
})

app.listen(port, () => {
    console.log(`Server is starting at port ${port}`);
})