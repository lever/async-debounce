module.exports = debounce;

var slice = [].slice;

function debounce(fn, interval) {
  var timeout;
  var running = false;
  var nextArgs;
  
  function done() {
    running = false;
    var args = nextArgs;
    if (args) {
      nextArgs = null;
      run(args);
    }
  }
  
  function run(args) {
    running = true;
    fn.apply(null, args);
  }
  
  return function() {
    var args = slice.call(arguments);
    args.push(done);
    
    if (running) return nextArgs = args;
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(function() {
      timeout = null;
      run(args);
    }, interval);
  }
}