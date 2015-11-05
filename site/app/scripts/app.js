var app = angular.module('mdMouseHoldApp', [
  'md.mouseHold',
  'hljs'
]);

app.config(function (hljsServiceProvider) {
  hljsServiceProvider.setOptions({
    tabReplace: '  '
  });
});