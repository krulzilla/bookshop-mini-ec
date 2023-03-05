const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/secret_key.config');

class Auth {
    async isAdmin(req, res, next) {
        const token = req.cookies.token;
        try {
            const user = jwt.verify(token, SECRET_KEY);
            if (user.role === "Admin") {
                req.user = user;
                next();
            } else return res.redirect('/');
        } catch (e) {
            res.clearCookie('token');
            return res.redirect('./login');
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
                res.cookie('token', token, {
                    httpOnly: true,
                    // maxAge: 1 * 60 * 60 * 1000
                })
                res.redirect('./');
            }
        } catch (e) {
            res.status(500).send("Error happened: " + e);
        }
    }

    async logout(req, res) {
        res.clearCookie('token');
        return res.redirect('./login');
    }
}

module.exports = new Auth();