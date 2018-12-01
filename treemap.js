window.onload = start;

//useful global vars
var nested_data;
var width = 1000;
var height = 1000;
var margin = 5;
var candyObj = {};
var visualization;

//states array for comparison and sorting of data
let states = ["Alaska",
                  "Alabama",
                  "Arkansas",
                  "American Samoa",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "District of Columbia",
                  "Delaware",
                  "Florida",
                  "Georgia",
                  "Guam",
                  "Hawaii",
                  "Iowa",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  " North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Virgin Islands",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"];

//candy array for the dropdown menu
candyArray = ["Any_full_sized_candy_bar","Butterfinger","Candy_Corn","Chiclets","Dots","Fuzzy_Peaches","Good_N_Plenty","Gummy_Bears_Straight_Up,Healthy_Fruit","Heath_Bar","Hersheys_Dark_Chocolate","Hersheys_Milk_Chocolate","Hersheys_Kisses","Jolly_Rancher_Bad_Flavor","Jolly_Ranchers_Good_Flavor","Junior_Mints","Kit_Kat","LaffyTaffy","LemonHeads","Licorice_Not_Black","Licorice_Yes_Black","Lollipops","Mike_and_Ike","Milk_Duds","Milky_Way","Regular_M_Ms","Peanut_M_M_s","Mint_Kisses","Mr_Goodbar","Nerds","Nestle_Crunch","Peeps","Pixy_Stix","Reeses_Peanut_Butter_Cups","Reeses_Pieces","Rolos","Skittles","Snickers","Sourpatch_Kids_ie_abominations_of_nature","Starburst","Swedish_Fish","Tic_Tacs","Three_Musketeers","Tolberone_something_or_other","Trail_Mix","Twix","Whatchamacallit_Bars","York_Peppermint_Patties",];


function start() {
//start our crystal ball function at the completion of windows loading as well
crystalstart();
//prep our space
var div = d3.select('#treemap').style('width', width)
                .style('height', height).style('position', 'relative');
var treeMap = d3.layout.treemap().size([width, height]);

//read in the CSV file
  d3.csv("candy.csv", function(d) {

//nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Twix == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);

//update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }

//sanity check
        console.log(nested_data);

//code to draw the default viz
redraw();
        // var visualization = d3plus.viz()
        //   .container("#treemap")
        //   .data(nested_data)
        //   .type("tree_map")
        //   .id("key")
        //   .depth(1)
        //   .size("value")
        //   .draw()

//listener for changes in the dropdown
    d3.select("#dropdown")
      .on("change", function () {
        console.log("I changed");
        console.log(document.getElementById("dropdown").value);
        var aValue = document.getElementById("dropdown").value;
        console.log(aValue);
        changeFunction(aValue);
        //document.getElementById('treemap').innerHtml = "";
        //d3.selectAll("svg > *").remove()
      });


// function changeFunction () {
//   console.log("changeFunction got called");
//   d3.selectAll("svg > *").remove();
//   console.log("and we removed stuff");
// }


});//end of the csv read function, should do anything that needs the d data before this


} //end of start() function





function changeFunction (aValue) {
  console.log("changeFunction got called");

  //d3.selectAll("svg > *").remove();
  //d3.select("svg").remove();
  if (aValue == "Any_full_sized_candy_bar") {
    d3.csv("candy.csv", function(d) {
      //nest the data so we can make the treemap correctly
        nested_data = d3.nest()
          .key(function(d) {
            if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
              return d.STATE_PROVINCE_COUNTY_ETC;
            } else {
              return "Other States";
            }
            })
            .rollup(function(v) {
              return d3.sum(v, function(d) {
                if (d.Any_full_sized_candy_bar == 3) {
                  return 1;
                } else {
                  return 0;
                } });
            })
          .entries(d);
          //update it to value instead of values because it doesn't like that
          for (var x=0;x<nested_data.length;x++) {
            nested_data[x]["value"] = nested_data[x]["values"];
            delete nested_data[x]["values"];
          }
          //sanity check
          console.log(nested_data);
        });
  }

  else if (aValue == "Butterfinger") {
    d3.csv("candy.csv", function(d) {
      //nest the data so we can make the treemap correctly
        nested_data = d3.nest()
          .key(function(d) {
            if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
              return d.STATE_PROVINCE_COUNTY_ETC;
            } else {
              return "Other States";
            }
            })
            .rollup(function(v) {
              return d3.sum(v, function(d) {
                if (d.Butterfinger == 3) {
                  return 1;
                } else {
                  return 0;
                } });
            })
          .entries(d);
          //update it to value instead of values because it doesn't like that
          for (var x=0;x<nested_data.length;x++) {
            nested_data[x]["value"] = nested_data[x]["values"];
            delete nested_data[x]["values"];
          }
          //sanity check
          console.log(nested_data);
        });
  }

else if (aValue == "Candy_Corn") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Candy_Corn == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Chiclets") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Chiclets == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Dots") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Dots == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Fuzzy_Peaches") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Fuzzy_Peaches == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Good_N_Plenty") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Good_N_Plenty == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Gummy_Bears_Straight_Up") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Gummy_Bears_Straight_Up == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Healthy_Fruit") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Healthy_Fruit == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Heath_Bar") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Heath_Bar == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Hersheys_Dark_Chocolate") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Hersheys_Dark_Chocolate == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Hersheys_Milk_Chocolate") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Hersheys_Milk_Chocolate == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Hersheys_Kisses") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Hersheys_Kisses == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Jolly_Rancher_Bad_Flavor") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Jolly_Rancher_Bad_Flavor == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Jolly_Ranchers_Good_Flavor") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Jolly_Ranchers_Good_Flavor == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Junior_Mints") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Junior_Mints== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Kit_Kat") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Kit_Kat== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "LaffyTaffy") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.LaffyTaffy== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "LemonHeads") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.LemonHeads== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Licorice_Not_Black") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Licorice_Not_Black== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Licorice_Yes_Black") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Licorice_Yes_Black== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Lollipop") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Lollipop== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Mike_and_Ike") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Mike_and_Ike== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Milk_Duds") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Milk_Duds== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Milky_Way") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Milky_Way== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Regular_M_Ms") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Regular_M_Ms== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Peanut_M_M_s") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Peanut_M_M_s== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Mint_Kisses") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Mint_Kisses== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Mr_Goodbar") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Mr_Goodbar== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Nerds") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Nerds== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Nestle_Crunch") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Nestle_Crunch== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Peeps") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Peeps== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Pixy_Stix") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Pixy_Stix== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Reeses_Peanut_Butter_Cups") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Reeses_Peanut_Butter_Cups== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Reeses_Pieces") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Reeses_Pieces== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Rolos") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Rolos== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Skittles") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Skittles== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Snickers") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Snickers== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Sourpatch_Kids_ie_abominations_of_nature") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Sourpatch_Kids_ie_abominations_of_nature== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Starburst") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Starburst== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Swedish_Fish") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Swedish_Fish== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Tic_Tacs") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Tic_Tacs== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Three_Musketeers") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Three_Musketeers== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Tolberone_something_or_other") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Tolberone_something_or_other== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}

else if (aValue == "Trail_Mix") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Trail_Mix== 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });
}


else if (aValue == "Twix") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Twix == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });

}

else if (aValue == "Whatchamacallit_Bars") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.Whatchamacallit_Bars == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });

}

else if (aValue == "York_Peppermint_Patties") {
  d3.csv("candy.csv", function(d) {
    //nest the data so we can make the treemap correctly
      nested_data = d3.nest()
        .key(function(d) {
          if (states.includes(d.STATE_PROVINCE_COUNTY_ETC)) {
            return d.STATE_PROVINCE_COUNTY_ETC;
          } else {
            return "Other States";
          }
          })
          .rollup(function(v) {
            return d3.sum(v, function(d) {
              if (d.York_Peppermint_Patties == 3) {
                return 1;
              } else {
                return 0;
              } });
          })
        .entries(d);
        //update it to value instead of values because it doesn't like that
        for (var x=0;x<nested_data.length;x++) {
          nested_data[x]["value"] = nested_data[x]["values"];
          delete nested_data[x]["values"];
        }
        //sanity check
        console.log(nested_data);
      });

}


else {
console.log("NO REDRAW");}

  redraw();
}

function redraw() {
  document.getElementById('treemap').innerHTML = "";
  visualization = d3plus.viz()
    .container("#treemap")
    .data(nested_data)
    .type("tree_map")
    .id("key")
    .depth(1)
    .size("value")
    .draw()
}
