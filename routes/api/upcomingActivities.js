const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const UpcomingActivitiesSchema = require('../../models/UpcomingActivities');


// @route   POST api/upcoming-activities
// @desc    Create an upcoming activity
// @access  Private
router.post("/", [ auth, [
  check('activity_name', 'Activity Name is required').not().isEmpty(),
  check('activity_date', 'Activity Date is required').not().isEmpty(),
  check('activity_details', 'Activity Details is required').not().isEmpty(),
]], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

try {

  const newUpcomingActivities = new UpcomingActivitiesSchema({
    activity_name: req.body.activity_name,
    activity_date: req.body.activity_date,
    activity_incharge: req.body.activity_incharge,
    incharge_contact: req.body.incharge_contact,
    activity_details: req.body.activity_details,
    img_url: req.body.img_url
  });

  const upcomingActivities = await newUpcomingActivities.save();
  res.json(upcomingActivities);

} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
});


// @route   GET api/upcoming-activities
// @desc    Get all upcoming activities
// @access  Public

router.get('/', async(req, res) => {
  try {
    const upcomingActivities = await UpcomingActivitiesSchema.find().sort({ "activity_date": 1 });
    res.json(upcomingActivities);
  } catch (err) {
    console.error(err.message);
  res.status(500).send('Server Error');
  }
})


// @route   DELETE api/upcoming-activities/:id
// @desc    Delete an upcoming Activities
// @access  Private

router.delete('/:id', auth, async(req, res) => {
  try {
    const upcomingActivity = await UpcomingActivitiesSchema.findById(req.params.id);

    if(!upcomingActivity){
      return res.status(404).json({ msg: 'Activity not Found '});
    }

    await upcomingActivity.remove();
    
    res.json({ msg: 'Activity removed '});
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Activity not Found '});
    }
  res.status(500).send('Server Error');
  }
})



module.exports = router;