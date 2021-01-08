const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true
};

const dateType = {
  type: Date,
  default: Date.now
};

const timeType = {
  type: String
}

const atvType = {
  type: Array
}

const ReminderSchema = new Schema({
  locations: reqString,
  day: dateType,
  atv_name: [atvType],
  start: timeType,
  end: timeType,
  created: { type: Date, default: Date.now },
  userId: { type: String, required: true }
});

module.exports = mongoose.model("Reminder", ReminderSchema);
