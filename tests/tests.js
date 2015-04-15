(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//make "use strict" and nodejs happy

//test reporting for saucelabs
if (typeof window != "undefined") {
    window.global_test_results = {
        tests: [],
        duration: 0,
        passed: 0,
        failed: 0
    };
}

function test(condition) {
    var duration = 0
    var start = 0
    var result = true
    test.total++

    if (typeof performance != "undefined" && performance.now) {
        start = performance.now()
    }
    try {
        if (!condition()) throw new Error("failed")
    }
    catch (e) {
        result = false
        console.error(e)
        test.failures.push(condition)
    }
    if (typeof performance != "undefined" && performance.now) {
        duration = performance.now() - start
    }

    window.test_obj = {
        name: "" + test.total,
        result: result,
        duration: duration
    }

    if (typeof window != "undefined") {
        if (!result) {
            window.global_test_results.tests.push(window.test_obj)
        }

        window.global_test_results.duration += duration
        if (result) {
            window.global_test_results.passed++
        } else {
            window.global_test_results.failed++
        }
    }
}
test.total = 0
test.failures = []
test.print = function(print) {
    for (var i = 0; i < test.failures.length; i++) {
        print(test.failures[i].toString())
    }
    print("tests: " + test.total + "\nfailures: " + test.failures.length)

    if (test.failures.length > 0) {
        throw new Error(test.failures.length + " tests did not pass")
    }
}

module.exports = test;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9tYWtlIFwidXNlIHN0cmljdFwiIGFuZCBub2RlanMgaGFwcHlcclxuXHJcbi8vdGVzdCByZXBvcnRpbmcgZm9yIHNhdWNlbGFic1xyXG5pZiAodHlwZW9mIHdpbmRvdyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICB3aW5kb3cuZ2xvYmFsX3Rlc3RfcmVzdWx0cyA9IHtcclxuICAgICAgICB0ZXN0czogW10sXHJcbiAgICAgICAgZHVyYXRpb246IDAsXHJcbiAgICAgICAgcGFzc2VkOiAwLFxyXG4gICAgICAgIGZhaWxlZDogMFxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdChjb25kaXRpb24pIHtcclxuICAgIHZhciBkdXJhdGlvbiA9IDBcclxuICAgIHZhciBzdGFydCA9IDBcclxuICAgIHZhciByZXN1bHQgPSB0cnVlXHJcbiAgICB0ZXN0LnRvdGFsKytcclxuXHJcbiAgICBpZiAodHlwZW9mIHBlcmZvcm1hbmNlICE9IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2Uubm93KSB7XHJcbiAgICAgICAgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKVxyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoIWNvbmRpdGlvbigpKSB0aHJvdyBuZXcgRXJyb3IoXCJmYWlsZWRcIilcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gZmFsc2VcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpXHJcbiAgICAgICAgdGVzdC5mYWlsdXJlcy5wdXNoKGNvbmRpdGlvbilcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcGVyZm9ybWFuY2UgIT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZS5ub3cpIHtcclxuICAgICAgICBkdXJhdGlvbiA9IHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cudGVzdF9vYmogPSB7XHJcbiAgICAgICAgbmFtZTogXCJcIiArIHRlc3QudG90YWwsXHJcbiAgICAgICAgcmVzdWx0OiByZXN1bHQsXHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxfdGVzdF9yZXN1bHRzLnRlc3RzLnB1c2god2luZG93LnRlc3Rfb2JqKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93Lmdsb2JhbF90ZXN0X3Jlc3VsdHMuZHVyYXRpb24gKz0gZHVyYXRpb25cclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxfdGVzdF9yZXN1bHRzLnBhc3NlZCsrXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93Lmdsb2JhbF90ZXN0X3Jlc3VsdHMuZmFpbGVkKytcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxudGVzdC50b3RhbCA9IDBcclxudGVzdC5mYWlsdXJlcyA9IFtdXHJcbnRlc3QucHJpbnQgPSBmdW5jdGlvbihwcmludCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXN0LmZhaWx1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcHJpbnQodGVzdC5mYWlsdXJlc1tpXS50b1N0cmluZygpKVxyXG4gICAgfVxyXG4gICAgcHJpbnQoXCJ0ZXN0czogXCIgKyB0ZXN0LnRvdGFsICsgXCJcXG5mYWlsdXJlczogXCIgKyB0ZXN0LmZhaWx1cmVzLmxlbmd0aClcclxuXHJcbiAgICBpZiAodGVzdC5mYWlsdXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRlc3QuZmFpbHVyZXMubGVuZ3RoICsgXCIgdGVzdHMgZGlkIG5vdCBwYXNzXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGVzdDtcclxuIl19
