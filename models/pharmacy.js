//Importing Require Modules
const csv = require("csvtojson");
const path = require("path");
const _ = require("underscore");

//Function to get nearest pharmacies.
module.exports.getNearestPharmacy = function(lat1, lon1, callback) {
  //Reading data from csv.
  csv()
    .fromFile(path.join(__dirname, "../data/pharmacies.csv"))
    .then(jsonObj => {
      try {
        //Finding the distance from user location to pharmacy locations.
        //Append the distance to csv object.
        jsonObj.forEach(obj => {
          obj["distance"] = parseFloat(
            distance(
              lat1,
              lon1,
              parseFloat(obj.latitude),
              parseFloat(obj.longitude)
            )
          );
          obj["address"] =
            obj["address"] +
            ", " +
            obj["city"] +
            ", " +
            obj["state"] +
            ", " +
            obj["zip"] +
            ".";
        });
        //Sort pharmacies by distance.
        //Fetch name, address and distance and call callback function.
        callback(
          null,
          _.map(_.sortBy(jsonObj, "distance"), o =>
            _.pick(o, ["name", "address", "distance"])
          )
        );
      } catch (e) {
        callback(
          "Something went wrong. Please contact system administrator.",
          null
        );
      }
    });
};

//Calculate the distance between two geo coordinates.
var distance = function(userlat, userlog, pharmacylat, pharmacylog) {
  //if both latitudes and longitudes are same then return 0.
  if (userlat == pharmacylat && userlog == pharmacylog) {
    return 0;
  } else {
    //Converting degrees to radius.
    var radiusOfuserLat = (Math.PI * userlat) / 180;
    var radiusOpharmacyLat = (Math.PI * pharmacylat) / 180;
    var theta = userlog - pharmacylog;
    var radtheta = (Math.PI * theta) / 180;
    //Calculating distance.
    var dist =
      Math.sin(radiusOfuserLat) * Math.sin(radiusOpharmacyLat) +
      Math.cos(radiusOfuserLat) *
        Math.cos(radiusOpharmacyLat) *
        Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    //Converting radius to degree.
    dist = (dist * 180) / Math.PI;
    //Converting distance to Miles.
    dist = dist * 60 * 1.1515;
    return dist.toFixed(2);
  }
};
