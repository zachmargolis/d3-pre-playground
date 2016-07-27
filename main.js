var d3 = require('d3')

var data = [
  [1, 1],
  [2, 2],
  [3, 3],
]

function getData(cb) {
  // Delay so we can easily tell the difference between pre-rendered and normal
  setTimeout(function() {
    cb(data)
  }, 2000)
}

getData(function(data) {
  var svg = d3.select('.container')
    .selectAll('svg')
    .data([data], function(d, i) { return i })

  var circles = svg.enter()
    .append('svg')
      .attr('height', 200)
      .attr('width', 200)
    .merge(svg)
      .selectAll('circle')
      .data(data, function(d, i) { return i })

  var allcircles = circles.enter()
    .append('circle')
    .merge(circles)

  allcircles
    .attr('cx', function(d) { return 10 * d[0] })
    .attr('cy', function(d) { return 10 * d[1] })
    .attr('r', 5)

  d3.select('.scramble')
    .on('click', scramble)})

function scramble() {
  data.forEach(function(d) {
    d[0] = randInt(1, 3)
    d[1] = randInt(1, 3)
  });

  allcircles
    .transition()
      .attr('cx', function(d) { return 10 * d[0] })
      .attr('cy', function(d) { return 10 * d[1] })
}

function randInt(min, max) {
  return min + Math.floor(max * Math.random());
}