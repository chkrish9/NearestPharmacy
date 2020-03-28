//Importing Require Modules
var pharmacy = require("../modules/pharmacyrouter");
//Exporting all routes.
module.exports = function router(app) {
  app.use("/pharmacy", pharmacy);
};
