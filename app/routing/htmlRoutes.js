// Require Path
const path = require("path");

module.exports = app => {
  //Directs the user to home
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
  //Directs user to quiz
  app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
};
