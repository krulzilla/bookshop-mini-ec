const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/secret_key.config');

class Auth {
    async isAdmin(req, res) {
        try {
            const username = req.query.username ?? "";
            const password = req.query.password ?? "";
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
}

module.exports = new Auth();