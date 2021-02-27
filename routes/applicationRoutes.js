const express = require('express');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Application = require("../models/applicationModel");

const router = express.Router({ mergeParams: true });


// you need to authenticate
router.use(authController.protect);

router.use(async function (req, res, next) {
  if(req.user.role === 'famiglia' && req.params.id === undefined) {
    return new AppError('This route is not for the family.', 400);
  }
  if(req.user.role === 'admin' && req.params.id === undefined) {
    return new AppError('This route is not for the admin.', 400);
  }
  
  next();
});

router.use('/:appId', catchAsync( async function (req, res, next) {
  const app = await Application.findById(req.params.appId)

  if(!app) {
    return next(new AppError('Application not found', 404));
  }
  if(req.params.id !== undefined && req.params.id !== app.announcement_id){
    return next(new AppError('Application not found', 404));
  }
  if(req.user.role !== 'famiglia' && req.user.role !== 'admin' && app.user_id.toString() !== req.user.id.toString()) {
    return next(new AppError('You can\'t get this application!', 403));
  }
  
  req.application = app;
  next();
}));

router
  .route('/')
  .post(authController.restrictTo('babysitter', 'badante', 'colf'), applicationController.apply)//DONE
  .get(applicationController.getAllApplications);//DONE

router 
  .route('/:appId')
  .get(applicationController.getApplication)//DONE
  .delete(authController.restrictTo('babysitter', 'badante', 'colf'), applicationController.deleteApplication);//DONE

router.patch('/:appId/:answer', authController.restrictTo('famiglia'), applicationController.answer);//DONE

module.exports = router;