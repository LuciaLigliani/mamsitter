const jwt = require("jsonwebtoken");
const BabysitterAnn = require("../models/babysitterAnnModel");
const BadanteAnn = require("../models/badanteAnnModel");
const ColfAnn = require("../models/colfAnnModel");
const Babysitter = require("../models/babysitterModel");
const Badante = require("../models/badanteModel");
const Colf = require("../models/colfModel");
const Famiglia = require("../models/famigliaModel");

exports.excludeFields = ({...body}, [...toExclude]) => {
  toExclude.forEach(el => delete body[el]);
  return body;
}

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

exports.createSendToken = (user, statusCode, res, req) => {
  const token = signToken (user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  //if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  //console.log(res);
 // console.log(token);
 // console.log(req.cookies);
  res.cookie('jwt', token, cookieOptions);
 // console.log(res.cookie);
 // console.log(req.cookies);

  // to not show password when create a user
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user
  });
};

exports.showAnnData = async (ann) => {
  const type = ann.typeAnnouncement;
  let found;
  if (type === 'babysitter') found = await BabysitterAnn.findById(ann.babysitterAnn_id);
  else if (type === 'badante') found = await BadanteAnn.findById(ann.badanteAnn_id);
  else if (type === 'colf') found = await ColfAnn.findById(ann.colfAnn_id);

  return {
    generalAnnouncement: ann,
    specificAnnouncement: found
  };
}

exports.showUserData = async (user) => {
  const type = user.role;
  let found;
  if (type === 'babysitter') found = await Babysitter.findById(user.babysitter_id);
  else if (type === 'badante') found = await Badante.findById(user.badante_id);
  else if (type === 'colf') found = await Colf.findById(user.colf_id);
  else if (type === 'famiglia') found = await Famiglia.findById(user.famiglia_id);

  return {
    generalUser: user,
    specificUser: found
  };
}