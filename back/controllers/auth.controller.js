const actionTokenTypeEnum = require('../configs/action-token-type.enum');
const emailActionEnum = require('../configs/email-action.enum');
// const {AUTHORIZATION} = require('../configs/constans');
const {jwtService} = require("../service");
const {userNormalizator} = require("../util/user.util");
const O_Auth = require('../database/O_auth');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            await user.comparePassword(req.body.password);

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },
    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler('user not found', 404);
            }

            const actionToken = jwtService.generateActionToken(actionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: actionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: `http://localhost:3000/passwordForgot?token=${actionToken}`});

            res.json('ok');

        } catch (e) {
            next(e);
        }
    },
    setNewPasswordAfterForgot: (req, res, next) => {
        try {
            // const actionToken = req.get(AUTHORIZATION);


            res.json('good');
        } catch (e) {
            next(e);
        }
    }
};
