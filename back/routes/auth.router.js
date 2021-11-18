const router = require('express').Router();

const {authController} = require('../controllers');
const {userMiddleWare,authMiddleWare} = require('../middlewares');
// const {ADMIN, DRIVER} = require('../configs/user-roles.enum');

router.post(
    '/',
    userMiddleWare.isUserPresent,
    authController.login
);
// userMiddleWare.checkUserRole([
//     ADMIN,
//     DRIVER
// ])
router.post('/logout', authController.logout);
router.post('/refresh',authMiddleWare.checkRefreshToken,authController.refreshToken);

router.post('/password/forgot',authController.sendMailForgotPassword);

module.exports = router;
