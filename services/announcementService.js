const Announcement = require("../models/announcementModel");
const BabysitterAnn = require("../models/babysitterAnnModel");
const BadanteAnn = require("../models/badanteAnnModel");
const ColfAnn = require("../models/colfAnnModel");
const util = require("../utils/util");
const APIFeatures = require('../utils/apiFeatures');

exports.getAllAnnouncement = async (req) => {
  // let allAnnouncements = await Announcement.find();
  // allAnnouncements = await Promise.all(allAnnouncements.map(util.showAnnData));
  // const features = new APIFeatures (allAnnouncements, req.query).filter().sort().limitFields().paginate();
  // return features;

  // TODO: 
  // 1) faccio il find su ogni tipo di ann sia generico che specifico e applico il filter per ognuno
  // 2) confronto la lista degli ann generico con ogni tipo di ann specifico e se sta in entrambi gli array allora è da prendere
  let generalAnns = new APIFeatures (Announcement.find(), req.query).filter('generic');
  let babysitterAnns = new APIFeatures (BabysitterAnn.find(), req.query).filter('specific');
  let badanteAnns = new APIFeatures (BadanteAnn.find(), req.query).filter('specific');
  let colfAnns = new APIFeatures (ColfAnn.find(), req.query).filter('specific');
  generalAnns = await generalAnns.query;
  babysitterAnns = await babysitterAnns.query;
  badanteAnns = await badanteAnns.query;
  colfAnns = await colfAnns.query;

  const result = [];
  // eslint-disable-next-line no-plusplus
  // for(let i = 0; i < generalAnns.length; i++){
  //   if(babysitterAnns.some(el => el._id.toString() === generalAnns[i].babysitterAnn_id.toString()) ||
  //       badanteAnns.some(el => el._id.toString() === generalAnns[i].badanteAnn_id.toString()) ||
  //       colfAnns.some(el => el._id.toString() === generalAnns[i].colfAnn_id.toString())) {
  //     result.push(generalAnns[i]);
  //   }    
  // }

  if()

  return await Promise.all(result.map(util.showAnnData));

  // const features = new APIFeatures (Announcement.find(), req.query).filter().sort().limitFields().paginate();
  // const anns = await features.query;
  // return await Promise.all(anns.map(util.showAnnData));
}

exports.createAnnouncement = async (announcement) => {
  let generalAnnouncement;
  let specificAnnouncement;
  try {
  if (announcement.typeAnnouncement === 'babysitter') {
    specificAnnouncement = await BabysitterAnn.create(announcement);
    announcement.babysitterAnn_id = specificAnnouncement._id;
  }
  else if (announcement.typeAnnouncement === 'badante') {
    specificAnnouncement = await BadanteAnn.create(announcement);
    announcement.badanteAnn_id = specificAnnouncement._id;
  }
  else if (announcement.typeAnnouncement === 'colf') {
    specificAnnouncement = await ColfAnn.create(announcement);
    announcement.colfAnn_id = specificAnnouncement._id;
  }
  generalAnnouncement = await Announcement.create(announcement);
  return {
    generalAnnouncement,
    specificAnnouncement
  };}
  finally {
    if (!generalAnnouncement && specificAnnouncement) {
      if(specificAnnouncement.announcementType === 'babysitter') await BabysitterAnn.findByIdAndDelete(specificAnnouncement._id);
      if(specificAnnouncement.announcementType === 'badante') await BadanteAnn.findByIdAndDelete(specificAnnouncement._id);
      if(specificAnnouncement.announcementType === 'colf') await ColfAnn.findByIdAndDelete(specificAnnouncement._id);
    }
    if (!specificAnnouncement && generalAnnouncement) {
      await Announcement.findByIdAndDelete(generalAnnouncement._id);
    }
  }
}

exports.getAnnouncement = async (id) => {
  const ann = await Announcement.findById(id);

  if (!ann) {
    return undefined;
  }

  return util.showAnnData(ann);
}

exports.deleteAnnouncement = async (id) => {
  const ann = await Announcement.findById(id);

  if (!ann) {
    return undefined;
  }

  const type = ann.typeAnnouncement;
  if (type === 'babysitter') await BabysitterAnn.findByIdAndDelete(ann.babysitterAnn_id);
  if (type === 'badante') await BadanteAnn.findByIdAndDelete(ann.badanteAnn_id);
  if (type === 'colf') await ColfAnn.findByIdAndDelete(ann.colfAnn_id);
  
  await Announcement.findByIdAndDelete(id);
  return true;
}

exports.deleteAllAnnouncements = async () => {
  await Announcement.deleteMany({});
  await BabysitterAnn.deleteMany({});
  await BadanteAnn.deleteMany({});
  await ColfAnn.deleteMany({});
}

exports.updateAnnouncement = async (id, body) => {
  let generalAnnouncement = await Announcement.findById(id);

  if (!generalAnnouncement) {
    return undefined;
  }

  // validate arrays
  if(body.languages && body.languages[0] === undefined){
    body.languages = undefined;
  }
  if(body.children && body.children[0] === undefined){
    body.children = undefined;
  }
  if(body.neededDays && body.neededDays[0] === undefined){
    body.neededDays = undefined;
  }
  if(body.senior && body.senior[0] === undefined){
    body.senior = undefined;
  }

  // escludo i campi che non possono essere modificati
  let validFields = { ...body };

  validFields = util.excludeFields(validFields, 'user_id', 'typeAnnouncement', 'babysitterAnn_id', 'badanteAnn_id', 'colfAnn_id', 'typeWork', 'startDate', 'endDate', 'date');

  const type = generalAnnouncement.typeAnnouncement;
  const {title} = generalAnnouncement;
  generalAnnouncement = await Announcement.findByIdAndUpdate(id, validFields);
  let specificAnnouncement;
  try {if (type === 'babysitter') {
    specificAnnouncement = await BabysitterAnn.findByIdAndUpdate(generalAnnouncement.babysitterAnn_id, validFields);
  }
  if (type === 'badante') {
    specificAnnouncement = await BadanteAnn.findByIdAndUpdate(generalAnnouncement.badanteAnn_id, validFields);
  }
  if (type === 'colf') {
    specificAnnouncement = await ColfAnn.findByIdAndUpdate(generalAnnouncement.colfAnn_id, validFields);
  }}
  finally {
    if(!specificAnnouncement && generalAnnouncement) {
      generalAnnouncement.set({title});
      generalAnnouncement.save();
    }
  }

  // elimino la possibilità di aggiungere informazioni non richieste
  if (specificAnnouncement.typeWork === 'occasionale') {
    specificAnnouncement.set({neededDays: undefined});
    specificAnnouncement.save();
  }
  else {
    specificAnnouncement.set({when: undefined});
    specificAnnouncement.save();
  }

  return {
    generalAnnouncement,
    specificAnnouncement
  };
}