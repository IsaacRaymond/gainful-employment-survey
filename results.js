$(document).ready(function() {

  var request = new XMLHttpRequest();
  var request2 = new XMLHttpRequest();
  request.open("GET", "./collegelist.csv", false);
  request.send(null);

  request2.open("GET", "./majors.csv", false);
  request2.send(null);

  var collegeList = [];
  var majors = [];

  var jsonObject = request.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject.length; i++) {
    collegeList.push(jsonObject[i]);
  }

  var jsonObject2 = request2.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject2.length; i++) {
    majors.push(jsonObject2[i]);
  }


$( "#college" ).autocomplete({
  source: collegeList,
  minLength: 3,
  change: function(event, ui) {
  if (ui.item == null) {
    event.currentTarget.value = '';
    event.currentTarget.focus();
  }
}

});

$( "#area-of-study" ).autocomplete({
  source: majors,
  minLength: 3,
  change: function(event, ui) {
  if (ui.item == null) {
    event.currentTarget.value = '';
    event.currentTarget.focus();
  }
}
})
});

function getData(){
  $("#results").html("");
  let college = $('#college').val();
  let areaOfStudy = $('#area-of-study').val();
  if (college && !areaOfStudy){
    $.post('/dataNoMajor', {
      college: college
    }).done(function( data ){
      if(data.total <2){
        $("#results").html("The survey has not received enough responses for this school");
      }
      graphing(data.yes, data.total);
    });
  } else if (college && areaOfStudy){
    $.post('/data',
    {
      college: college,
      areaOfStudy: areaOfStudy
    }).done(function( data ){
      if(data.total <2){
        $("#results").html("The survey has not received enough responses for this school from this major");
      }
      graphing(data.yes, data.total);
    });
  }
}


function graphing(yes, total){
  $("#my_dataviz").html("");
  // set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = {a: yes, b: total}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
}
