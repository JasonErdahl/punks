// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the crewplans from database
  app.get("/api/crewPlan", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.CrewPlan.findAll({}).then(function(dbCrewPlan) {
      // We have access to the crewplan as an argument inside of the callback function
      res.json(dbCrewPlan);
    });
  });

  // POST route for posting a new crewplan to database
  app.post("/api/crewPlan", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.CrewPlan.create({
      turbineNumber: req.body.turbineNumber,
      crewName: req.body.crewName,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: req.body.date
    }).then(function(dbCrewPlan) {
      // We have access to the new crewplan as an argument inside of the callback function
      res.json(dbCrewPlan);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

//   // DELETE route for deleting todos. We can get the id of the todo to be deleted from
//   // req.params.id
//   app.delete("/api/crewPlan/:id", function(req, res) {
//     // We just have to specify which todo we want to destroy with "where"
//     db.Todo.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbCrewPlan) {
//       res.json(dbCrewPlan);
//     });

//   });

//   // PUT route for updating todos. We can get the updated todo data from req.body
//   app.put("/api/crewPlan", function(req, res) {

//     // Update takes in an object describing the properties we want to update, and
//     // we use where to describe which objects we want to update
//     db.Todo.update({
//       text: req.body.text,
//       complete: req.body.complete
//     }, {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(dbCrewPlan) {
//       res.json(dbCrewPlan);
//     })
//       .catch(function(err) {
//       // Whenever a validation or flag fails, an error is thrown
//       // We can "catch" the error to prevent it from being "thrown", which could crash our node app
//         res.json(err);
//       });
//   });
};
