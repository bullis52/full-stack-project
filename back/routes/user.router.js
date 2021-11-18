const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {userMiddleWare} = require('../middlewares');


router.get('/', userController.getUsers);

router.get(
    '/:user_id',
    userMiddleWare.isUserIdValid,
    userController.getUsersById
);

router.post(
    '/',
    userMiddleWare.createUserMiddleware,
    userMiddleWare.isUserBodyValid,
    userController.createUser
);

router.put(
    '/:id',
    // authMiddleWare.checkAccessToken,
    userController.updateUser
);

router.delete(
    '/:id',
    // authMiddleWare.checkAccessToken,
    userController.deleteUser
);
module.exports = router;
