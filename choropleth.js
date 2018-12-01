d3.csv("candy.csv", function(err, data) {

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

    var menu = d3.select("#canvas-svg")
    .append("select")
    .attr("id", "choroplethSelect")
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

    var byCountry = d3.nest()
        .key(function(d) { return d.COUNTRY; })
        .key(function(d) { return d.STATE_PROVINCE_COUNTY_ETC; })
        .sortKeys(d3.ascending)
        .entries(data);

        var config = {"color1":"#d3e5ff","color2":"#08306B","stateDataColumn":"STATE_PROVINCE_COUNTY_ETC","valueDataColumn":"Any_full_sized_candy_bar"}
        
        var WIDTH = 800, HEIGHT = 500;
        
        var COLOR_COUNTS = 9;
        
        var SCALE = 0.7;
        
        function Interpolate(start, end, steps, count) {
            var s = start,
                e = end,
                final = s + (((e - s) / steps) * count);
            return Math.floor(final);
        }
        
        function Color(_r, _g, _b) {
            var r, g, b;
            var setColors = function(_r, _g, _b) {
                r = _r;
                g = _g;
                b = _b;
            };
        
            setColors(_r, _g, _b);
            this.getColors = function() {
                var colors = {
                    r: r,
                    g: g,
                    b: b
                };
                return colors;
            };
        }
        
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        
        function valueFormat(d) {
            if (d > 1000000000) {
            return Math.round(d / 1000000000 * 10) / 10 + "B";
            } else if (d > 1000000) {
            return Math.round(d / 1000000 * 10) / 10 + "M";
            } else if (d > 1000) {
            return Math.round(d / 1000 * 10) / 10 + "K";
            } else {
            return d;
            }
        }
        
        var COLOR_FIRST = config.color1, COLOR_LAST = config.color2;
        
        var rgb = hexToRgb(COLOR_FIRST);
        
        var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);
        
        rgb = hexToRgb(COLOR_LAST);
        var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);
        
        var MAP_STATE = config.stateDataColumn;
        var MAP_VALUE = config.valueDataColumn;
        
        var width = WIDTH,
            height = HEIGHT;
        
        var valueById = d3.map();
        
        var startColors = COLOR_START.getColors(),
            endColors = COLOR_END.getColors();
        
        var colors = [];
        
        for (var i = 0; i < COLOR_COUNTS; i++) {
            var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
            var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
            var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
            colors.push(new Color(r, g, b));
        }
        
        var quantize = d3.scale.quantize()
            .domain([0, 1.0])
            .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));
        
        var path = d3.geo.path();
        
        var svg = d3.select("#canvas-svg").append("svg")
            .attr("width", width)
            .attr("height", height);
        
        d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {
        
        name_id_map = {};
        id_name_map = {};
        
        for (var i = 0; i < names.length; i++) {
            name_id_map[names[i].name] = names[i].id;
            id_name_map[names[i].id] = names[i].name;
        }
        
        data.forEach(function(d) {
            var id = name_id_map[d[MAP_STATE]];
            valueById.set(id, +d[MAP_VALUE]); 
        });
        
        quantize.domain([d3.min(data, function(d){ return +d[MAP_VALUE] }),
            d3.max(data, function(d){ return +d[MAP_VALUE] })]);
        
        d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(error, us) {
            svg.append("g")
                .attr("class", "states-choropleth")
            .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
                .attr("transform", "scale(" + SCALE + ")")
                .style("fill", function(d) {
                if (valueById.get(d.id)) {
                    var i = quantize(valueById.get(d.id));
                    var color = colors[i].getColors();
                    return "rgb(" + color.r + "," + color.g +
                        "," + color.b + ")";
                } else {
                    return "";
                }
                })
                .attr("d", path)
                .on("mousemove", function(d) {
                    var html = "";
        
                    html += "<div class=\"tooltip_kv\">";
                    html += "<span class=\"tooltip_key\">";
                    html += id_name_map[d.id];
                    html += "</span>";
                    html += "<span class=\"tooltip_value\">";
                    html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "");
                    html += "";
                    html += "</span>";
                    html += "</div>";
                    
                    $("#tooltip-container").html(html);
                    $(this).attr("fill-opacity", "0.8");
                    $("#tooltip-container").show();
                    
                    var coordinates = d3.mouse(this);
                    
                    var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
                    
                    if (d3.event.layerX < map_width / 2) {
                    d3.select("#tooltip-container")
                        .style("top", (d3.event.layerY + 15) + "px")
                        .style("left", (d3.event.layerX + 15) + "px");
                    } else {
                    var tooltip_width = $("#tooltip-container").width();
                    d3.select("#tooltip-container")
                        .style("top", (d3.event.layerY + 15) + "px")
                        .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
                    }
                })
                .on("mouseout", function() {
                        $(this).attr("fill-opacity", "1.0");
                        $("#tooltip-container").hide();
                    });
        
            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "states")
                .attr("transform", "scale(" + SCALE + ")")
                .attr("d", path);
        });
    });
});