$('nav > a').on('click', function() {
	var x = $(this).attr('class').trim().split(' ').slice(0,1)
	var qq = x.join()
	var y = x.join('-') + '-content'
	var vbx = x.join('-') + '-panel-trigger'
	var z = '#' + y
			
	if (!$(this).hasClass('current')) {	
		
		$('main button').html('open panel').removeClass('example wobble swing');
		$('main button').removeClass('top-panel-trigger right-panel-trigger left-panel-trigger bottom-panel-trigger');
		$('main button').addClass(vbx);
		$('.panel').children().addClass('hide');
		$('.panel').removeClass('left right bottom top alt').addClass(qq);
		$(z).removeClass('hide');
		$('nav > a').removeClass('current');
		$(this).addClass('current');
		
		if ($(this).hasClass('top')) {
			
			$('.panel').removeClass('push reveal force-close full-page');
			$('.panel').addClass('slide');
			
		} else if ($(this).hasClass('bottom')) {
			
			$('.panel').removeClass('slide reveal force-close');
			$('.panel').addClass('push full-page');
			
		} else if ($(this).hasClass('right')) {
			
			$('.panel').removeClass('slide reveal force-close full-page');
			$('.panel').addClass('push');
			
		} else if ($(this).hasClass('left')) {
			
			$('.panel').removeClass('slide push full-page');
			$('.panel').addClass('reveal force-close');
			
		}
		
		
	}
		
});





$('#menu').on('click', function() {
	
	$('nav > a').removeClass('current');
	$('main button').removeClass('right-panel-trigger bottom-panel-trigger left-panel-trigger').addClass('top-panel-trigger example').html('open menu');
	$('.panel').removeClass('push reveal force-close full-page right bottom left alt');
	$('.panel').addClass('top slide');
	$('.panel').children().addClass('hide')
	$('#demo-menu').removeClass('hide');
	$(this).addClass('active');
	
	if ($('main button').hasClass('swing')) {
		$('main button').addClass('wobble');
		$('main button').removeClass('swing');
	} else if ($('main button').hasClass('wobble')) {
		$('main button').addClass('swing');
		$('main button').removeClass('wobble');
		
	} else {
		$('main button').addClass('wobble');
	}
	
});

$('#message-example').on('click', function() {
	
	$('nav > a').removeClass('current');
	$('main button').removeClass('right-panel-trigger top-panel-trigger left-panel-trigger').addClass('bottom-panel-trigger example').html('open message');
	$('.panel').removeClass('push reveal full-page right top left alt');
	$('.panel').addClass('bottom slide force-close');
	$('.panel').children().addClass('hide')
	$('#demo-message').removeClass('hide');
	
	if ($('main button').hasClass('swing')) {
		$('main button').addClass('wobble');
		$('main button').removeClass('swing');
	} else if ($('main button').hasClass('wobble')) {
		$('main button').addClass('swing');
		$('main button').removeClass('wobble');
		
	} else {
		$('main button').addClass('swing');
	}
	
});

$('#page-example').on('click', function() {
	
	$('nav > a').removeClass('current');
	$('main button').removeClass('right-panel-trigger top-panel-trigger bottom-panel-trigger').addClass('left-panel-trigger example').html('open page');
	$('.panel').removeClass('push slide right top bottom');
	$('.panel').addClass('left reveal force-close full-page alt');
	$('.panel').children().addClass('hide')
	$('#demo-page').removeClass('hide');
	
	if ($('main button').hasClass('swing')) {
		$('main button').addClass('wobble');
		$('main button').removeClass('swing');
	} else if ($('main button').hasClass('wobble')) {
		$('main button').addClass('swing');
		$('main button').removeClass('wobble');
		
	} else {
		$('main button').addClass('swing');
	}
	
});