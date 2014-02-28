
var async = require('async');
var http = require('http');

// Get command line arguments;
var argv = require('optimist').demand(['n', 'c']).argv;
var url = argv._[0];

// Initialize results array.
var results = [];

// Create the queue.
var queue = async.queue(function (index, callback) {
  // Mark the start of the request.
  var start = new Date();

  http.get(url, function (res) {
    // Save the request time.
    results.push(new Date() - start);
    // Let the queue know this task is finished.
    callback();

    res.on('data', function () {});
  });
}, argv.c);

// Add items to the queue.
for (var x = 0; x < argv.n; x++) {
  queue.push(x);
}

// When the queue is empty, this callback will run.
queue.drain = function () {
  // Sum all the request times.
  var total = results.reduce(function (memo, num) {
    return memo + num;
  }, 0);

  // Display the average.
  console.log('\nAverage request time:', total / results.length, '[ms]');
};

