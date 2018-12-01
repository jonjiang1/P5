var commentArray = [];
var visibleArray = [];

function crystalstart() {
  var alldacomments;
  var lowercaseStuff;
  var stringBuilder;
  var randNum;

  console.log("Crystalball is running");

  var crystalball = document.getElementById('crystalball');

  d3.csv("candy.csv", function(d) {
    d.forEach(function(element) {
      if ((element.OTHER_COMMENTS) != "") {
        commentArray.push(element.OTHER_COMMENTS.toLowerCase());
      }
    });

    d3.select(crystalball)
        .append('p')
        .append('button')
        .text('Get a random comment!')
        .on('click', function() {
          var usersearch = (document.getElementById("searchterm").value).toLowerCase();
          console.log(usersearch);
          commentSearcher(usersearch);
          console.log(visibleArray);

          randNum = Math.floor(Math.random() * ((visibleArray.length)) + 0);
          console.log(randNum);

          document.getElementById("results").innerHTML = "These are the results: " + visibleArray[randNum] ;
        });


  });

}

function commentSearcher(aComment) {
  //clear the array
  visibleArray = [];

  commentArray.forEach(function(element) {
    if (element.includes(aComment)) {
      visibleArray.push(element);
    } else {
    }
  });
}
