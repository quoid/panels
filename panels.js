/*! panels by quoid v0.1.0 | GPL V2 License | http://quoid.github.io/panels/index.html */

var transEnd = 'transitionend webkitTransitionEnd oTransitionEnd'

$('[class*="panel-trigger"]').on('click', function() {
	var x = $(this).attr('class').trim().split(' ')
	var y = x.filter(RegExp.prototype.test.bind(new RegExp("panel-trigger")))
	var z = y.join()
	var parentClass = z.trim().split('-').slice(0,2)
	var parentClassActive = parentClass.join('-') + '-active'
	var panelTarget = '.' + parentClass[0] + '.' + parentClass[1]
	var panelHeight = $(panelTarget).outerHeight( true )
	var panelWidth = $(panelTarget).outerWidth( true )
					
	if ($(panelTarget).hasClass('push')) {
				
		if ($(panelTarget).hasClass('panel-focus') ) {
			
			$('.panel-wrapper').removeAttr("style");
			$(panelTarget).addClass('panel-closing');
			
		} else {
			
			$(panelTarget).addClass('panel-focus');
			
			if ( parentClass[0] === 'top') {
				
				$('.panel-wrapper').css('transform',"translate3d(0px, " + panelHeight + "px, 0px)");
				
			} else if ( parentClass[0] === 'right') {
				
				$('.panel-wrapper').css('transform', "translate3d(" + -panelWidth + "px, 0px, 0px)");
				
			} else if ( parentClass[0] === 'bottom') {
				
				$('.panel-wrapper').css('transform',"translate3d(0px, " + -panelHeight + "px, 0px)");
				
			} else if ( parentClass[0] === 'left') {
				
				$('.panel-wrapper').css('transform', "translate3d(" + panelWidth + "px, 0px, 0px)");
				
			}
			
		}

	} else if ($(panelTarget).hasClass('reveal')) {
		
		if ($(panelTarget).hasClass('panel-focus') ) {
			
			$('.panel-wrapper').removeAttr("style");
			$(panelTarget).addClass('panel-closing')
			
		} else {
			
			$(panelTarget).addClass('panel-focus')
			
			if ( parentClass[0] === 'top') {
				
				$('.panel-wrapper').css('transform',"translate3d(0px, " + panelHeight + "px, 0px)");
				
			} else if ( parentClass[0] === 'right') {
				
				$('.panel-wrapper').css('transform', "translate3d(" + -panelWidth + "px, 0px, 0px)");
				
			} else if ( parentClass[0] === 'bottom') {
				
				$('.panel-wrapper').css('transform',"translate3d(0px, " + -panelHeight + "px, 0px)");
				
			} else if ( parentClass[0] === 'left') {
				
				$('.panel-wrapper').css('transform', "translate3d(" + panelWidth + "px, 0px, 0px)");
				
			}
			
		}
		
	} else if ($(panelTarget).hasClass('slide')) {
		
		if ($(panelTarget).hasClass('panel-focus') ) {
		
			$(panelTarget).addClass('panel-closing')
		
		} else {
			
			$(panelTarget).addClass('panel-focus')
			
		}
		
	}
	
	$('body').toggleClass(parentClassActive);
});

$('.panel-wrapper').on(transEnd, function(){
	
	if ($('.reveal').hasClass('panel-closing')) {
		
		$('.reveal').removeClass('panel-closing panel-focus');
	
	}
	
});

$('.push.panel, .slide.panel').on(transEnd, function(){
	
	if ($(this).hasClass('panel-closing')) {
		
		$(this).removeClass('panel-closing panel-focus');
		
	}
	
});

$('body').on('click', function(e){
	var activePanelClass = 'top-panel-active right-panel-active bottom-panel-active left-panel-active'
	
	if( !$(e.target).closest('.panel, [class*="panel-trigger"]').length && !$('.panel-focus').hasClass('force-close') ) {
		$('.panel-focus').addClass('panel-closing');
		$('.panel-wrapper').removeAttr("style");
		$(this).removeClass(activePanelClass);
	}
	
});