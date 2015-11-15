# Panels
Easy off canvas elements

[http://quoid.github.io/panels/index.html](http://quoid.github.io/panels/index.html)

### Dependencies
* [**jQuery**](https://github.com/jquery/jquery)

### Include
Link to the jQuery and panels.
```html
<!-- include jquery -->
<script src="/path/to/jquery.js"></script>
<!-- include panels -->
<script src="/panels.min.js"></script>
```
Both the expanded src `scss` and minified compiled `css` files are included; link to one of them in your projects.
```html
<link rel="stylesheet" href="/path/to/panels.min.css">
```
### Notes
Panels is made for modern browsers; support for older browsers will vary. Panels makes use of:
* [CSS3 Transforms](http://caniuse.com/#feat=transforms3d)
* [CSS Transitions](http://caniuse.com/#feat=css-transitions)
* [Viewport Units](http://caniuse.com/#feat=viewport-units)
### Usage
```html
<body>
	<div class="panel panel-left">
		<button class="panel-trigger"></button>
		<!-- panel content goes here -->
	</div>
	<div class="panel-pusher">
		<!-- site content goes here -->
		<button class="panel-trigger"></button>
	</div>
</body>
```