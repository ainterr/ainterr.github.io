/*
Copyright (c) 2015 by Alex Interrante-Grant (http://ainterr.github.io) 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function generate_timeline(awidth, aheight, start_date, end_date, parent_node) {
  var margin = {top: 20, right: 40, bottom: 50, left: 40},
    width = awidth - margin.left - margin.right,
    height = aheight - margin.top - margin.bottom;

  var x = d3.time.scale()
    .domain([start_date, end_date])
    .range([0, width]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var div = d3.select(parent_node).append("div")
    .attr("class", "timeline")
    .style("text-align", "center");

  var text = div.append("div")
    .attr("class", "timeline-text")
    .style("width", awidth+"px")
    .style("padding-right", "20px")
    .style("padding-left", "20px")
    .style("padding-top", "10px")
    .style("padding-bottom", "10px")
    .style("margin", "0 auto");

  var title = text.append("p").append("h3")
    .style("text-align", "left");
  var desc = text.append("p")
    .style("text-align", "justify");
  
    
  var svg = div.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#EEEEEE");

  svg.append("g")
    .attr("class", "timeline-axis")
    .attr("transform", "translate("+margin.left+","+height+")")
    .call(xAxis)
  .selectAll("text")
    .attr("y", 10)
    .attr("x", 10)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
    .style("font", "12px sans-serif");
  
  canvas = svg.append("g")
    .attr("class", "canvas")
    .attr("transform", "translate("+margin.left+","+margin.top+")");
      
  return { "svg": svg, "canvas": canvas, "scale": x, "canvas_height": aheight-70-margin.top, "canvas_width": awidth-margin.left-margin.right, "text": { "title": title, "desc": desc } };
}

function draw_events(timeline, data) {
  event_height = 50;
  
  rects = timeline.canvas.selectAll("rect")
    .data(data).enter()
    .append("rect");
    
  rects.attr("class", "event")
    .attr("height", event_height)
    .attr("y", timeline.canvas_height - event_height - 5)
    .style("cursor", "pointer")
    .style("fill", function(d) { return d.color; })
    .attr("x", function(d) { return timeline.scale(d.start_date); })
    .attr("width", function(d) { return timeline.scale(d.end_date) - timeline.scale(d.start_date); })
    .on("click", function(d) {
        timeline.text.title.transition()
          .duration(150)
          .style("opacity","0")
          .each("end",function() { 
            timeline.text.title.html(d.company);
          })
          .transition()
          .duration(150)
          .style("opacity","1");
          
        timeline.text.desc.transition()
          .duration(150)
          .style("opacity","0")
          .each("end", function() { 
            timeline.text.desc.html(d.description);
          })
          .transition()
          .duration(150)
          .style("opacity","1");
          
        d3.selectAll(".event")
          .transition()
          .duration(200)
          .attr("y", timeline.canvas_height - event_height - 5);
          
        d3.select(this)
          .transition()
          .duration(200)
          .attr("y", timeline.canvas_height - event_height - 15);
    });
  
  d3.select(".event").attr("y", timeline.canvas_height - event_height - 15);
  timeline.text.title.html(data[0].company);
  timeline.text.desc.html(data[0].description);
}

function get_min_date(data) {
  min = new Date();
  data.forEach(function(d) { if (d.start_date < min) min = d.start_date; });
  return min;
}