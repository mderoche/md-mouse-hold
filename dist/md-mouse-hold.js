/**
 * md-mouse-hold
 * Version: 1.0.0
 * Author:  Mike Deroche (http://mikederoche.com, https://github.com/mderoche)
 * License: MIT
 */
(function (angular) {
  angular
    .module('md.mouseHold', [])
    .directive('mdMouseHold', function ($parse, $interval, $timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var fn = $parse(attrs.mdMouseHold),
            pr,
            timer,
            tickas;
          
          // maps mouse button strings to IDs used by jqLite
          var buttonMap = {
            left: 0,
            middle: 1,
            right: 2
          };
          
          // default options
          var options = {
            delay: 5,
            onRelease: function (duration) {},
            buttons: [buttonMap.left]
          };
          
          // executes the holding function
          var runFn = function () {
            fn(scope, {
              ticks: ticks++
            });
          };
          
          // determines if a button is allowed to be held
          var isValidButton = function (btn) {
            if (options.buttons === 'all') {
              return true;
            };
            
            var buttons = [];
            angular.forEach(options.buttons, function (button) {
              if (typeof button === 'string') {
                buttons.push(buttonMap[button]);
              } else {
                buttons.push(button);
              }
            });
            
            return ~buttons.indexOf(btn);  
          };
          
          // watch for option changes and update if needed
          attrs.$observe('mdMouseHoldOptions', function (opts) {
            var newOptions = $parse(opts)(scope);
            for (var o in newOptions) {
              options[o] = newOptions[o];
            }
          });
          
          // start tracking on mousedown
          element.on('mousedown', function (e) {
            if (!isValidButton(e.button)) {
              return;
            }
            
            element.addClass('md-mouse-hold-holding');

            ticks = 0;
            timer = (new Date()).getTime();
            
            // execute the first iteration of the holding function
            $timeout(function () {
              runFn();
            }, 0);

            // continuously run the holding function
            pr = $interval(function () {
              runFn();
            }, options.delay);
          });
          
          // handler for all release events
          var release = function (e) {
            if (!isValidButton(e.button) || pr === undefined) {
              return;
            }

            element.removeClass('md-mouse-hold-holding');
            $interval.cancel(pr);

            var now = (new Date()).getTime();
            options.onRelease(now - timer);
          }
          
          // finish tracking on mouseup
          element.on('mouseup', release);
          element.on('mouseleave', release);
        }
      };
    });
})(angular);
