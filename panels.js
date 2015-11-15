/*! panels by quoid v0.1.0 | GPL V2 License | http://quoid.github.io/panels/index.html */
var a = 1; //1 = closed, 2 = open, 3 = opening
var $trigger = $('[class*="-trigger"]');
var $panelWrap = $('.panel-pusher');
var timeoutLength = 250; //adjust to preference; prevents hyper clicking trigger (causes erratic behaviour)
var transEnd = 'transitionend webkitTransitionEnd'; //css3 transition callbacks

function fixSafariScroll() { //fixes safari scroll bug
    var $el = $('.panel-focus');
    $el.css('overflow-y', 'hidden');
    setTimeout(function() {
        $el.css('overflow-y', 'auto');
        $el.attr('style', '');
    });
}

function preventTouchScroll() { //this is needed to prevent touch device (mobile) scrolling without the need for convoluted workarounds
    $panelWrap.bind('touchmove', function(e) {
        return false;
    });
}

function enableTouchScroll() {
    $panelWrap.unbind('touchmove');
}

$trigger.click(function(e) {
    var triggerClass = $(this).attr('class').split(' ').filter(RegExp.prototype.test.bind(new RegExp('panel-'))).join().split('-');
    var activeClass = triggerClass.slice(0, 2).join('-') + '-active';
    var panelTarget = '.' + triggerClass[0] + '-' + triggerClass[1];
    var panelHeight = $(panelTarget).outerHeight(true);
    var panelWidth = $(panelTarget).outerWidth(true);

    if (a == 1) {
        $('body').addClass(activeClass);
        $(panelTarget).addClass('panel-opening'); //immediately add panel opening class
        preventTouchScroll(); //disable touch scroll

        if ($(panelTarget).is('.push-panel, .reveal-panel')) {

            switch (triggerClass[1]) {

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

        a = 3;
    } else if (a == 2) {
        $('body').removeClass(activeClass);
        $panelWrap.css('transform', ''); //remove inline styling from panel wrap
        $(panelTarget).addClass('panel-closing');
        a = 3;
    } else {
        return false;
    }

});

$('.panel').on(transEnd, function(e) {

    if (
        e.originalEvent.propertyName == 'z-index' //we are using z-index to track trans end
    ) {

        if ($(this).hasClass('panel-opening')) { //if panel is opening
            $(this).addClass('panel-focus'); //immediately after transition add the focus class
            fixSafariScroll(); //fixes safari scroll bug
            setTimeout(function() {
                $('.panel-focus').removeClass('panel-opening'); //wait to remove panel-opening so panels don't get hyper triggered
                a = 2;
            }, timeoutLength);
        } else if ($(this).hasClass('panel-closing')) { //if panel is closing
            $(this).removeClass('panel-focus'); //immediately after transition is over remove the focus class
            enableTouchScroll(); //enable touch (mobile) scrolling after panel is gone
            setTimeout(function() {
                $('.panel-closing').removeClass('panel-closing'); //wait to remove panel-closing so panels don't get hyper triggered
                a = 1;
            }, timeoutLength);
        }

    }

});

$('body').click(function(e) {
    var activePanelClass = 'panel-top-active panel-bottom-active panel-left-active panel-right-active';

    if (!$(e.target).closest('.panel, [class*="-trigger"]').length && //if the element clicked is NOT the panel or panel-trigger
        !$('panel-focus').hasClass('panel-force-close') && //the panel in focus doesn't have force close class
        a == 2 //and the panel is showing
    ) {
        $(this).removeClass(activePanelClass); //remove the body class
        $panelWrap.css('transform', ''); //remove inline styling from panel wrap
        $('.panel-focus').addClass('panel-closing'); //set the closing class on panel
        a = 3; //mark as closing
    }

});

$('body').keydown(function(e) { //block key input from moving window when panel open
    var $keyParent = $(e.target).parent();
    var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    var key = e.which;

    if (!$keyParent.hasClass('panel')) {

        switch (a) {

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

//include a way to trigger panel without panel-trigger

//might need to use panel wrapper opacity as the animator follow
//panels.show({position: 'left'});

Panels = { //uppercase so people know it is a class
	
	show: function (options) {
		var b = 1;
		var oPos = options['position'];
		var panelWidthff = $('.panel-' + oPos).outerWidth(true);
		var panelHeightff = $('.panel-' + oPos).outerHeight(true);
		
		switch (options['position']) {
			
			case 'top':
				$('body').addClass('panel-left-active');
				$('.panel-top').addClass('panel-opening');
				preventTouchScroll();
				if ($('.panel-top').is('.push-panel, .reveal-panel')) {
					$panelWrap.css('transform', "translate3d(0px, " + panelHeightff + "px, 0px)");
				}
				a = 3;
				break;
				
			case 'bottom':
				$('body').addClass('panel-left-active');
				$('.panel-bottom').addClass('panel-opening');
				preventTouchScroll();
				if ($('.panel-bottom').is('.push-panel, .reveal-panel')) {
					$panelWrap.css('transform', "translate3d(0px, " + -panelHeightff + "px, 0px)");
				}
				
				a = 3;
				break;
			
			case 'left':
				$('body').addClass('panel-left-active');
				$('.panel-left').addClass('panel-opening');
				preventTouchScroll();
				if ($('.panel-left').is('.push-panel, .reveal-panel')) {
					$panelWrap.css('transform', "translate3d(" + panelWidthff + "px, 0px, 0px)");
				}
				a = 3;
				break;
				
			case 'right':
				$('body').addClass('panel-left-active');
				$('.panel-right').addClass('panel-opening');
				preventTouchScroll();
				if ($('.panel-right').is('.push-panel, .reveal-panel')) {
					$panelWrap.css('transform', "translate3d(" + -panelWidthff + "px, 0px, 0px)");
				}
				a = 3;
				break;	
			
		}
		
	},
	
	hide: function() {
		var aPC = 'panel-top-active panel-bottom-active panel-left-active panel-right-active';
		$('body').removeClass(aPC);
		$panelWrap.css('transform', '');
        $('.panel-focus').addClass('panel-closing');
        a = 3;
	}
	
};

$('.cb').click(function(){
	panels.show({position: 'left'});
});