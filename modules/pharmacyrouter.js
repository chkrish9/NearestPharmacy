//Importing Require Modules
const express = require("express");
const router = express.Router();
const pharmacy = require("../models/pharmacy");

//Get all the nearest pharmacies.
router.get("/getNearestPharmacy/:lat/:log", (req, res, next) => {
  //Reading user inputs.
  var userlat = req.params.lat;
  var userlog = req.params.log;
  try {
    if (!validateInputs(userlat, userlog).valid)
      res
        .status(400)
        .json({ success: false, msg: validateInputs(userlat, userlog).msg });
    else {
      //Sending user inputs to model to get results.
      pharmacy.getNearestPharmacy(userlat, userlog, (err, result) => {
        if (err)
          res.status(500).json({
            success: false,
            msg:
              "Something went wrong. Please contact the system administrator."
          });
        else
          res.status(200).json({
            success: true,
            msg: "Total records count : " + result.length,
            data: result
          });
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong. Please contact the system administrator."
    });
  }
});

//Validating the inputs.
var validateInputs = function(userlat, userlog) {
  if (userlat === "" && userlog === "")
    return { valid: false, msg: "Latitude and Longitude should not be empty." };
  if (isNaN(userlat) || isNaN(userlog))
    return {
      valid: false,
      msg: "Latitude and Longitude should be numbers."
    };
  if (!(userlat > -90 && userlat < 90))
    return { valid: false, msg: "Please enter a valid latitude." };
  if (!(userlog > -180 && userlog < 180))
    return { valid: false, msg: "Please enter a valid longitude." };
  return { valid: true, msg: "Valid data." };
};

module.exports = router;
