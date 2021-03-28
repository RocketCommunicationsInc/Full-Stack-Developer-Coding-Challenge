const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  errorId: { type: String },
  errorSeverity: { type: String },
  errorCategory: { type: String },
  errorMessage: { type: String },
  longMessage: { type: String },
  errorTime: { type: Number },
  selected: { type: Boolean },
  new: { type: Boolean },
  expanded: { type: Boolean }
});

module.exports = mongoose.model('alert', alertSchema);
