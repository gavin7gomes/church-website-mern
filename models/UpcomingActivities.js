const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpcomingActivitiesSchema = new Schema({
  activity_name: { type: String, required: true },
  activity_date: { type: Date, required: true },
  activity_incharge: { type: String },
  activity_details: { type: String, required: true },
  incharge_contact: { type: Number },
  img_url: { type: String }
});

module.exports = mongoose.model('upcoming_activities', UpcomingActivitiesSchema);