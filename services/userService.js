const User = require("../models/userModel");
const Babysitter = require("../models/babysitterModel");
const Badante = require("../models/badanteModel");
const Colf = require("../models/colfModel");
const Famiglia = require("../models/famigliaModel");
const util = require('../utils/util');
const validationFields = require('../utils/validationFields');

exports.createUser = async(user) => {
  let specificUser;
  let generalUser;
  try {if (user.role === 'babysitter') {
    specificUser = await Babysitter.create(user);
    user.babysitter_id = specificUser._id;
  }
  else if (user.role === 'badante') {
    specificUser = await Badante.create(user);
    user.badante_id = specificUser._id;
  }
  else if (user.role === 'colf') {
    specificUser = await Colf.create(user);
    user.colf_id = specificUser._id;
  }
  else if (user.role === 'famiglia') {
    specificUser = await Famiglia.create(user);
    user.famiglia_id = specificUser._id;
  }
  generalUser = await User.create(user);
  
  return {
    generalUser,
    specificUser
  };}
  finally{
    if (!generalUser && specificUser) {
      if(specificUser.role === 'babysitter') await Babysitter.findByIdAndDelete(specificUser._id);
      if(specificUser.role === 'badante') await Badante.findByIdAndDelete(specificUser._id);
      if(specificUser.role === 'colf') await Colf.findByIdAndDelete(specificUser._id);
      if(specificUser.role === 'famiglia') await Famiglia.findByIdAndDelete(specificUser._id);
    }
    if (!specificUser && generalUser) {
      await User.findByIdAndDelete(generalUser._id);
    }
  }
}

exports.getUser = async(id) => {
  const user = await User.findById(id);

  if (!user) {
    return undefined;
  }

  return util.showUserData(user);
}

exports.updateUser = async (id, body) => {
  const user = await User.findById(id);

  if (!user) {
    return undefined;
  }

  // validate birthDate
  if(body.birthDate && body.birthDate > validationFields.maxDate && body.birthDate < validationFields.minDate){
    body.birthDate = undefined;
  }

  // validate arrays
  if(body.languages && body.languages[0] === undefined){
    body.languages = undefined;
  }
  if(body.availableDays && body.availableDays[0] === undefined){
    body.availableDays = undefined;
  }
  if(body.ageRange && body.ageRange[0] === undefined){
    body.ageRange = undefined;
  }

  // escludo i campi che non possono essere modificati (non posso modificare lo specificUser)
  let validFields = { ...body };
  validFields = util.excludeFields(validFields, 'city', 'district');

  const type = user.role;
  let modified;
  if (type === 'babysitter') {
    modified = await Babysitter.findByIdAndUpdate(user.babysitter_id, validFields);
  }
  if (type === 'badante') {
    modified = await Badante.findByIdAndUpdate(user.badante_id, validFields);
  }
  if (type === 'colf') {
    modified = await Colf.findByIdAndUpdate(user.colf_id, validFields);
  }
  if (type === 'famiglia') {
    modified = await Famiglia.findByIdAndUpdate(user.famiglia_id, validFields);
  }

  return {
    generalUser: user,
    specificUser: modified
  };
}

exports.deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    return undefined;
  }

  const type = user.role;
  if (type === 'babysitter') await Babysitter.findByIdAndDelete(user.babysitter_id);
  if (type === 'badante') await Badante.findByIdAndDelete(user.badante_id);
  if (type === 'colf') await Colf.findByIdAndDelete(user.colf_id);
  if (type === 'famiglia') await Famiglia.findByIdAndDelete(user.famiglia_id);

  await User.findByIdAndDelete(id);

  return user;
}

exports.deleteAllUsers = async () => {
  await User.deleteMany({});
  await Babysitter.deleteMany({});
  await Badante.deleteMany({});
  await Colf.deleteMany({});
  await Famiglia.deleteMany({});
}