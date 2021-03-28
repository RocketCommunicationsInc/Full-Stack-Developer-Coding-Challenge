const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contactId: { type: String },
  contactStatus: { type: String },
  contactName: { type: Number },
  contactGround: { type: String },
  contactSatellite: { type: String },
  contactEquipment: { type: String },
  contactState: { type: String },
  contactStep: { type: String },
  contactDetail: { type: String },
  contactBeginTimestamp: { type: Number },
  contactEndTimestamp: { type: Number },
  contactLatitude: { type: Number },
  contactLongitude: { type: Number },
  contactAzimuth: { type: Number },
  contactElevation: { type: Number },
  contactResolution: { type: String },
  contactResolutionStatus: { type: String }
});

module.exports = mongoose.model('contact', contactSchema);
