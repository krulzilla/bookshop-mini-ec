const userModel = require('../models/user.model');
const config = {
    title: 'Manage Users',
    ...require('../config/layout.config').admin
}

class User {
    async getAll(req, res) {
        try {
            const users = await userModel.find({});
            if (users) {
                return res.render('admin/view_users', {
                    currentPage: 'user.view',
                    ...config,
                    users
                });
            }
        } catch (e) {
            return res.status(500).send('Error happened: ' + e);
        }
    }

    create(req, res) {
        return res.render('admin/create_user', {currentPage: 'user.create', ...config});
    }

    async save(req, res) {
        try {
            const params = req.body.params;
            const newUser = await userModel.create({
                username: params.username,
                password: params.password,
                age: params.age,
                email: params.email,
                fullname: params.fullname,
                address: params.address,
                phone: params.phone,
                status: true,
                is_admin: params.is_admin,
                created_at: Date.now(),
                updated_at: Date.now(),
            })
            if (newUser) {
                return res.status(201).json({
                    status: 201,
                    msg: "Created new user successfully!"
                })
            }
        } catch (e) {
            return res.status(500).send('Error happened: ' + e);
        }
    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }
}

module.exports = new User();