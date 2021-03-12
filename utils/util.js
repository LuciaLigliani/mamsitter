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

  // to not show password when create a user
  user.password = undefined;
  console.log(token);

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