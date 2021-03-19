const User = require("../models/userModel");
const Babysitter = require("../models/babysitterModel");
const Badante = require("../models/badanteModel");
const Colf = require("../models/colfModel");
const Famiglia = require("../models/famigliaModel");
const util = require('../utils/util');
const validationFields = require('../utils/validationFields');
const APIFeatures = require("../utils/apiFeatures");
const Announcement = require("../models/announcementModel");
const BabysitterAnn = require("../models/babysitterAnnModel");
const BadanteAnn = require("../models/badanteAnnModel");
const ColfAnn = require("../models/colfAnnModel");
const Application = require("../models/applicationModel");
const announcementService = require("./announcementService");

exports.createUser = async(user) => {
  let specificUser;
  let generalUser;
  try {
    if (user.role === 'babysitter') {
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
    };
  } finally {
    if (!generalUser && specificUser) {
      if(specificUser.role === 'babysitter') await Babysitter.findByIdAndDelete(specificUser._id);
      if(specificUser.role === 'badante') await Badante.findByIdAndDelete(specificUser._id);
      if(specificUser.role === 'colf') await Colf.findByIdAndDelete(specificUser._id);
      if(specificUser.role === 'famiglia') await Famiglia.findByIdAndDelete(specificUser._id);
    }
    // if (!specificUser && generalUser) {
    //   await User.findByIdAndDelete(generalUser._id);
    // }
  }
}

exports.getUser = async(id) => {
  const user = await User.findById(id).populate({
    path: 'babysitter_id'
  }).populate({
    path: 'badante_id'
  }).populate({
    path: 'colf_id'
  }).populate({
    path: 'famiglia_id'
  });

  if (!user) {
    return undefined;
  }

  return user;
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

  // escludo i campi che non possono essere modificati (non posso modificare lo specificUser, tranne la foto)
  let validFields = { ...body };
  let toExclude = ['name', 'surname'];
  validFields = util.excludeFields(validFields, toExclude);

  if(body.photo) {
    user.photo = body.photo;
    user.save({ validateBeforeSave: false });
  }

  const type = user.role;
  let specificUser;
  
  if (type === 'babysitter') {
    specificUser = await Babysitter.findByIdAndUpdate(user.babysitter_id, validFields);
  }
  if (type === 'badante') {
    specificUser = await Badante.findByIdAndUpdate(user.badante_id, validFields);
  }
  if (type === 'colf') {
    specificUser = await Colf.findByIdAndUpdate(user.colf_id, validFields);
  }
  if (type === 'famiglia') {
    toExclude = ['city', 'district'];
    validFields = util.excludeFields(validFields, toExclude);
    specificUser = await Famiglia.findByIdAndUpdate(user.famiglia_id, validFields);
  }

  return {
    generalUser: user,
    specificUser
  };
}

exports.deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    return undefined;
  }

  // delete specific user, anns e applications
  const type = user.role;
  if (type === 'famiglia') {
    await announcementService.deleteAnnouncements({user_id: user._id});
    await Famiglia.findByIdAndDelete(user.famiglia_id);
  } else {
    await Application.deleteMany({user_id: user._id});
    if (type === 'babysitter') await Babysitter.findByIdAndDelete(user.babysitter_id);
    if (type === 'badante') await Badante.findByIdAndDelete(user.badante_id);
    if (type === 'colf') await Colf.findByIdAndDelete(user.colf_id);
  }

  await User.findByIdAndDelete(id);

  return user;
}

exports.deleteAllUsers = async () => {
  await User.deleteMany({role: {$ne: 'admin'}});
  await Babysitter.deleteMany();
  await Badante.deleteMany();
  await Colf.deleteMany();
  await Famiglia.deleteMany();
  await Announcement.deleteMany();
  await BabysitterAnn.deleteMany();
  await BadanteAnn.deleteMany();
  await ColfAnn.deleteMany();
  await Application.deleteMany();
}

exports.getAllUsers = async (req) => {
   // TODO: gestire sort, limitFields e paginate
   let generalUsers = new APIFeatures (User.find({role: {$ne: 'admin'}}), req.query).filter('generic');
   let babysitters = new APIFeatures (Babysitter.find(), req.query).filter('specific').moreFilters();
   let badantes = new APIFeatures (Badante.find(), req.query).filter('specific').moreFilters();
   let colfs = new APIFeatures (Colf.find(), req.query).filter('specific').moreFilters();
   let famiglias;
   if(req.user && req.user.role === 'famiglia') famiglias = [];
   else {
    famiglias = new APIFeatures (Famiglia.find(), req.query).filter('specific').moreFilters();
    famiglias = await famiglias.query;
   }
   generalUsers = await generalUsers.query;
   babysitters = await babysitters.query;
   badantes = await badantes.query;
   colfs = await colfs.query;

   const result = [];
  // eslint-disable-next-line no-plusplus
  for(let i = 0; i < generalUsers.length; i++){
    if(generalUsers[i].role === 'babysitter' && babysitters.some(el => el._id.toString() === generalUsers[i].babysitter_id.toString())) result.push(generalUsers[i]);
    else if (generalUsers[i].role === 'badante' && badantes.some(el => el._id.toString() === generalUsers[i].badante_id.toString())) result.push(generalUsers[i]);
    else if (generalUsers[i].role === 'colf' && colfs.some(el => el._id.toString() === generalUsers[i].colf_id.toString())) result.push(generalUsers[i]);
    else if (generalUsers[i].role === 'famiglia' && famiglias.some(el => el._id.toString() === generalUsers[i].famiglia_id.toString())) result.push(generalUsers[i]);
  }  

  return await Promise.all(result.map(util.showUserData));
}