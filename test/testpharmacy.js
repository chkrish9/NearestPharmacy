//Importing Require Modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

// Setting chai assertion type "should".
chai.should();
// Setting chai-http to chai.
chai.use(chaiHttp);

// Testing Pharmacy API.
describe("Testing Pharmacy API", () => {
  //Testing GET request.
  describe("GET /getNearestPharmacy/:lat/:log", () => {
    //Success case. Sending valid inputs to the API.
    it("It should return all nearest pharmacy", done => {
      chai
        .request(server)
        .get("/pharmacy/getNearestPharmacy/39.061020/-94.580980")
        .end((err, resp) => {
          resp.should.have.status(200);
          resp.body.data.should.be.a("array");
          resp.body.data.length.should.be.eq(30);
          done();
        });
    });

    //Failure case. Sending invalid latitude datatype.
    it("It should return 400 error. msg:Latitude and Longitude should be numbers.", done => {
      chai
        .request(server)
        .get("/pharmacy/getNearestPharmacy/'n'/-94.580980")
        .end((err, resp) => {
          resp.should.have.status(400);
          resp.body.msg.should.be.eq(
            "Latitude and Longitude should be numbers."
          );
          done();
        });
    });

    //Failure case. Sending invalid longitude.
    it("It should return 400 error. msg: Please enter a valid longitude.", done => {
      chai
        .request(server)
        .get("/pharmacy/getNearestPharmacy/39.061020/-180.580980")
        .end((err, resp) => {
          resp.should.have.status(400);
          resp.body.msg.should.be.eq("Please enter a valid longitude.");
          done();
        });
    });

    //Failure case. Sending invalid latitude.
    it("It should return 400 error. msg: Please enter a valid latitude.", done => {
      chai
        .request(server)
        .get("/pharmacy/getNearestPharmacy/-180/-94.580980")
        .end((err, resp) => {
          resp.should.have.status(400);
          resp.body.msg.should.be.eq("Please enter a valid latitude.");
          done();
        });
    });

    //Page not found.
    it("It should return 404 error.", done => {
      chai
        .request(server)
        .get("/pharmacy/getNearestPharmacy/")
        .end((err, resp) => {
          resp.should.have.status(404);
          done();
        });
    });
  });
});
