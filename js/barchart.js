/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: find element with id "hard-coded-bar" and add an svg to build within 
//using dimensions set above for width, height and viewBox
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: Find the maximum y value provided within 'data1' by going through scores column
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: For y value, lists what pixel value to plot, linearly scales data 
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: For x values, lists what pixel value to add to plot
let xScale1 = d3.scaleBand() // uses scaleBand rather than linearly scaling data
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: Adds the left y axis to the barchart by appending the axis to previously created svg
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: Adds the x axis to the svg
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) // gives the x axis scale
            .tickFormat(i => data1[i].name))  // use .tickformat to add specific labels to each tick mark
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO:  
const tooltip1 = d3.select("#hard-coded-bar") // selects the div with hard-coded-car
                .append("div") 
                .attr('id', "tooltip1") // appending new div and adds a new id "tooltip1"
                .style("opacity", 0) // for the div add an opacity value
                .attr("class", "tooltip"); 

// TODO: when the mouse hovers over data, display data name, score, and changes opacity to 1 from 0 
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: when the tool tip moves, the labels move with the mouse
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: when the mouse leaves the bar, make the tool tip transparent again
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO:  
svg1.selectAll(".bar") // select everything from the class bar for svg 1
   .data(data1) // binds data to empty selection
   .enter()  // makes a placeholder svg for each row in data1
   .append("rect") // appends a rectangle to svg 1 for each row in data1
     .attr("class", "bar") // assign the bar class 
     .attr("x", (d,i) => xScale1(i)) // setting x position for the rectangles based on the data and what row we are on
     //, return x scale of the row we are on
     .attr("y", (d) => yScale1(d.score)) // setting y position based on yscale of the score
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // set height for the bars
     .attr("width", xScale1.bandwidth()) // set width for the bars, bandwith allows d3 to go through number of categories and space and 
     // choose appropriate bandwith
     .on("mouseover", mouseover1) // link event listener to the bar and links it to the correct previously defined actions 
     // for mouseover1, mousemove1, and mouseleave1
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// create new svg object for csv based barchart
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


// To do this, we'll need a python simple server 
// (python3 -m http.server) running from the directory that
// our code is in. 

d3.csv("barchart.csv").then((data2) => { 

  // let's check our data
  console.log(data);


// TODO: Find the maximum y value provided within 'data1' by going through scores column
let maxY2 = d3.max(data2, function(d) { return d.score; });

// TODO: For y value, lists what pixel value to plot, linearly scales data 
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

// TODO: For x values, lists what pixel value to add to plot
let xScale2 = d3.scaleBand() // uses scaleBand rather than linearly scaling data
            .domain(d3.range(data2.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

 // Tooltip Set-up  


// TODO:  
const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: when the mouse hovers over data, display data name, score, and changes opacity to 1 from 0 
const mouseover2 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: when the tool tip moves, the labels move with the mouse
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: when the mouse leaves the bar, make the tool tip transparent again
const mouseleave2 = function(event, d) { 
  tooltip1.style("opacity", 0); 


// add bars with styling 
svg5.selectAll("bar") 
      .data(data2) // this is passed into the anonymous function
      .enter()  
      .append("rect") // appends a rectangle to svg 1 for each row in data1
        .attr("class", "bar") // assign the bar class 
        .attr("x", (d,i) => xScale2(i)) // setting x position for the rectangles based on the data and what row we are on
        //, return x scale of the row we are on
        .attr("y", (d) => yScale2(d.score)) // setting y position based on yscale of the score
        .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) // set height for the bars
        .attr("width", xScale2.bandwidth())
        .on("mouseover", mouseover2)
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave);
};