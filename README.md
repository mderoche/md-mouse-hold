# md-mouse-hold

AngularJS directive to track mouse click holding.


### Setup
* `bower install md-mouse-hold --save`
* Add `md.mouseHold` to your application dependencies

### Usage

```javascript
<div md-mouse-hold="holdingFn(ticks)" md-mouse-hold-options="options">
  Click and Hold
</div>
```

* The `holdingFn(ticks)` function is called continuously while the mouse button is being held down.
* While the mouse button is held, the element gets the `.md-mouse-hold-holding` class.

### Options

Name  | Description | Default
------------- | ------------- | -------------
delay | Milliseconds between each holding function call (tick) | 5
onRelease | `function(duration)` called when the mouse button is released | noop
buttons | Array of buttons to listen for ('left', 'middle', right', or ID) | ['left']
