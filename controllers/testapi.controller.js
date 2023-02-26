const userModel = require('../models/user.model');

class User {
    async getAll(req, res) {
        try {
            const users = await userModel.find({});
            return res.send(users);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const user = await userModel.findById({
                _id: id
            });
            return res.send(user);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async create(req, res) {
        try {
            const params = req.body;
            const newUser = await userModel.create({
                username: params.username,
                password: params.password,
                email: params.email,
                fullname: params.fullname,
                age: params.age,
                address: params.address,
                phone: params.phone,
                status: true,
                is_admin: false,
                created_at: Date.now(),
                updated_at: Date.now()
            })
            if (newUser) {
                return res.send("Created successfully~");
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

module.exports = new User();