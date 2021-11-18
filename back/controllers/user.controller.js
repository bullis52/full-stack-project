const User = require('../dataBase/User');
const O_auth = require('../database/O_auth');
const emailService = require('../service/email.service');
const userUtil = require('../util/user.util');
const {WELCOME} = require("../configs/email-action.enum");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            // userService.getAllUsers(req.query)
            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUsersById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

            const userNormalize = userUtil.userNormalizator(user);

            res.json(userNormalize);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const newUser = await User.createUserWithHashPassword(req.body);

            await emailService.sendMail(req.body.email,WELCOME,{userName:req.body.name});

            res.json(newUser);

        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;
            await User.deleteOne({_id: id});
            await O_auth.deleteOne({id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res) => {
        try {
            const {id} = req.params;
            const freshUser = req.body;
            const user = await User.findByIdAndUpdate(id, freshUser, {new: true});

            const newUser = userUtil.userNormalizator(user);

            res.status(201).json(newUser);
        } catch (e) {
            // next(e);
            res.json(e.message);
        }
    }

};
