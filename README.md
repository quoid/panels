# Panels
Easy off canvas elements

[http://quoid.github.io/panels/index.html](http://quoid.github.io/panels/index.html)

## Dependencies
* [**jQuery**](https://github.com/jquery/jquery)

## Notes
Panels is made for modern browsers; support for older browsers will vary. Panels makes use of:
* [CSS3 Transforms](http://caniuse.com/#feat=transforms3d)
* [CSS Transitions](http://caniuse.com/#feat=css-transitions)
* [Viewport Units](http://caniuse.com/#feat=viewport-units)

## Usage

**Include necessary files**
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

**Markup**

Below is a typical structure for using panels. 
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
Both the `.panel` element and the `.panel-pusher` element should come directly after your `<body>` opening tag. You must include an element with the `.panel` class and a **single** `.panel-<direction>` class (`.panel-top` `.panel-right` `panel-bottom` `.panel-left`) element. The `.panel-pusher` element will be what you wrap your site content around; it is mandatory for panels to function.

**Methods**

There are two methods, and a few options.

```js
$.panels.show({
	position: 'left', //accepted arguments are 'top', 'right', 'bottom', 'left'
	timeOut: 1000 //integer, sets the timeout between showing/hiding panel; in ms
	forceClose: true, //boolean, exclusive to the `show` method; if true clicking on body element will not close panel - default: false
});
```

```js
$.panels.hide({
	position: 'left', //accepted arguments are 'top', 'right', 'bottom', 'left'
	timeOut: 1000 //integer, sets the timeout between showing/hiding panel; in ms - default: 350
});
```

## Contributing

Feel free to fork, share and use this project.

### Bugs

If you happen to come across a bug, please [create an issue](https://github.com/quoid/panels/issues) and **include a publicly accessible reproduction of the bug**. Under most circumstances this is necessary.

### Improvements

I ***very*** much welcome improvements to the project. Feel free to fork and create a pull request with valuable improvements. If worthwhile, it will be merged.

## License
[GPL v2](http://choosealicense.com/licenses/gpl-2.0/)
