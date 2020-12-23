const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;


var formatedDate = moment.tz(Date.now(), "America/Campo_Grande");
console.log(formatedDate);

const reqString = {
  type: String, 
  required: true
};

const dateType = {
  type: Date,
  default: formatedDate
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
});

module.exports = mongoose.model("Reminder", ReminderSchema);
