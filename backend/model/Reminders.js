const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  location: { type: String, required: true },
  reminder: [
    {
      day: { type: Date, required: true, default: Date.now },
      atv_name: [{ type: String, required: true }],
      periods: [{
          start: { type: String, required: true},
          end: { type: String, required: true},
        }]
    },
  ],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reminder", ReminderSchema);
