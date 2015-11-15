/*! panels by quoid v0.2.0 | GPL V2 License | http://quoid.github.io/panels/index.html */
(function($) {
    'use strict';

    var active = 1; //1 = closed, 2 = opening, 3 = open
    var timeoutLength = 350; 
    var transEnd = 'transitionend webkitTransitionEnd'; //css3 transition callbacks
    var $panelWrap = $('.panel-pusher');

    $.panels = {

        show: function(options) {
            var panelTarget = options['position'];
            var a = '.panel-' + panelTarget;
            var panelCount = $(a).length;
            if (panelCount != 1) { //if the user added more than one panel of the same position, do nothing, print error
	            console.error('only one panel element of the same position is allowed');
	            return false;
            } 
            if(options["forceClose"] === true) {
		    	$(a).addClass('panel-force-close');
		    }
		    if (options["timeOut"] !== null) {
			    timeoutLength = options["timeOut"];
		    }
            switch (panelTarget) {
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                    if (active === 1) {
                        showPanel(panelTarget);
                        preventTouchScroll();
                    } else if (active === 2) {
                        console.error('panel animation in progress');
                    } else {
                        console.error('panel already shown');
                    }
                    break;
                default:
                    console.error('incorrect argument');
                    break;
            }
	        
        },

        hide: function(options) {
            var panelTarget = options['position'];
            switch (panelTarget) {
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                    if (active === 1) {
                        console.error('panel already hidden');
                    } else if (active === 2) {
                        console.error('panel already in progress');
                    } else {
	                   if (options["timeOut"] !== null) {
						    timeoutLength = options["timeOut"];
					    }
                        hidePanel(panelTarget);
                        enableTouchScroll();
                    }
                    break;
                default:
                    console.error('incorrect argument');
                    break;
            }
        }
    };

    function showPanel(p1) {
        var panel = '.panel-' + p1;
        var panelHeight = $(panel).outerHeight(true);
        var panelWidth = $(panel).outerWidth(true);
        $('body').addClass('panel-' + p1 + '-active').css('overflow', 'hidden');
        $(panel).addClass('panel-opening');
        active = 2;

        if ($(panel).is('.push-panel, .reveal-panel')) {
            switch (p1) {
                case 'top':
                    $panelWrap.css('transform', "translate3d(0px, " + panelHeight + "px, 0px)");
                    break;
                case 'bottom':
                    $panelWrap.css('transform', "translate3d(0px, " + -panelHeight + "px, 0px)");
                    break;
                case 'left':
                    $panelWrap.css('transform', "translate3d(" + panelWidth + "px, 0px, 0px)");
                    break;
                case 'right':
                    $panelWrap.css('transform', "translate3d(" + -panelWidth + "px, 0px, 0px)");
                    break;
            }
        }
    }

    function hidePanel(p1) {
        var panel = '.panel-' + p1;
        var b = 'panel-top-active panel-bottom-active panel-left-active panel-right-active';
        $('body').removeClass(b);
        $panelWrap.css('transform', '');
        $(panel).addClass('panel-closing').removeClass('panel-force-close');
        active = 2;
    }

    $('.panel').on(transEnd, function(e) {
        if (e.originalEvent.propertyName == 'z-index') { //we are using z-index to track trans end
            if ($(this).hasClass('panel-opening')) { //if panel is opening
                $(this).addClass('panel-focus'); //immediately after transition, add the focus class
                fixSafariScroll(); //fixes safari scroll bug
                setTimeout(function() { //wait to remove panel-opening so panels don't get hyper triggered
                    $('.panel-focus').removeClass('panel-opening');
                    active = 3;
                }, timeoutLength);
            } else if ($(this).hasClass('panel-closing')) { //if panel is closing
                $(this).removeClass('panel-focus'); //immediately after transition is over remove the focus class
                $('body').attr('style', '');
                enableTouchScroll(); //enable touch (mobile) scrolling after panel is gone
                setTimeout(function() {
                    $('.panel-closing').removeClass('panel-closing'); //wait to remove panel-closing so panels don't get hyper triggered
                    active = 1;
                }, timeoutLength);
            }
        }
    });
    
    $('body').click(function(e) {
	    if (!$(e.target).closest('.panel').length && //if the element clicked is NOT the panel or panel-trigger
	        !$('.panel-focus').hasClass('panel-force-close') && //and the user hasn't selected force close
	        active == 3 //and the panel is showing
	    ) {
	        hidePanel('focus');
	    }
	});
	
	$('body').keydown(function(e) { //block key input from moving window when panel open
	    var $keyParent = $(e.target).parent();
	    var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; //spacebar, pageup, pagedown, end, home, left arrow, up arrow, right arrow, down arrow
	    var key = e.which;
	    if (!$keyParent.hasClass('panel')) {
	        switch (active) {
	            case 1:
	                break;
	            case 2:
	            case 3:
	                if ($.inArray(key, keys) !== -1) {
	                    return false;
	                }
	                break;
	        }
	    }
	});
	
	function preventTouchScroll() { //this is needed to prevent touch device (mobile) scrolling without the need for convoluted workarounds
        $panelWrap.bind('touchmove', function() {
            return false;
        });
    }

    function enableTouchScroll() {
        $panelWrap.unbind('touchmove');
    }

    function fixSafariScroll() { //fixes safari scroll bug
        var $el = $('.panel-focus');
        $el.css('overflow-y', 'hidden');
        setTimeout(function() {
            $el.css('overflow-y', 'auto');
            $el.attr('style', '');
        });
    }
	
}(jQuery));