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

const ReminderSchema = new Schema({
  reminder: [
    {
      locations: reqString,
      day: dateType,
      atv_name: [reqString],
      periods: [{
          start: dateType,
          end: dateType,
        }]
    },
  ],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reminder", ReminderSchema);
