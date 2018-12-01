var config = liquidFillGaugeDefaultSettings();
config.circleThickness = 0.2;
config.circleColor = "#6DA398";
config.textColor = "#0E5144";
config.waveTextColor = "#6DA398";
config.waveColor = "#246D5F";
config.textVertPosition = 0.52;
config.waveAnimateTime = 5000;
config.waveHeight = 0;
config.waveAnimate = false;
config.waveCount = 2;
config.waveOffset = 0.25;
config.textSize = 1.2;
config.minValue = 0;
config.maxValue = 100
config.displayPercent = true;
var gauge = loadLiquidFillGauge("fillGauge", 55, config);

var feelings = ["Joy", "Meh", "Despair"];

var candies = ["Any Full Sized Candy Bar", "Butterfinger", "Candy Corn", "Chiclets", "Dots", "Fuzzy Peaches", "Good N Plenty",
    "Gummy Bears", "Healthy Fruit", "Heath Bars", "Hershey's Dark Chocolate", "Hershey's Milk Chocolate", "Hershey's Kisses",
    "Jolly Ranchers (Bad Flavor)", "Jolly Ranchers (Good Flavor)", "Junior Mints", "Kit Kats", "LaffyTaffy", "LemonHeads",
    "Licorice (not black)", "Licorice (black)", "Lollipops", "Mike and Ike", "Milk Duds", "Milky Way", "M&Ms", "Peanut M&Ms",
    "Mint Kisses", "Mr. Goodbar", "Nerds", "Nestle Crunch", "Peeps", "Pixy Stix", "Reese's Peanut Butter Cups", "Reese's Pieces",
    "Rolos", "Skittles", "Snickers", "Sourpatch Kids", "Starbursts", "Swedish Fish", "Tic Tacs", "Three Musketeers", "Tolberone",
    "Trail Mix", "Twix", "Whatchamacallit Bars", "York Peppermint Patties"];

var values = ["Any_full_sized_candy_bar", "Butterfinger", "Candy_Corn", "Chiclets", "Dots", "Fuzzy_Peaches", "Good_N_Plenty",
    "Gummy_Bears_Straight_Up", "Healthy_Fruit", "Heath_Bar", "Hersheys_Dark_Chocolate", "Hersheys_Milk_Chocolate", "Hersheys_Kisses",
    "Jolly_Rancher_Bad_Flavor", "Jolly_Ranchers_Good_Flavor", "Junior_Mints", "Kit_Kat", "LaffyTaffy", "LemonHeads",
    "Licorice_Not_Black", "Licorice_Yes_Black", "Lollipops", "Mike_and_Ike", "Milk_Duds", "Milky_Way", "Regular_M_Ms", "Peanut_M_M_s",
    "Mint_Kisses", "Mr_Goodbar", "Nerds", "Nestle_Crunch", "Peeps", "Pixy_Stix", "Reeses_Peanut_Butter_Cups",
    "Reeses_Pieces", "Rolos", "Skittles", "Snickers", "Sourpatch_Kids_ie_abominations_of_nature", "Starburst", "Swedish_Fish",
    "Tic_Tacs", "Three_Musketeers", "Tolberone_something_or_other", "Trail_Mix", "Twix",
    "Whatchamacallit_Bars", "York_Peppermint_Patties"];

var map = d3.map();
for (var i = 0; i < candies.length; i++) {
    map.set(candies[i], values[i]);
}

data = d3.csv('candy.csv');

count = {}

var menu = d3.select("#fill")
    .append("select")
    .attr("id", "opinionSelect")
    .selectAll("option")
    .data(candies)
    .enter()
    .append("option")
        .attr("value", function(d) {
            return map.get(d);
        })
        .text(function(d) {
            return d;
        })
        .on("change", function(d) {
            
        });


var allButtons = d3.select("#fill").append("svg")
.attr("height", 30)
.append("g")
.attr("id", "allButtons");

var defaultColor= "#7777BB"
var hoverColor= "#0000ff"
var pressedColor= "#000077"
            
var buttonGroups= allButtons.selectAll("g.button")
                .data(feelings)
                .enter()
                .append("g")
                .attr("class","button")
                .attr("id", function(d) {
                    return d;
                })
                .style("cursor","pointer")
                .on("click",function(d,i) {
                    candy = d3.select('#opinionSelect').property('value');
                    console.log(candy);
                    console.log(d);
                    console.log(data);
                    amount = 20;
                    gauge.update(amount);
                })
                .on("mouseover", function() {
                    if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                        d3.select(this)
                            .select("rect")
                            .attr("fill", hoverColor);
                    }
                })
                .on("mouseout", function() {
                    if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                        d3.select(this)
                            .select("rect")
                            .attr("fill", defaultColor);
                    }
                })

var bWidth= 55; //button width
var bHeight= 20; //button height
var bSpace= 10; //space between buttons
var x0= 20; //x offset
var y0= 10; //y offset

buttonGroups.append("rect")
.attr("class","buttonRect")
.attr("width",bWidth)
.attr("height",bHeight)
.attr("x",function(d,i) {
    return x0+(bWidth+bSpace)*i;
})
.attr("y",y0)
.attr("rx",5) 
.attr("ry",5)
.attr("fill", defaultColor) 

buttonGroups.append("text")
        .attr("class","buttonText")
        .attr("x",function(d,i) {
            return x0 + (bWidth+bSpace)*i + bWidth/2;
        })
        .attr("y",y0+bHeight/2)
        .attr("text-anchor","middle")
        .attr("dominant-baseline","central")
        .attr("fill","white")
        .text(function(d) {return d;})

function updateButtonColors(button, parent) {
parent.selectAll("rect")
        .attr("fill", defaultColor)

button.select("rect")
        .attr("fill", pressedColor)
}