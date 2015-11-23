$(function() {
    FastClick.attach(document.body);
});

$(".panel-trigger").click(function(){
	var a = $(this).attr("id");
	var b = $(".panel-trigger").data("close");
	$.panels.show({
        position: a,
        forceClose: b
    });
});

$(".panel-close").click(function(){
	var a = $(this).attr("id");
	$.panels.hide({
        position: a
    });
});

$("nav > a").click(function(){
	var x = $(this).attr("class");
	var y = $(this).data("close");
	if ($(this).is("#current")) {
		return false;
	} else {
		$("nav > a").removeAttr("id");
		$(".panel-trigger").attr("id", x);
		$(".panel-trigger").data("close", y);
		$(this).attr("id", "current");
	}
	
});

//tabs
$('ul.tabs').each(function(){
    // For each set of tabs, we want to keep track of
    // which tab is active and it's associated content
    var $active, $content, $links = $(this).find('a');

    // If the location.hash matches one of the links, use that as the active tab.
    // If no match is found, use the first link as the initial active tab.
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');

    $content = $($active[0].hash);

    // Hide the remaining content
    $links.not($active).each(function () {
      $(this.hash).hide();
    });

    // Bind the click event handler
    $(this).on('click', 'a', function(e){
      // Make the old tab inactive.
      $active.removeClass('active');
      $content.hide();

      // Update the variables with the new link and content
      $active = $(this);
      $content = $(this.hash);

      // Make the tab active.
      $active.addClass('active');
      $content.show();

      // Prevent the anchor's default click action
      e.preventDefault();
    });
  });


$('#menu').click(function(){
	$('.panel-top .default').css('display', 'none');
	$('.panel-top .demo').css('display', 'block');
	$.panels.show({
		position: 'top'
	});
});

$('#menu-close').click(function(){
	$.panels.hide({
		position: 'top'
	});
});

$('.panel-trigger').click(function(){
	$('.panel-left ').removeClass('page-ex-bg');
	$('.panel .default').css('display', '');
	$('.panel .demo').css('display', '');
});

$('#message-example').click(function(){
	$('.panel-bottom .default').css('display', 'none');
	$('.panel-bottom .demo').css('display', 'block');
	$.panels.show({
		position: 'bottom',
		forceClose: true
	});
});

$('#message-close').click(function(){
	$.panels.hide({
		position: 'bottom'
	});
});

$('#page-example').click(function(){
	$('.panel-left ').addClass('page-ex-bg');
	$('.panel-left .default').css('display', 'none');
	$('.panel-left .demo').css('display', 'block');
	$.panels.show({
		position: 'left',
	});
});

$('#page-example-close').click(function(){
	$.panels.hide({
		position: 'left'
	});
});