const Announcement = require("../models/announcementModel");
const BabysitterAnn = require("../models/babysitterAnnModel");
const BadanteAnn = require("../models/badanteAnnModel");
const ColfAnn = require("../models/colfAnnModel");
const util = require("../utils/util");

exports.createAnnouncement = async (announcement) => {
  let specificAnnouncement;
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
  const generalAnnouncement = await Announcement.create(announcement);
  return {
    generalAnnouncement,
    specificAnnouncement
  };
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
  let ann = await Announcement.findById(id);

  if (!ann) {
    return undefined;
  }

  // escludo i campi che non possono essere modificati
  const queryObj = util.excludeFields({ ...body }, 'user_id', 'typeAnnouncement', 'babysitterAnn_id', 'badanteAnn_id', 'colfAnn_id');

  const type = ann.typeAnnouncement;
  ann = await Announcement.findByIdAndUpdate(id, queryObj);
  let modified;
  if (type === 'babysitter') {
    modified = await BabysitterAnn.findByIdAndUpdate(ann.babysitterAnn_id, body);
  }
  if (type === 'badante') {
    modified = await BadanteAnn.findByIdAndUpdate(ann.badanteAnn_id, body);
  }
  if (type === 'colf') {
    modified = await ColfAnn.findByIdAndUpdate(ann.colfAnn_id, body);
  }

  return {
    generalAnnouncement: ann,
    specificAnnouncement: modified
  };
}