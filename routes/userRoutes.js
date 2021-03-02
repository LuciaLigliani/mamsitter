const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// you need to authenticate
router.use(authController.protect);

router
  .route('/myProfile') //DONE
  // .use(authController.restrictTo('famiglia', 'babysitter', 'badante', 'colf')) // controllare se funziona
  .get(userController.myProfile)
  .patch(userController.updateMyProfile)
  .delete(userController.deleteAccount)

router.patch('/updateMyPassword', userController.updateMyPassword);//DONE
// router.get('/logout', authController.logout);


router.get('/', authController.restrictTo('admin', 'famiglia'), userController.getAllUsers);
router.delete('/', authController.restrictTo('admin'), userController.deleteAllUsers);
router.get('/:id', authController.restrictTo('admin', 'famiglia'), userController.getUser);
router.delete('/:id', authController.restrictTo('admin'), userController.getUser);

// TODO: PAYMENT

router.patch('/payment/can', authController.restrictTo('famiglia', 'babysitter', 'badante', 'colf'), userController.can);//DONE
router.patch('/payment/highlight', authController.restrictTo('babysitter', 'badante', 'colf'), userController.beHighlighted);//DONE
router.patch('/payment/base', authController.restrictTo('famiglia'), userController.beBase);//DONE
// /payment/worker/can... /payment/family/can...
router.patch('/payment/premium', authController.restrictTo('famiglia', 'babysitter', 'badante', 'colf'), userController.bePremium);//DONE
router.patch('/payment/topClass', authController.restrictTo('famiglia', 'babysitter', 'badante', 'colf'), userController.beTopClass);//DONE

module.exports = router;
