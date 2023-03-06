const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/secret_key.config');

class Auth {
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
}

module.exports = new Auth();