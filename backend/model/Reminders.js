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

const ReminderSchema = new Schema({
    locations: reqString,
    day: dateType,
    atv_name: [reqString],
    start: dateType,
    end: dateType,
    created: { type: Date, default: Date.now },
},
{
  timestamps: true
});

module.exports = mongoose.model("Reminder", ReminderSchema);
