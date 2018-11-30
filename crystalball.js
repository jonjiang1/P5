function crystalstart() {
  var alldacomments;
  var commentArray = [];

  console.log("Crystalball is running");

  var crystalball = document.getElementById('crystalball');

  d3.select(crystalball)
      .append('p')
      .append('button')
      .text('Search comments!')
      .on('click', function() {
        var usersearch = document.getElementById("searchterm").value;
        console.log(usersearch);

      });

  d3.csv("candy.csv", function(d) {
    d.forEach(function(element) {
      if ((element.OTHER_COMMENTS) != "") {
        commentArray.push(element.OTHER_COMMENTS);
      }
    });

    console.log(commentArray);


  });

}

// function commentSearcher(aComment) {
//   commentArray.forEach(function(element) {
//     if (element.includes(aComment)) {
//       console.log("Found a match!");
//       return;
//     } else {
//
//     }
//   });
// }
