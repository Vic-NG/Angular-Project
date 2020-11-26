const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString ={
  type: String, 
  required: true
};

const ReminderSchema = new Schema({
  reminder: [
    {
      locations: reqString,
      day: { type: Date, required: true, default: Date.now },
      atv_name: [reqString],
      periods: [{
          start: reqString,
          end: reqString,
        }]
    },
  ],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reminder", ReminderSchema);
