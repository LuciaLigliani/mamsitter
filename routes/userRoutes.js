const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// home page
router.get('/search', userController.getAllUsersLessInfo);
router.get('/:id/file/:filename', userController.getPhoto);

// you need to authenticate
router.use(authController.protect);

router
  .route('/myProfile') //DONE
  .get(authController.restrictTo('admin','famiglia', 'babysitter', 'badante', 'colf'), userController.myProfile)
  .patch(authController.restrictTo('famiglia', 'babysitter', 'badante', 'colf'), userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMyProfile)
  .delete(authController.restrictTo('famiglia', 'babysitter', 'badante', 'colf'), userController.deleteAccount);

router.patch('/updateMyPassword', userController.updateMyPassword);//DONE
// router.get('/logout', authController.logout);


router.get('/', authController.restrictTo('admin', 'famiglia'), userController.getAllUsers);
router.delete('/', authController.restrictTo('admin'), userController.deleteAllUsers);
router.get('/:id', authController.restrictTo('admin', 'famiglia'), userController.getUser);
router.delete('/:id', authController.restrictTo('admin'), userController.deleteUser);
router.patch('/:id', authController.restrictTo('admin'), userController.reviewWorker);
// router.patch('/:id', authController.restrictTo('admin'), userController.updateReview);
// router.patch('/:id', authController.restrictTo('admin'), userController.deleteReview);


module.exports = router;
