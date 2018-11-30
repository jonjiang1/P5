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
        changeFunction();
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





function changeFunction () {
  console.log("changeFunction got called");

  //d3.selectAll("svg > *").remove();
  //d3.select("svg").remove();

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

  console.log("and we removed stuff");
  redraw();
  console.log("and then we redrew");
}

function redraw() {
  visualization = d3plus.viz()
    .container("#treemap")
    .data(nested_data)
    .type("tree_map")
    .id("key")
    .depth(1)
    .size("value")
    .draw()
}

function redraw2() {
  visualization
    .container("#treemap")

}
