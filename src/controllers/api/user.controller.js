const userModel = require('../../models/user.model');

class User {
    async getAll(req, res) {
        try {
            const users = await userModel.find({});
            return res.json({
                status: true,
                data: users
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const user = await userModel.findOne({
                _id: id
            });
            return res.json({
                status: true,
                data: user
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async updateProfile(req, res) {
        try {
            const {fullname, age, phone, email, address} = req.body;
            const id = req.params.id;
            // Check id is valid ?
            const isExisted = await userModel.findOne({_id: id});
            if (!isExisted) {
                return res.json({
                    status: false,
                    msg: "User id not found!"
                })
            }
            // Update profile
            const user = await userModel.findByIdAndUpdate(id, {
                fullname,
                age,
                phone,
                email,
                address
            })
            if (user) {
                return res.json({
                    status: true,
                    msg: "Updated profile successfully"
                })
            } else return res.json({
                status: false,
                msg: "Some error happened in server!"
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                msg: "Some error happened in server!"
            })
        }
    }

    async updatePassword(req, res) {
        try {
            const id = req.params.id;
            const {currentPassword, newPassword} = req.body;
            // Check id is valid ?
            const isExisted = await userModel.findOne({_id: id});
            if (!isExisted) {
                return res.json({
                    status: false,
                    msg: "User id not found!"
                })
            }
            // Check current password is correct
            const userPassword = isExisted.password;
            if (!(userPassword === currentPassword)) {
                return res.json({
                    status: false,
                    msg: "Current password is not correct"
                })
            }
            // Update password
            const user = await userModel.findByIdAndUpdate(id, {
                password: newPassword
            })
            if (user) {
                return res.json({
                    status: true,
                    msg: "Change password successfully!"
                })
            } else {
                return res.json({
                    status: false,
                    msg: "Some error happened in server!"
                })
            }
        } catch (e) {
            return res.status(500).json({
                    status: false,
                    msg: "Some error happened in server!"
                })
        }
    }
}

module.exports = new User();