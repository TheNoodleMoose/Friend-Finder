//This requires the table of freinds from friends.js
const friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", (req, res) => {
    res.json(friendsData);
  });

  // This is the post method to get the users answers and return their match
  app.post("/api/friends", (req, res) => {
    const newFriend = req.body;

    // This is where we store the users matched partner
    var bestMatch = {
      name: "",
      photo: ""
    };
    // This is an array of all the total scores for each user
    totalArray = [];

    // This is the the score of the user from their inputs of the quiz
    let otherTotal = 0;
    for (let i of friendsData) {
      for (let score of i.scores) {
        otherTotal += parseInt(score);
      }
      totalArray.push(otherTotal);
      otherTotal = 0;
    }
    //Adds scores for new friends and pushes them to array
    let total = 0;
    for (let i of newFriend.scores) {
      total += parseInt(i);
    }
    // This function is what checks the scores and sees which one is closest to the users score
    closest = (array, num) => {
      var i = 0;
      var minDiff = 1000;
      var ans;
      for (i in array) {
        var m = Math.abs(num - array[i]);
        if (m < minDiff) {
          minDiff = m;
          ans = array[i];
          chosenPersonIndex = i;
        }
      }
      // This is what grabs the users match and stores their info
      for (let i = 0; i < friendsData.length; i++) {
        if (chosenPersonIndex == i) {
          bestMatch.name = `${friendsData[i].name}`;
          bestMatch.photo = `${friendsData[i].photo}`;
        }
      }
    };

    //We call the function with the array of all of users scores and the users total score
    closest(totalArray, total);
    //We then push the users score to the total array
    totalArray.push(total);
    //Reset total back to 0 for the next user
    total = 0;
    // Simple console log to see all users scores
    console.log(totalArray);
    // We then push the users information to the friends data table
    friendsData.push(newFriend);
    //We then send back the users matched partner info
    res.json(bestMatch);
  });
};
