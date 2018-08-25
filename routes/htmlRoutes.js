var path = require("path");

module.exports = function(app) {
  
  // Load home page
  app.get("/input", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/InputPage.html"));
  });
  
  // Load input page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // Load example page and pass in an example by id
  app.get("/masterview", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/Masterview.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
