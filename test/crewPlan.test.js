var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/crewPlan", function() {
  // Before each test begins, create a new request server for testing
  // & delete all crew plans from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all crew plans", function(done) {
    // Add some crew plans to the db to test with
    db.CrewPlan.bulkCreate([
      { turbineNumber: "Turbine Site 1", crewName: "TorqueCrew", startTime: "1:30", endTime: "2:30", date: "2018-08-28"},
      { turbineNumber: "Turbine Site 1", crewName: "RebarCrew", startTime: "2:15", endTime: "3:15", date: "2018-08-28"}
    ]).then(function() {
      // Request the route that returns all crew plans
      request.get("/api/crewPlan").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            turbineNumber: "Turbine Site 1", 
            crewName: "TorqueCrew", 
            startTime: "1:30", 
            endTime: "2:30", 
            date: "2018-08-28st Description"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            turbineNumber: "Turbine Site 1", 
            crewName: "RebarCrew", 
            startTime: "2:15", 
            endTime: "3:15", 
            date: "2018-08-28"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
