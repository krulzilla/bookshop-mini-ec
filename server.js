const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Import libs
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

// Config libs
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

// Use routes
// app.use('/api/user', userRoute);

app.get('/', (req, res, next) => {
    res.send('Hello world~');
})

app.listen(port, () => {
    console.log(`Server is starting at port ${port}`);
})