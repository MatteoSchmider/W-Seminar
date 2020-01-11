// sticky float
(function($) {	
	//$.lockfixed("#rightAside #wb_right",{offset: {top: 90, bottom: 1230}});
	$.lockfixed("#sidebar #wb_left",{offset: {top: 54, bottom: 603}});
	$.lockfixed("#wb_right #interessehalber",{offset: {top: 54, bottom: 603}});	
})(jQuery);

// smartMenus vertical
$(function() {
  $('#main-menu').smartmenus({
	  mainMenuSubOffsetX: 6,
	  mainMenuSubOffsetY: 0,
	  subMenusSubOffsetX: 6,
	  subMenusSubOffsetY: 0,
	  markCurrentItem:true
  });
});
	
// Weiches Scrollen
$(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
	  $('.scrollup').fadeIn();
  } 
  else {
	$('.scrollup').fadeOut();
  }  
});

$('.scrollup').click(function(){
	$("html, body").animate({ scrollTop: 0 }, 600);
	return false;
  });

// Handling der Suche   
$("input[name$='mask']").click(function() {
	var zeige = $(this).val();
	$("div.desc").hide();
	$("#Maske" + zeige).show();
});
var el = $('input.haupt-suche');
  el.focus(function(e) {
	if (e.target.value == e.target.defaultValue)
		e.target.value = '';
  });
  el.blur(function(e) {
	if (e.target.value == '')
		e.target.value = e.target.defaultValue;
});

$('#search').autocomplete({
	source:'/inc/autocomplete.php',
	minLength:1,
	select: function(event, ui) {
		//assign value back to the form element
		if(ui.item){
			$(event.target).val(ui.item.value);
		}
		//submit the form
		$(event.target.form).submit();
	}		
});
$('#news_suche').autocomplete({
	source:'/inc/autocomplete_news.php',
	minLength:1,
	select: function(event, ui) {
		//assign value back to the form element
		if(ui.item){
			$(event.target).val(ui.item.value);
		}
		//submit the form
		$(event.target.form).submit();
	}
});

$('#content_suche').autocomplete({
	source:'/inc/autocomplete_content.php',	
	minLength: 1,
	select: function(event, ui) {
		window.location.href = '/physik-schule' + ui.item.url;
	}
});

/*
$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#ffffff',
    lineColor: '#5cbdaa'
  });
  $('#particles').interactivity({
    enable: 'false'
  });
});
*/

