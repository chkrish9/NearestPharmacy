//Importing Require Modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");

//Port number
const port = process.env.PORT || 3000;

//Initializing express server.
const app = express();

//Cors is used to allow other domains to access our application.
app.use(cors());

//BodyParser is used to parse in coming request body.
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//Passing app to route module to configure the routes.
routes(app);

//Creating the server.
const server = http.createServer(app);

//Start the server.
server.listen(port, () => {
  console.log("Sever running in port : " + port);
});
