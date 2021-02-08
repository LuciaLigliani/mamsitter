const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(authController.protect);

router.patch('/updateMyPassword', userController.updateMyPassword);
router.get('/myProfile', userController.myProfile);
router.patch('/updateMyProfile', userController.updateMyProfile);
router.delete('/deleteAccount', userController.deleteAccount);
router.delete('/', userController.deleteAllUsers);
// router.get('/logout', authController.logout);

module.exports = router;
