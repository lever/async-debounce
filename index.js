module.exports = debounce;

var slice = [].slice;

function debounce(fn, interval) {
  var timeout;
  var running = false;
  var nextArgs;
  
  function done() {
    running = false;
    if (nextArgs) {
      run(nextArgs);
      nextArgs = null;
    }
  }
  
  function run(args) {
    fn.apply(null, args);
    running = true;
  }
  
  return function() {
    var args = slice.call(arguments);
    args.push(done);
    
    if (running) return nextArgs = args;
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(function() {
      run(args);
      timeout = null;
    }, interval);
  }
}