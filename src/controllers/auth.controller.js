const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config/secret_key.config');

class Auth {
    // Check if user has logged in ?
    async loggedIn(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                next();
            } else {
                const user = jwt.verify(token.split(' ')[1], SECRET_KEY);
                if (user) {
                    return res.redirect('./');
                }
            }
        } catch (e) {
            res.clearCookie('token');
            return res.redirect('./login');
        }
    }

    async isAdmin(req, res, next) {
        const rawToken = req.cookies.token ?? " ";
        try {
            const token = rawToken.split(" ")[1];
            const user = jwt.verify(token, SECRET_KEY);
            if (user.role === "Admin") {
                req.user = user;
                next();
            } else return res.redirect('/admincp/login');
        } catch (e) {
            res.clearCookie('token');
            return res.redirect('/admincp/login');
        }
    }

    async loginAdmin(req, res) {

        try {
            const {username, password} = req.body;
            const user = await userModel.findOne({
                username,
                password
            });
            if (user) {
                const id = user._id;
                const role = user.is_admin ? "Admin" : "Customer";
                const token = jwt.sign({
                    id, role
                }, SECRET_KEY, {expiresIn: "1h"});
                res.cookie('token', 'Bearer ' + token, {
                    httpOnly: true,
                    // maxAge: 1 * 60 * 60 * 1000
                })
                return res.redirect('./');
            } else return res.redirect('/admincp/login');
        } catch (e) {
            return res.status(500).send("Error happened: " + e);
        }
    }

    async logout(req, res) {
        res.clearCookie('token');
        return res.redirect('/admincp/login');
    }

    // Customer middleware check logged-in
    async isUser(req, res, next) {
        const rawToken = req.cookies.token ?? " ";
        try {
            const token = rawToken.split(" ")[1];
            const user = jwt.verify(token, SECRET_KEY);
            if (user.role === "Customer") {
                req.user = user;
                next();
            } else return res.redirect('/');
        } catch (e) {
            res.clearCookie('token');
            return res.redirect('/login');
        }
    }

    // Customer register control
    async register(req, res) {
        try {
            const {username, password} = req.body;
            const existUser = await userModel.findOne({username});

            if (existUser) return res.redirect('/register');

            const newUser = await userModel.create({
                username,
                password,
                status: true,
                is_admin: false
            })
            // return res.status(201).json({
            //     status: 201,
            //     msg: "Registered successfully!"
            // })
            const token = 'Bearer ' + jwt.sign({
                id: newUser._id,
                role: "Customer"
            }, SECRET_KEY, {expiresIn: "1h"});
            res.cookie('token', token, {
                httpOnly: true
            });
            return res.redirect('/');

        } catch (e) {
            return res.status(500).send("Error happened: " + e);
        }
    }

    // Customer login control
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await userModel.findOne({username, password});
            if (!user) {
                return res.redirect('/login');
            }

            const token = 'Bearer ' + jwt.sign({
                id: user._id,
                role: 'Customer'
            }, SECRET_KEY, {expiresIn: '1h'});
            res.cookie('token', token, {
                httpOnly: true
            });
            return res.redirect('/');
        } catch (e) {
            return res.status(500).send('Error happened: ' + e);
        }
    }

    async logoutCustomer(req, res) {
        res.clearCookie('token');
        return res.redirect('/');
    }
}

module.exports = new Auth();