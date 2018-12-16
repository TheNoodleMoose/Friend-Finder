const friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", (req, res) => {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/friends", (req, res) => {
    const newFriend = req.body;
    console.log(newFriend.scores);
    totalArray = [];
    //Manages Friends Already Stored
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
    // Determines Who Is Closest
    // for (let i = 0; i < totalArray.length; i++) {
    //   console.log(Math.abs(total - i));
    // }
    function closest(array, num) {
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
      console.log(ans);
      console.log(chosenPersonIndex);
      for (let i = 0; i < friendsData.length; i++) {
        if (chosenPersonIndex == i) {
          console.log(`Your Match Is: ${friendsData[i].name}`);
        }
      }
    }

    /*call array name and desired value to be closet */
    closest(totalArray, total);
    totalArray.push(total);
    total = 0;
    console.log(totalArray);
    friendsData.push(newFriend);
    res.json(newFriend);
  });
};
